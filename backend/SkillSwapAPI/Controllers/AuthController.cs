using Microsoft.AspNetCore.Mvc;
using SkillSwapAPI.Models;
using SkillSwapAPI.Services;
using SkillSwapAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace SkillSwapAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthService _authService;
        private readonly IEmailService _emailService;

        public AuthController(ApplicationDbContext context, IAuthService authService, IEmailService emailService)
        {
            _context = context;
            _authService = authService;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                // Validate request
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Check if user already exists
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());

                if (existingUser != null)
                {
                    return BadRequest(new { message = "User with this email already exists" });
                }

                // Create new user
                var user = new User
                {
                    Name = request.Name.Trim(),
                    Email = request.Email.ToLower().Trim(),
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                    Location = request.Location?.Trim(),
                    Role = "User",
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Send welcome email
                try
                {
                    await _emailService.SendWelcomeEmailAsync(user.Email, user.Name);
                }
                catch (Exception ex)
                {
                    // Log email error but don't fail registration
                    Console.WriteLine($"Failed to send welcome email: {ex.Message}");
                }

                // Generate JWT token
                var token = _authService.GenerateJwtToken(user);

                return Ok(new
                {
                    message = "User registered successfully",
                    token = token,
                    user = new
                    {
                        id = user.Id,
                        name = user.Name,
                        email = user.Email,
                        location = user.Location,
                        role = user.Role,
                        createdAt = user.CreatedAt
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred during registration", error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                // Validate request
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Find user by email
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());

                if (user == null)
                {
                    return BadRequest(new { message = "Invalid email or password" });
                }

                // Verify password
                if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                {
                    return BadRequest(new { message = "Invalid email or password" });
                }

                // Generate JWT token
                var token = _authService.GenerateJwtToken(user);

                return Ok(new
                {
                    message = "Login successful",
                    token = token,
                    user = new
                    {
                        id = user.Id,
                        name = user.Name,
                        email = user.Email,
                        location = user.Location,
                        bio = user.Bio,
                        profileImageUrl = user.ProfileImageUrl,
                        role = user.Role,
                        createdAt = user.CreatedAt,
                        averageRating = user.AverageRating,
                        totalRatings = user.TotalRatings
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred during login", error = ex.Message });
            }
        }
    }

    public class RegisterRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Location { get; set; }
    }

    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}

