using System.ComponentModel.DataAnnotations;

namespace SkillSwapAPI.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        
        [StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Accepted, Completed, Cancelled
        
        [StringLength(1000)]
        public string? Notes { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedAt { get; set; }
        
        // Foreign keys
        public int SkillId { get; set; }
        public int ProviderId { get; set; } // User providing the skill
        public int ReceiverId { get; set; } // User receiving the skill
        
        // Navigation properties
        public virtual Skill Skill { get; set; } = null!;
        public virtual User Provider { get; set; } = null!;
        public virtual User Receiver { get; set; } = null!;
        public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    }
}

