using Microsoft.EntityFrameworkCore;
using SkillSwapAPI.Models;
using BCrypt.Net;

namespace SkillSwapAPI.Data
{
    public static class SeedData
    {
        public static async Task Initialize(ApplicationDbContext context)
        {
            // Check if data already exists
            if (await context.Users.AnyAsync())
            {
                return; // Database has been seeded
            }

            // Create sample users
            var users = new List<User>
            {
                new User
                {
                    Name = "Alice Johnson",
                    Email = "alice@example.com",
                    PasswordHash = HashPassword("password123"),
                    Location = "New York, NY",
                    Bio = "Passionate web developer with 5+ years of experience in React and Node.js. Love teaching and sharing knowledge with others.",
                    ProfileImageUrl = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                    Role = "User",
                    AverageRating = 4.8,
                    TotalRatings = 12,
                    CreatedAt = DateTime.UtcNow.AddMonths(-6),
                    UpdatedAt = DateTime.UtcNow.AddDays(-5)
                },
                new User
                {
                    Name = "Bob Smith",
                    Email = "bob@example.com",
                    PasswordHash = HashPassword("password123"),
                    Location = "San Francisco, CA",
                    Bio = "Data scientist and machine learning enthusiast. Experienced in Python, TensorFlow, and statistical analysis.",
                    ProfileImageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                    Role = "User",
                    AverageRating = 4.6,
                    TotalRatings = 8,
                    CreatedAt = DateTime.UtcNow.AddMonths(-4),
                    UpdatedAt = DateTime.UtcNow.AddDays(-2)
                },
                new User
                {
                    Name = "Carol Davis",
                    Email = "carol@example.com",
                    PasswordHash = HashPassword("password123"),
                    Location = "Austin, TX",
                    Bio = "UX/UI designer with a keen eye for user-centered design. Proficient in Figma, Adobe Creative Suite, and design thinking.",
                    ProfileImageUrl = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                    Role = "User",
                    AverageRating = 4.9,
                    TotalRatings = 15,
                    CreatedAt = DateTime.UtcNow.AddMonths(-3),
                    UpdatedAt = DateTime.UtcNow.AddDays(-1)
                },
                new User
                {
                    Name = "David Wilson",
                    Email = "david@example.com",
                    PasswordHash = HashPassword("password123"),
                    Location = "Seattle, WA",
                    Bio = "Full-stack developer specializing in .NET and Azure cloud solutions. Always eager to learn new technologies.",
                    ProfileImageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                    Role = "User",
                    AverageRating = 4.7,
                    TotalRatings = 10,
                    CreatedAt = DateTime.UtcNow.AddMonths(-2),
                    UpdatedAt = DateTime.UtcNow.AddHours(-12)
                },
                new User
                {
                    Name = "Emma Brown",
                    Email = "emma@example.com",
                    PasswordHash = HashPassword("password123"),
                    Location = "Boston, MA",
                    Bio = "Digital marketing specialist with expertise in SEO, content strategy, and social media marketing.",
                    ProfileImageUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
                    Role = "User",
                    AverageRating = 4.5,
                    TotalRatings = 7,
                    CreatedAt = DateTime.UtcNow.AddMonths(-1),
                    UpdatedAt = DateTime.UtcNow.AddHours(-6)
                },
                new User
                {
                    Name = "Frank Miller",
                    Email = "frank@example.com",
                    PasswordHash = HashPassword("password123"),
                    Location = "Chicago, IL",
                    Bio = "Professional photographer and videographer. Specializing in portrait photography and video editing.",
                    ProfileImageUrl = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                    Role = "User",
                    AverageRating = 4.4,
                    TotalRatings = 6,
                    CreatedAt = DateTime.UtcNow.AddWeeks(-3),
                    UpdatedAt = DateTime.UtcNow.AddHours(-3)
                }
            };

            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();

            // Create sample skills
            var skills = new List<Skill>
            {
                // Alice's skills
                new Skill
                {
                    Title = "React.js Development",
                    Description = "Learn modern React development including hooks, context API, and state management. Perfect for beginners to intermediate developers.",
                    Category = "Web Development",
                    SkillLevel = "Intermediate",
                    AvailabilityType = "Online",
                    UserId = users[0].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-20),
                    UpdatedAt = DateTime.UtcNow.AddDays(-5)
                },
                new Skill
                {
                    Title = "JavaScript Fundamentals",
                    Description = "Master the basics of JavaScript including ES6+ features, async/await, and DOM manipulation.",
                    Category = "Programming",
                    SkillLevel = "Beginner",
                    AvailabilityType = "Both",
                    UserId = users[0].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-18),
                    UpdatedAt = DateTime.UtcNow.AddDays(-3)
                },
                
