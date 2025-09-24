using System.ComponentModel.DataAnnotations;

namespace SkillSwapAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Bio { get; set; }
        
        [StringLength(255)]
        public string? Location { get; set; }
        
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        
        [StringLength(500)]
        public string? ProfileImageUrl { get; set; }
        
        [StringLength(50)]
        public string Role { get; set; } = "User";
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual ICollection<Skill> Skills { get; set; } = new List<Skill>();
        public virtual ICollection<Message> SentMessages { get; set; } = new List<Message>();
        public virtual ICollection<Message> ReceivedMessages { get; set; } = new List<Message>();
        public virtual ICollection<Rating> GivenRatings { get; set; } = new List<Rating>();
        public virtual ICollection<Rating> ReceivedRatings { get; set; } = new List<Rating>();
        public virtual ICollection<Transaction> ProvidedTransactions { get; set; } = new List<Transaction>();
        public virtual ICollection<Transaction> ReceivedTransactions { get; set; } = new List<Transaction>();
        
        // Computed properties
        public double AverageRating => ReceivedRatings.Any() ? ReceivedRatings.Average(r => r.Score) : 0;
        public int TotalRatings => ReceivedRatings.Count;
    }
}

