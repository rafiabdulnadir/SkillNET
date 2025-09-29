using Microsoft.EntityFrameworkCore;
using SkillSwapAPI.Models;

namespace SkillSwapAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User entity configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.Role).HasDefaultValue("User");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // Skill entity configuration
            modelBuilder.Entity<Skill>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).IsRequired().HasMaxLength(2000);
                entity.Property(e => e.Category).IsRequired().HasMaxLength(100);
                entity.Property(e => e.SkillLevel).IsRequired().HasMaxLength(50);
                entity.Property(e => e.IsActive).HasDefaultValue(true);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(s => s.User)
                      .WithMany(u => u.Skills)
                      .HasForeignKey(s => s.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Message entity configuration
            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Content).IsRequired().HasMaxLength(2000);
                entity.Property(e => e.MessageType).HasDefaultValue("Text");
                entity.Property(e => e.IsRead).HasDefaultValue(false);
                entity.Property(e => e.SentAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(m => m.Sender)
                      .WithMany(u => u.SentMessages)
                      .HasForeignKey(m => m.SenderId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(m => m.Receiver)
                      .WithMany(u => u.ReceivedMessages)
                      .HasForeignKey(m => m.ReceiverId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Rating entity configuration
            modelBuilder.Entity<Rating>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Score).IsRequired();
                entity.Property(e => e.Comment).HasMaxLength(1000);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(r => r.User)
                      .WithMany(u => u.ReceivedRatings)
                      .HasForeignKey(r => r.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(r => r.RatedBy)
                      .WithMany(u => u.GivenRatings)
                      .HasForeignKey(r => r.RatedById)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(r => r.Transaction)
                      .WithMany(t => t.Ratings)
                      .HasForeignKey(r => r.TransactionId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            // Transaction entity configuration
            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Status).HasDefaultValue("Pending");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(t => t.Skill)
                      .WithMany(s => s.Transactions)
                      .HasForeignKey(t => t.SkillId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.Provider)
                      .WithMany(u => u.ProvidedTransactions)
                      .HasForeignKey(t => t.ProviderId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(t => t.Receiver)
                      .WithMany(u => u.ReceivedTransactions)
                      .HasForeignKey(t => t.ReceiverId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Indexes for performance
            modelBuilder.Entity<Skill>()
                .HasIndex(s => s.Category);

            modelBuilder.Entity<Skill>()
                .HasIndex(s => s.SkillLevel);

            modelBuilder.Entity<Skill>()
                .HasIndex(s => s.IsActive);

            modelBuilder.Entity<Message>()
                .HasIndex(m => new { m.SenderId, m.ReceiverId });

            modelBuilder.Entity<Rating>()
                .HasIndex(r => r.UserId);

            modelBuilder.Entity<Transaction>()
                .HasIndex(t => t.Status);
        }
    }
}
