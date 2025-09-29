namespace SkillSwapAPI.Services
{
    public interface IEmailService
    {
        Task SendWelcomeEmailAsync(string email, string name);
        Task SendPasswordResetEmailAsync(string email, string resetToken);
        Task SendSkillRequestNotificationAsync(string email, string skillTitle, string requesterName);
    }
}

