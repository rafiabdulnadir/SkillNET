using SkillSwapAPI.Models;

namespace SkillSwapAPI.Services
{
    public interface IAuthService
    {
        string GenerateJwtToken(User user);
        int? GetUserIdFromToken(string token);
    }
}

