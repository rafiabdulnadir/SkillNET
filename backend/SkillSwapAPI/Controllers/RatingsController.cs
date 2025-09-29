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
    [Authorize]
    public class RatingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RatingsController> _logger;

        public RatingsController(ApplicationDbContext context, ILogger<RatingsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/ratings/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUserRatings(
            int userId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                var query = _context.Ratings
                    .Include(r => r.RatedBy)
                    .Where(r => r.RatedUserId == userId)
                    .OrderByDescending(r => r.CreatedAt);

                var totalRatings = await query.CountAsync();
                var ratings = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(r => new
                    {
                        r.Id,
                        r.Score,
                        r.Comment,
                        r.CreatedAt,
                        RatedBy = new
                        {
                            r.RatedBy.Id,
                            r.RatedBy.Name,
                            r.RatedBy.ProfileImageUrl
                        }
                    })
                    .ToListAsync();

                // Calculate rating statistics
                var ratingStats = await _context.Ratings
                    .Where(r => r.RatedUserId == userId)
                    .GroupBy(r => r.RatedUserId)
                    .Select(g => new
                    {
                        TotalRatings = g.Count(),
                        AverageRating = g.Average(r => r.Score),
                        RatingDistribution = new
                        {
                            FiveStars = g.Count(r => r.Score == 5),
                            FourStars = g.Count(r => r.Score == 4),
                            ThreeStars = g.Count(r => r.Score == 3),
                            TwoStars = g.Count(r => r.Score == 2),
                            OneStar = g.Count(r => r.Score == 1)
                        }
                    })
                    .FirstOrDefaultAsync();

                return Ok(new
                {
                    Ratings = ratings,
                    Statistics = ratingStats ?? new
                    {
                        TotalRatings = 0,
                        AverageRating = 0.0,
                        RatingDistribution = new
                        {
                            FiveStars = 0,
                            FourStars = 0,
                            ThreeStars = 0,
                            TwoStars = 0,
                            OneStar = 0
                        }
                    },
                    TotalCount = totalRatings,
                    Page = page,
                    PageSize = pageSize,
                    TotalPages = (int)Math.Ceiling(totalRatings / (double)pageSize)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ratings for user {UserId}", userId);
                return StatusCode(500, new { message = "An error occurred while retrieving ratings" });
            }
        }

        // GET: api/ratings/given
        [HttpGet("given")]
        public async Task<ActionResult<IEnumerable<object>>> GetGivenRatings(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                var query = _context.Ratings
                    .Include(r => r.RatedUser)
                    .Where(r => r.RatedById == userId)
                    .OrderByDescending(r => r.CreatedAt);

                var totalRatings = await query.CountAsync();
                var ratings = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(r => new
                    {
                        r.Id,
                        r.Score,
                        r.Comment,
                        r.CreatedAt,
                        RatedUser = new
                        {
                            r.RatedUser.Id,
                            r.RatedUser.Name,
                            r.RatedUser.ProfileImageUrl
                        }
                    })
                    .ToListAsync();

                return Ok(new
                {
                    Ratings = ratings,
                    TotalCount = totalRatings,
                    Page = page,
                    PageSize = pageSize,
                    TotalPages = (int)Math.Ceiling(totalRatings / (double)pageSize)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving given ratings");
                return StatusCode(500, new { message = "An error occurred while retrieving your given ratings" });
            }
        }

        // GET: api/ratings/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetRating(int id)
        {
            try
            {
                var rating = await _context.Ratings
                    .Include(r => r.RatedBy)
                    .Include(r => r.RatedUser)
                    .FirstOrDefaultAsync(r => r.Id == id);

                if (rating == null)
                {
                    return NotFound(new { message = "Rating not found" });
                }

                var ratingDto = new
                {
                    rating.Id,
                    rating.Score,
                    rating.Comment,
                    rating.CreatedAt,
                    RatedBy = new
                    {
                        rating.RatedBy.Id,
                        rating.RatedBy.Name,
                        rating.RatedBy.ProfileImageUrl
                    },
                    RatedUser = new
                    {
                        rating.RatedUser.Id,
                        rating.RatedUser.Name,
                        rating.RatedUser.ProfileImageUrl
                    }
                };

                return Ok(ratingDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving rating {RatingId}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the rating" });
            }
        }

        // POST: api/ratings
        [HttpPost]
        public async Task<ActionResult<object>> CreateRating([FromBody] CreateRatingRequest request)
        {
            try
            {
                var ratedById = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                // Validate rated user exists
                var ratedUser = await _context.Users.FindAsync(request.RatedUserId);
                if (ratedUser == null)
                {
                    return NotFound(new { message = "User to be rated not found" });
                }

                // Prevent rating yourself
                if (ratedById == request.RatedUserId)
                {
                    return BadRequest(new { message = "You cannot rate yourself" });
                }

                // Check if user has already rated this person
                var existingRating = await _context.Ratings
                    .FirstOrDefaultAsync(r => r.RatedById == ratedById && r.RatedUserId == request.RatedUserId);

                if (existingRating != null)
                {
                    return BadRequest(new { message = "You have already rated this user" });
                }

                // Validate score range
                if (request.Score < 1 || request.Score > 5)
                {
                    return BadRequest(new { message = "Rating score must be between 1 and 5" });
                }

                var rating = new Rating
                {
                    Score = request.Score,
                    Comment = request.Comment ?? string.Empty,
                    RatedById = ratedById,
                    RatedUserId = request.RatedUserId,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Ratings.Add(rating);
                await _context.SaveChangesAsync();

                // Update user's average rating
                await UpdateUserAverageRating(request.RatedUserId);

                // Return the created rating with user info
                var createdRating = await _context.Ratings
                    .Include(r => r.RatedBy)
                    .Include(r => r.RatedUser)
                    .FirstOrDefaultAsync(r => r.Id == rating.Id);

                var ratingDto = new
                {
                    createdRating.Id,
                    createdRating.Score,
                    createdRating.Comment,
                    createdRating.CreatedAt,
                    RatedBy = new
                    {
                        createdRating.RatedBy.Id,
                        createdRating.RatedBy.Name,
                        createdRating.RatedBy.ProfileImageUrl
                    },
                    RatedUser = new
                    {
                        createdRating.RatedUser.Id,
                        createdRating.RatedUser.Name,
                        createdRating.RatedUser.ProfileImageUrl
                    }
                };

                return CreatedAtAction(nameof(GetRating), new { id = rating.Id }, ratingDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating rating");
                return StatusCode(500, new { message = "An error occurred while creating the rating" });
            }
        }

        // PUT: api/ratings/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRating(int id, [FromBody] UpdateRatingRequest request)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                var rating = await _context.Ratings.FindAsync(id);
                if (rating == null)
                {
                    return NotFound(new { message = "Rating not found" });
                }

                // Check if user owns this rating
                if (rating.RatedById != userId)
                {
                    return Forbid("You can only update your own ratings");
                }

                // Validate score range if provided
                if (request.Score.HasValue && (request.Score < 1 || request.Score > 5))
                {
                    return BadRequest(new { message = "Rating score must be between 1 and 5" });
                }

                // Update rating properties
                if (request.Score.HasValue)
                    rating.Score = request.Score.Value;

                if (request.Comment != null)
                    rating.Comment = request.Comment;

                await _context.SaveChangesAsync();

                // Update user's average rating if score changed
                if (request.Score.HasValue)
                {
                    await UpdateUserAverageRating(rating.RatedUserId);
                }

                return Ok(new { message = "Rating updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating rating {RatingId}", id);
                return StatusCode(500, new { message = "An error occurred while updating the rating" });
            }
        }

        // DELETE: api/ratings/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRating(int id)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                var rating = await _context.Ratings.FindAsync(id);
                if (rating == null)
                {
                    return NotFound(new { message = "Rating not found" });
                }

                // Check if user owns this rating or is admin
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                if (rating.RatedById != userId && userRole != "Admin")
                {
                    return Forbid("You can only delete your own ratings");
                }

                var ratedUserId = rating.RatedUserId;
                _context.Ratings.Remove(rating);
                await _context.SaveChangesAsync();

                // Update user's average rating
                await UpdateUserAverageRating(ratedUserId);

                return Ok(new { message = "Rating deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting rating {RatingId}", id);
                return StatusCode(500, new { message = "An error occurred while deleting the rating" });
            }
        }

        // GET: api/ratings/can-rate/{userId}
        [HttpGet("can-rate/{userId}")]
        public async Task<ActionResult<object>> CanRateUser(int userId)
        {
            try
            {
                var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                if (currentUserId == userId)
                {
                    return Ok(new { CanRate = false, Reason = "Cannot rate yourself" });
                }

                var existingRating = await _context.Ratings
                    .FirstOrDefaultAsync(r => r.RatedById == currentUserId && r.RatedUserId == userId);

                if (existingRating != null)
                {
                    return Ok(new { CanRate = false, Reason = "Already rated this user" });
                }

                return Ok(new { CanRate = true, Reason = "" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking if user can rate {UserId}", userId);
                return StatusCode(500, new { message = "An error occurred while checking rating eligibility" });
            }
        }

        private async Task UpdateUserAverageRating(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                var ratings = await _context.Ratings
                    .Where(r => r.RatedUserId == userId)
                    .ToListAsync();

                if (ratings.Any())
                {
                    user.AverageRating = ratings.Average(r => r.Score);
                    user.TotalRatings = ratings.Count;
                }
                else
                {
                    user.AverageRating = 0;
                    user.TotalRatings = 0;
                }

                await _context.SaveChangesAsync();
            }
        }
    }

    public class CreateRatingRequest
    {
        public int Score { get; set; }
        public string? Comment { get; set; }
        public int RatedUserId { get; set; }
    }

    public class UpdateRatingRequest
    {
        public int? Score { get; set; }
        public string? Comment { get; set; }
    }
}

