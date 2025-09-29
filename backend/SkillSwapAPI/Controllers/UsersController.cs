using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillSwapAPI.Data;
using SkillSwapAPI.Models;
using System.Security.Claims;

namespace SkillSwapAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UsersController> _logger;

        public UsersController(ApplicationDbContext context, ILogger<UsersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetUsers(
            [FromQuery] string? search = null,
            [FromQuery] string? location = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                var query = _context.Users.AsQueryable();

                // Apply search filter
                if (!string.IsNullOrEmpty(search))
                {
                    query = query.Where(u => u.Name.Contains(search) || 
                                           u.Bio.Contains(search));
                }

                // Apply location filter
                if (!string.IsNullOrEmpty(location))
                {
                    query = query.Where(u => u.Location.Contains(location));
                }

                // Apply pagination
                var totalUsers = await query.CountAsync();
                var users = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(u => new
                    {
                        u.Id,
                        u.Name,
                        u.Email,
                        u.Location,
                        u.Bio,
                        u.ProfileImageUrl,
                        u.AverageRating,
                        u.TotalRatings,
                        u.CreatedAt,
                        SkillCount = u.Skills.Count()
                    })
                    .ToListAsync();

                return Ok(new
                {
                    Users = users,
                    TotalCount = totalUsers,
                    Page = page,
                    PageSize = pageSize,
                    TotalPages = (int)Math.Ceiling(totalUsers / (double)pageSize)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving users");
                return StatusCode(500, new { message = "An error occurred while retrieving users" });
            }
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetUser(int id)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Skills)
                    .Include(u => u.ReceivedRatings)
                        .ThenInclude(r => r.RatedBy)
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                var userDto = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Location,
                    user.Bio,
                    user.ProfileImageUrl,
                    user.AverageRating,
                    user.TotalRatings,
                    user.CreatedAt,
                    Skills = user.Skills.Select(s => new
                    {
                        s.Id,
                        s.Title,
                        s.Description,
                        s.Category,
                        s.SkillLevel,
                        s.AvailabilityType,
                        s.IsActive,
                        s.CreatedAt
                    }),
                    RecentRatings = user.ReceivedRatings
                        .OrderByDescending(r => r.CreatedAt)
                        .Take(5)
                        .Select(r => new
                        {
                            r.Id,
                            r.Score,
                            r.Comment,
                            r.CreatedAt,
                            RatedBy = new
                            {
                                r.RatedBy.Id,
                                r.RatedBy.Name
                            }
                        })
                };

                return Ok(userDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving user {UserId}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the user" });
            }
        }

        // GET: api/users/profile
        [HttpGet("profile")]
        [Authorize]
        public async Task<ActionResult<object>> GetCurrentUserProfile()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                
                var user = await _context.Users
                    .Include(u => u.Skills)
                    .Include(u => u.ReceivedRatings)
                        .ThenInclude(r => r.RatedBy)
                    .FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                var userProfile = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Location,
                    user.Bio,
                    user.ProfileImageUrl,
                    user.AverageRating,
                    user.TotalRatings,
                    user.CreatedAt,
                    Skills = user.Skills.Select(s => new
                    {
                        s.Id,
                        s.Title,
                        s.Description,
                        s.Category,
                        s.SkillLevel,
                        s.AvailabilityType,
                        s.IsActive,
                        s.CreatedAt
                    }),
                    Ratings = user.ReceivedRatings.Select(r => new
                    {
                        r.Id,
                        r.Score,
                        r.Comment,
                        r.CreatedAt,
                        RatedBy = new
                        {
                            r.RatedBy.Id,
                            r.RatedBy.Name
                        }
                    })
                };

                return Ok(userProfile);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving current user profile");
                return StatusCode(500, new { message = "An error occurred while retrieving your profile" });
            }
        }

        // PUT: api/users/profile
        [HttpPut("profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Update user properties
                if (!string.IsNullOrEmpty(request.Name))
                    user.Name = request.Name;
                
                if (!string.IsNullOrEmpty(request.Location))
                    user.Location = request.Location;
                
                if (!string.IsNullOrEmpty(request.Bio))
                    user.Bio = request.Bio;
                
                if (!string.IsNullOrEmpty(request.ProfileImageUrl))
                    user.ProfileImageUrl = request.ProfileImageUrl;

                user.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Profile updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user profile");
                return StatusCode(500, new { message = "An error occurred while updating your profile" });
            }
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user {UserId}", id);
                return StatusCode(500, new { message = "An error occurred while deleting the user" });
            }
        }
    }

    public class UpdateProfileRequest
    {
        public string? Name { get; set; }
        public string? Location { get; set; }
        public string? Bio { get; set; }
        public string? ProfileImageUrl { get; set; }
    }
}

