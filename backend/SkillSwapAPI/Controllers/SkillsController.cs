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
    public class SkillsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<SkillsController> _logger;

        public SkillsController(ApplicationDbContext context, ILogger<SkillsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/skills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetSkills(
            [FromQuery] string? search = null,
            [FromQuery] string? category = null,
            [FromQuery] string? skillLevel = null,
            [FromQuery] string? availabilityType = null,
            [FromQuery] string? location = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 12)
        {
            try
            {
                var query = _context.Skills
                    .Include(s => s.User)
                    .Where(s => s.IsActive)
                    .AsQueryable();

                // Apply search filter
                if (!string.IsNullOrEmpty(search))
                {
                    query = query.Where(s => s.Title.Contains(search) || 
                                           s.Description.Contains(search) ||
                                           s.User.Name.Contains(search));
                }

                // Apply category filter
                if (!string.IsNullOrEmpty(category))
                {
                    query = query.Where(s => s.Category == category);
                }

                // Apply skill level filter
                if (!string.IsNullOrEmpty(skillLevel))
                {
                    query = query.Where(s => s.SkillLevel == skillLevel);
                }

                // Apply availability type filter
                if (!string.IsNullOrEmpty(availabilityType))
                {
                    query = query.Where(s => s.AvailabilityType == availabilityType);
                }

                // Apply location filter
                if (!string.IsNullOrEmpty(location))
                {
                    query = query.Where(s => s.User.Location.Contains(location));
                }

                // Apply pagination
                var totalSkills = await query.CountAsync();
                var skills = await query
                    .OrderByDescending(s => s.CreatedAt)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(s => new
                    {
                        s.Id,
                        s.Title,
                        s.Description,
                        s.Category,
                        s.SkillLevel,
                        s.AvailabilityType,
                        s.CreatedAt,
                        User = new
                        {
                            s.User.Id,
                            s.User.Name,
                            s.User.Location,
                            s.User.ProfileImageUrl,
                            s.User.AverageRating,
                            s.User.TotalRatings
                        }
                    })
                    .ToListAsync();

                return Ok(new
                {
                    Skills = skills,
                    TotalCount = totalSkills,
                    Page = page,
                    PageSize = pageSize,
                    TotalPages = (int)Math.Ceiling(totalSkills / (double)pageSize)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving skills");
                return StatusCode(500, new { message = "An error occurred while retrieving skills" });
            }
        }

        // GET: api/skills/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetSkill(int id)
        {
            try
            {
                var skill = await _context.Skills
                    .Include(s => s.User)
                    .FirstOrDefaultAsync(s => s.Id == id);

                if (skill == null)
                {
                    return NotFound(new { message = "Skill not found" });
                }

                var skillDto = new
                {
                    skill.Id,
                    skill.Title,
                    skill.Description,
                    skill.Category,
                    skill.SkillLevel,
                    skill.AvailabilityType,
                    skill.IsActive,
                    skill.CreatedAt,
                    skill.UpdatedAt,
                    User = new
                    {
                        skill.User.Id,
                        skill.User.Name,
                        skill.User.Location,
                        skill.User.Bio,
                        skill.User.ProfileImageUrl,
                        skill.User.AverageRating,
                        skill.User.TotalRatings
                    }
                };

                return Ok(skillDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving skill {SkillId}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the skill" });
            }
        }

        // GET: api/skills/categories
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<object>>> GetCategories()
        {
            try
            {
                var categories = await _context.Skills
                    .Where(s => s.IsActive)
                    .GroupBy(s => s.Category)
                    .Select(g => new
                    {
                        Category = g.Key,
                        Count = g.Count()
                    })
                    .OrderByDescending(c => c.Count)
                    .ToListAsync();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving skill categories");
                return StatusCode(500, new { message = "An error occurred while retrieving categories" });
            }
        }

        // GET: api/skills/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUserSkills(int userId)
        {
            try
            {
                var skills = await _context.Skills
                    .Where(s => s.UserId == userId)
                    .OrderByDescending(s => s.CreatedAt)
                    .Select(s => new
                    {
                        s.Id,
                        s.Title,
                        s.Description,
                        s.Category,
                        s.SkillLevel,
                        s.AvailabilityType,
                        s.IsActive,
                        s.CreatedAt,
                        s.UpdatedAt
                    })
                    .ToListAsync();

                return Ok(skills);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving skills for user {UserId}", userId);
                return StatusCode(500, new { message = "An error occurred while retrieving user skills" });
            }
        }

        // POST: api/skills
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<object>> CreateSkill([FromBody] CreateSkillRequest request)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                var skill = new Skill
                {
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    SkillLevel = request.SkillLevel,
                    AvailabilityType = request.AvailabilityType,
                    UserId = userId,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Skills.Add(skill);
                await _context.SaveChangesAsync();

                // Return the created skill with user info
                var createdSkill = await _context.Skills
                    .Include(s => s.User)
                    .FirstOrDefaultAsync(s => s.Id == skill.Id);

                var skillDto = new
                {
                    createdSkill.Id,
                    createdSkill.Title,
                    createdSkill.Description,
                    createdSkill.Category,
                    createdSkill.SkillLevel,
                    createdSkill.AvailabilityType,
                    createdSkill.IsActive,
                    createdSkill.CreatedAt,
                    User = new
                    {
                        createdSkill.User.Id,
                        createdSkill.User.Name,
                        createdSkill.User.Location
                    }
                };

                return CreatedAtAction(nameof(GetSkill), new { id = skill.Id }, skillDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating skill");
                return StatusCode(500, new { message = "An error occurred while creating the skill" });
            }
        }

        // PUT: api/skills/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateSkill(int id, [FromBody] UpdateSkillRequest request)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                
                var skill = await _context.Skills.FindAsync(id);
                if (skill == null)
                {
                    return NotFound(new { message = "Skill not found" });
                }

                // Check if user owns this skill
                if (skill.UserId != userId)
                {
                    return Forbid("You can only update your own skills");
                }

                // Update skill properties
                if (!string.IsNullOrEmpty(request.Title))
                    skill.Title = request.Title;
                
                if (!string.IsNullOrEmpty(request.Description))
                    skill.Description = request.Description;
                
                if (!string.IsNullOrEmpty(request.Category))
                    skill.Category = request.Category;
                
                if (!string.IsNullOrEmpty(request.SkillLevel))
                    skill.SkillLevel = request.SkillLevel;
                
                if (!string.IsNullOrEmpty(request.AvailabilityType))
                    skill.AvailabilityType = request.AvailabilityType;

                if (request.IsActive.HasValue)
                    skill.IsActive = request.IsActive.Value;

                skill.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Skill updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating skill {SkillId}", id);
                return StatusCode(500, new { message = "An error occurred while updating the skill" });
            }
        }

        // DELETE: api/skills/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                
                var skill = await _context.Skills.FindAsync(id);
                if (skill == null)
                {
                    return NotFound(new { message = "Skill not found" });
                }

                // Check if user owns this skill or is admin
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                if (skill.UserId != userId && userRole != "Admin")
                {
                    return Forbid("You can only delete your own skills");
                }

                _context.Skills.Remove(skill);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Skill deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting skill {SkillId}", id);
                return StatusCode(500, new { message = "An error occurred while deleting the skill" });
            }
        }
    }

    public class CreateSkillRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string SkillLevel { get; set; } = string.Empty;
        public string AvailabilityType { get; set; } = string.Empty;
    }

    public class UpdateSkillRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string? SkillLevel { get; set; }
        public string? AvailabilityType { get; set; }
        public bool? IsActive { get; set; }
    }
}

