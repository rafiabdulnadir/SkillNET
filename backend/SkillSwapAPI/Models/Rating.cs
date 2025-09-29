using System.ComponentModel.DataAnnotations;

namespace SkillSwapAPI.Models
{
    public class Rating
    {
        public int Id { get; set; }
        
        [Range(1, 5)]
        public int Score { get; set; }
        
        [StringLength(1000)]
        public string Comment { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Foreign keys
        public int UserId { get; set; } // User being rated
        public int RatedById { get; set; } // User giving the rating
        public int? TransactionId { get; set; } // Optional: related transaction
        
        // Navigation properties
        public virtual User User { get; set; } = null!; // User being rated
        public virtual User RatedBy { get; set; } = null!; // User giving the rating
        public virtual Transaction? Transaction { get; set; }
    }
}

