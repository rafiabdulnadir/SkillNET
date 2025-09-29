using System.ComponentModel.DataAnnotations;

namespace SkillSwapAPI.Models
{
    public class Message
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(2000)]
        public string Content { get; set; } = string.Empty;
        
        [StringLength(50)]
        public string MessageType { get; set; } = "Text";
        
        public bool IsRead { get; set; } = false;
        
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        
        // Foreign keys
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        
        // Navigation properties
        public virtual User Sender { get; set; } = null!;
        public virtual User Receiver { get; set; } = null!;
    }
}

