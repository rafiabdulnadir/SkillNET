namespace SkillSwapAPI.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendWelcomeEmailAsync(string email, string name)
        {
            try
            {
                // For demo purposes, we'll just log the email
                // In production, you would integrate with an email service like SendGrid, AWS SES, etc.
                
                var subject = "Welcome to SkillSwap!";
                var body = $@"
                    <h2>Welcome to SkillSwap, {name}!</h2>
                    <p>Thank you for joining our community skill exchange platform.</p>
                    <p>You can now:</p>
                    <ul>
                        <li>Share your skills with the community</li>
                        <li>Learn new skills from other members</li>
                        <li>Connect with like-minded people</li>
                        <li>Build your reputation through ratings</li>
                    </ul>
                    <p>Get started by adding your first skill!</p>
                    <p>Best regards,<br>The SkillSwap Team</p>
                ";

                _logger.LogInformation($"Sending welcome email to {email}");
                _logger.LogInformation($"Subject: {subject}");
                _logger.LogInformation($"Body: {body}");

                // Simulate email sending delay
                await Task.Delay(100);

                _logger.LogInformation($"Welcome email sent successfully to {email}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send welcome email to {email}");
                throw;
            }
        }

        public async Task SendPasswordResetEmailAsync(string email, string resetToken)
        {
            try
            {
                var subject = "Password Reset - SkillSwap";
                var resetUrl = $"{_configuration["AppSettings:FrontendUrl"]}/reset-password?token={resetToken}";
                var body = $@"
                    <h2>Password Reset Request</h2>
                    <p>You requested a password reset for your SkillSwap account.</p>
                    <p>Click the link below to reset your password:</p>
                    <p><a href='{resetUrl}'>Reset Password</a></p>
                    <p>If you didn't request this, please ignore this email.</p>
                    <p>This link will expire in 1 hour.</p>
                    <p>Best regards,<br>The SkillSwap Team</p>
                ";

                _logger.LogInformation($"Sending password reset email to {email}");
                _logger.LogInformation($"Subject: {subject}");
                _logger.LogInformation($"Reset URL: {resetUrl}");

                await Task.Delay(100);

                _logger.LogInformation($"Password reset email sent successfully to {email}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send password reset email to {email}");
                throw;
            }
        }

        public async Task SendSkillRequestNotificationAsync(string email, string skillTitle, string requesterName)
        {
            try
            {
                var subject = $"New Skill Request - {skillTitle}";
                var body = $@"
                    <h2>New Skill Request</h2>
                    <p>Hi there!</p>
                    <p><strong>{requesterName}</strong> is interested in your skill: <strong>{skillTitle}</strong></p>
                    <p>Log in to SkillSwap to view the request and respond.</p>
                    <p>Best regards,<br>The SkillSwap Team</p>
                ";

                _logger.LogInformation($"Sending skill request notification to {email}");
                _logger.LogInformation($"Subject: {subject}");
                _logger.LogInformation($"Skill: {skillTitle}, Requester: {requesterName}");

                await Task.Delay(100);

                _logger.LogInformation($"Skill request notification sent successfully to {email}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send skill request notification to {email}");
                throw;
            }
        }
    }
}