                // Bob's skills
                new Skill
                {
                    Title = "Python for Data Science",
                    Description = "Comprehensive Python training for data analysis using pandas, numpy, and matplotlib. Includes real-world projects.",
                    Category = "Data Science",
                    SkillLevel = "Intermediate",
                    AvailabilityType = "Online",
                    UserId = users[1].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-15),
                    UpdatedAt = DateTime.UtcNow.AddDays(-2)
                },
                new Skill
                {
                    Title = "Machine Learning Basics",
                    Description = "Introduction to machine learning concepts, algorithms, and practical implementation using scikit-learn.",
                    Category = "Data Science",
                    SkillLevel = "Advanced",
                    AvailabilityType = "In-Person",
                    UserId = users[1].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-12),
                    UpdatedAt = DateTime.UtcNow.AddDays(-1)
                },
                
                // Carol's skills
                new Skill
                {
                    Title = "UI/UX Design Principles",
                    Description = "Learn fundamental design principles, user research methods, and how to create intuitive user interfaces.",
                    Category = "Design",
                    SkillLevel = "Beginner",
                    AvailabilityType = "Both",
                    UserId = users[2].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-10),
                    UpdatedAt = DateTime.UtcNow.AddHours(-12)
                },
                new Skill
                {
                    Title = "Figma Mastery",
                    Description = "Advanced Figma techniques including prototyping, component systems, and collaborative design workflows.",
                    Category = "Design",
                    SkillLevel = "Advanced",
                    AvailabilityType = "Online",
                    UserId = users[2].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-8),
                    UpdatedAt = DateTime.UtcNow.AddHours(-6)
                },
                
                // David's skills
                new Skill
                {
                    Title = "ASP.NET Core Development",
                    Description = "Build robust web APIs and applications using ASP.NET Core, Entity Framework, and best practices.",
                    Category = "Web Development",
                    SkillLevel = "Advanced",
                    AvailabilityType = "In-Person",
                    UserId = users[3].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-7),
                    UpdatedAt = DateTime.UtcNow.AddHours(-3)
                },
                new Skill
                {
                    Title = "Azure Cloud Services",
                    Description = "Deploy and manage applications on Microsoft Azure. Covers App Services, databases, storage, and more.",
                    Category = "Cloud Computing",
                    SkillLevel = "Intermediate",
                    AvailabilityType = "Online",
                    UserId = users[3].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    UpdatedAt = DateTime.UtcNow.AddHours(-1)
                },
                
                // Emma's skills
                new Skill
                {
                    Title = "SEO Optimization",
                    Description = "Learn how to optimize websites for search engines and improve organic traffic.",
                    Category = "Marketing",
                    SkillLevel = "Intermediate",
                    AvailabilityType = "Both",
                    UserId = users[4].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-4),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-30)
                },
                new Skill
                {
                    Title = "Content Marketing Strategy",
                    Description = "Develop effective content marketing strategies that engage audiences and drive conversions.",
                    Category = "Marketing",
                    SkillLevel = "Advanced",
                    AvailabilityType = "Online",
                    UserId = users[4].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-3),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-15)
                },
                
                // Frank's skills
                new Skill
                {
                    Title = "Portrait Photography",
                    Description = "Master the art of portrait photography including lighting, composition, and post-processing techniques.",
                    Category = "Photography",
                    SkillLevel = "Intermediate",
                    AvailabilityType = "In-Person",
                    UserId = users[5].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-5)
                },
                new Skill
                {
                    Title = "Video Editing with Adobe Premiere",
                    Description = "Professional video editing techniques using Adobe Premiere Pro. From basic cuts to advanced effects.",
                    Category = "Video Production",
                    SkillLevel = "Advanced",
                    AvailabilityType = "Both",
                    UserId = users[5].Id,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    UpdatedAt = DateTime.UtcNow
                }
            };

            await context.Skills.AddRangeAsync(skills);
            await context.SaveChangesAsync();

            // Create sample messages
            var messages = new List<Message>
            {
                new Message
                {
                    Content = "Hi Alice! I'm interested in learning React. Could you tell me more about your course?",
                    SenderId = users[1].Id, // Bob to Alice
                    ReceiverId = users[0].Id,
                    IsRead = true,
                    SentAt = DateTime.UtcNow.AddDays(-5)
                },
                new Message
                {
                    Content = "Hi Bob! I'd be happy to help you with React. My course covers all the modern features including hooks and context API. When would you like to start?",
                    SenderId = users[0].Id, // Alice to Bob
                    ReceiverId = users[1].Id,
                    IsRead = true,
                    SentAt = DateTime.UtcNow.AddDays(-5).AddHours(2)
                },
                new Message
                {
                    Content = "That sounds perfect! I'm available on weekends. Could we start this Saturday?",
                    SenderId = users[1].Id, // Bob to Alice
                    ReceiverId = users[0].Id,
                    IsRead = true,
                    SentAt = DateTime.UtcNow.AddDays(-4)
                },
                new Message
                {
                    Content = "Saturday works great! Let's meet at 10 AM. I'll send you the meeting link.",
                    SenderId = users[0].Id, // Alice to Bob
                    ReceiverId = users[1].Id,
                    IsRead = false,
                    SentAt = DateTime.UtcNow.AddDays(-4).AddHours(1)
                },
                new Message
                {
                    Content = "Carol, I love your design work! Could you help me with a UI redesign project?",
                    SenderId = users[3].Id, // David to Carol
                    ReceiverId = users[2].Id,
                    IsRead = true,
                    SentAt = DateTime.UtcNow.AddDays(-3)
                },
                new Message
                {
                    Content = "Thank you David! I'd be happy to help. What kind of application are you working on?",
                    SenderId = users[2].Id, // Carol to David
                    ReceiverId = users[3].Id,
                    IsRead = true,
                    SentAt = DateTime.UtcNow.AddDays(-3).AddHours(3)
                },
                new Message
                {
                    Content = "It's a web application for project management. I need help with the user experience flow.",
                    SenderId = users[3].Id, // David to Carol
                    ReceiverId = users[2].Id,
                    IsRead = false,
                    SentAt = DateTime.UtcNow.AddDays(-2)
                }
            };

            await context.Messages.AddRangeAsync(messages);
            await context.SaveChangesAsync();

            // Create sample ratings
            var ratings = new List<Rating>
            {
                new Rating
                {
                    Score = 5,
                    Comment = "Alice is an excellent teacher! Her React course was comprehensive and easy to follow. Highly recommended!",
                    RatedById = users[1].Id, // Bob rating Alice
                    UserId = users[0].Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-10)
                },
                new Rating
                {
                    Score = 4,
                    Comment = "Great Python course! Bob explains complex concepts very clearly. Would definitely take another course with him.",
                    RatedById = users[0].Id, // Alice rating Bob
                    UserId = users[1].Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-8)
                },
                new Rating
                {
                    Score = 5,
                    Comment = "Carol's design insights are incredible. She helped me completely transform my app's user experience.",
                    RatedById = users[3].Id, // David rating Carol
                    UserId = users[2].Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-6)
                },
                new Rating
                {
                    Score = 5,
                    Comment = "David's ASP.NET course was exactly what I needed. Professional, thorough, and practical.",
                    RatedById = users[2].Id, // Carol rating David
                    UserId = users[3].Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-4)
                },
                new Rating
                {
                    Score = 4,
                    Comment = "Emma's SEO strategies really work! My website traffic increased by 200% after implementing her suggestions.",
                    RatedById = users[5].Id, // Frank rating Emma
                    UserId = users[4].Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-3)
                },
                new Rating
                {
                    Score = 5,
                    Comment = "Frank's photography workshop was amazing! Learned so much about lighting and composition.",
                    RatedById = users[4].Id, // Emma rating Frank
                    UserId = users[5].Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-2)
                }
            };

            await context.Ratings.AddRangeAsync(ratings);
            await context.SaveChangesAsync();

            // Create sample transactions
            var transactions = new List<Transaction>
            {
                new Transaction
                {
                    SkillId = skills[0].Id, // React.js Development
                    Amount = 50.00m,
                    Description = "React.js Development Course - 4 sessions",
                    ProviderId = users[0].Id, // Alice providing
                    ReceiverId = users[1].Id, // Bob receiving
                    Status = "Completed",
                    CreatedAt = DateTime.UtcNow.AddDays(-12),
                    UpdatedAt = DateTime.UtcNow.AddDays(-10),
                    CompletedAt = DateTime.UtcNow.AddDays(-10)
                },
                new Transaction
                {
                    SkillId = skills[2].Id, // Python for Data Science
                    Amount = 75.00m,
                    Description = "Python for Data Science - Intensive Workshop",
                    ProviderId = users[1].Id, // Bob providing
                    ReceiverId = users[0].Id, // Alice receiving
                    Status = "Completed",
                    CreatedAt = DateTime.UtcNow.AddDays(-9),
                    UpdatedAt = DateTime.UtcNow.AddDays(-8),
                    CompletedAt = DateTime.UtcNow.AddDays(-8)
                },
                new Transaction
                {
                    SkillId = skills[4].Id, // UI/UX Design Principles
                    Amount = 100.00m,
                    Description = "UI/UX Design Consultation - App Redesign",
                    ProviderId = users[2].Id, // Carol providing
                    ReceiverId = users[3].Id, // David receiving
                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow.AddDays(-3),
                    UpdatedAt = DateTime.UtcNow.AddDays(-3)
                },
                new Transaction
                {
                    SkillId = skills[8].Id, // SEO Optimization
                    Amount = 60.00m,
                    Description = "SEO Optimization Strategy Session",
                    ProviderId = users[4].Id, // Emma providing
                    ReceiverId = users[5].Id, // Frank receiving
                    Status = "Completed",
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    UpdatedAt = DateTime.UtcNow.AddDays(-4),
                    CompletedAt = DateTime.UtcNow.AddDays(-4)
                }
            };

            await context.Transactions.AddRangeAsync(transactions);
            await context.SaveChangesAsync();
        }

        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt());
        }
    }
}
