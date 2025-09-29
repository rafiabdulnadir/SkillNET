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
    public class MessagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<MessagesController> _logger;

        public MessagesController(ApplicationDbContext context, ILogger<MessagesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/messages/conversations
        [HttpGet("conversations")]
        public async Task<ActionResult<IEnumerable<object>>> GetConversations()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                var conversations = await _context.Messages
                    .Where(m => m.SenderId == userId || m.ReceiverId == userId)
                    .GroupBy(m => m.SenderId == userId ? m.ReceiverId : m.SenderId)
                    .Select(g => new
                    {
                        UserId = g.Key,
                        LastMessage = g.OrderByDescending(m => m.CreatedAt).First(),
                        UnreadCount = g.Count(m => m.ReceiverId == userId && !m.IsRead)
                    })
                    .ToListAsync();

                var conversationDetails = new List<object>();

                foreach (var conv in conversations)
                {
                    var otherUser = await _context.Users.FindAsync(conv.UserId);
                    if (otherUser != null)
                    {
                        conversationDetails.Add(new
                        {
                            User = new
                            {
                                otherUser.Id,
                                otherUser.Name,
                                otherUser.ProfileImageUrl,
                                otherUser.Location
                            },
                            LastMessage = new
                            {
                                conv.LastMessage.Id,
                                conv.LastMessage.Content,
                                conv.LastMessage.CreatedAt,
                                conv.LastMessage.IsRead,
                                IsFromCurrentUser = conv.LastMessage.SenderId == userId
                            },
                            UnreadCount = conv.UnreadCount
                        });
                    }
                }

                return Ok(conversationDetails.OrderByDescending(c => ((dynamic)c.LastMessage).CreatedAt));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving conversations");
                return StatusCode(500, new { message = "An error occurred while retrieving conversations" });
            }
        }

        // GET: api/messages/conversation/{userId}
        [HttpGet("conversation/{otherUserId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetConversation(
            int otherUserId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 50)
        {
            try
            {
                var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                // Get the other user info
                var otherUser = await _context.Users.FindAsync(otherUserId);
                if (otherUser == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Get messages between current user and other user
                var query = _context.Messages
                    .Where(m => (m.SenderId == currentUserId && m.ReceiverId == otherUserId) ||
                               (m.SenderId == otherUserId && m.ReceiverId == currentUserId))
                    .OrderByDescending(m => m.CreatedAt);

                var totalMessages = await query.CountAsync();
                var messages = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(m => new
                    {
                        m.Id,
                        m.Content,
                        m.CreatedAt,
                        m.IsRead,
                        IsFromCurrentUser = m.SenderId == currentUserId,
                        Sender = new
                        {
                            m.Sender.Id,
                            m.Sender.Name,
                            m.Sender.ProfileImageUrl
                        }
                    })
                    .ToListAsync();

                // Mark messages as read
                var unreadMessages = await _context.Messages
                    .Where(m => m.SenderId == otherUserId && 
                               m.ReceiverId == currentUserId && 
                               !m.IsRead)
                    .ToListAsync();

                foreach (var message in unreadMessages)
                {
                    message.IsRead = true;
                }

                if (unreadMessages.Any())
                {
                    await _context.SaveChangesAsync();
                }

                return Ok(new
                {
                    OtherUser = new
                    {
                        otherUser.Id,
                        otherUser.Name,
                        otherUser.ProfileImageUrl,
                        otherUser.Location
                    },
                    Messages = messages.OrderBy(m => m.CreatedAt),
                    TotalCount = totalMessages,
                    Page = page,
                    PageSize = pageSize,
                    TotalPages = (int)Math.Ceiling(totalMessages / (double)pageSize)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving conversation with user {UserId}", otherUserId);
                return StatusCode(500, new { message = "An error occurred while retrieving the conversation" });
            }
        }

        // POST: api/messages
        [HttpPost]
        public async Task<ActionResult<object>> SendMessage([FromBody] SendMessageRequest request)
        {
            try
            {
                var senderId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                // Validate receiver exists
                var receiver = await _context.Users.FindAsync(request.ReceiverId);
                if (receiver == null)
                {
                    return NotFound(new { message = "Receiver not found" });
                }

                // Prevent sending message to self
                if (senderId == request.ReceiverId)
                {
                    return BadRequest(new { message = "Cannot send message to yourself" });
                }

                var message = new Message
                {
                    Content = request.Content,
                    SenderId = senderId,
                    ReceiverId = request.ReceiverId,
                    IsRead = false,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Messages.Add(message);
                await _context.SaveChangesAsync();

                // Return the created message with sender info
                var createdMessage = await _context.Messages
                    .Include(m => m.Sender)
                    .FirstOrDefaultAsync(m => m.Id == message.Id);

                var messageDto = new
                {
                    createdMessage.Id,
                    createdMessage.Content,
                    createdMessage.CreatedAt,
                    createdMessage.IsRead,
                    IsFromCurrentUser = true,
                    Sender = new
                    {
                        createdMessage.Sender.Id,
                        createdMessage.Sender.Name,
                        createdMessage.Sender.ProfileImageUrl
                    }
                };

                return CreatedAtAction(nameof(GetMessage), new { id = message.Id }, messageDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending message");
                return StatusCode(500, new { message = "An error occurred while sending the message" });
            }
        }

        // GET: api/messages/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetMessage(int id)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                var message = await _context.Messages
                    .Include(m => m.Sender)
                    .Include(m => m.Receiver)
                    .FirstOrDefaultAsync(m => m.Id == id);

                if (message == null)
                {
                    return NotFound(new { message = "Message not found" });
                }

                // Check if user is part of this conversation
                if (message.SenderId != userId && message.ReceiverId != userId)
                {
                    return Forbid("You can only view messages in your conversations");
                }

                var messageDto = new
                {
                    message.Id,
                    message.Content,
                    message.CreatedAt,
                    message.IsRead,
                    IsFromCurrentUser = message.SenderId == userId,
                    Sender = new
                    {
                        message.Sender.Id,
                        message.Sender.Name,
                        message.Sender.ProfileImageUrl
                    },
                    Receiver = new
                    {
                        message.Receiver.Id,
                        message.Receiver.Name,
                        message.Receiver.ProfileImageUrl
                    }
                };

                return Ok(messageDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving message {MessageId}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the message" });
            }
        }

        // PUT: api/messages/{id}/read
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                var message = await _context.Messages.FindAsync(id);
                if (message == null)
                {
                    return NotFound(new { message = "Message not found" });
                }

                // Only the receiver can mark a message as read
                if (message.ReceiverId != userId)
                {
                    return Forbid("You can only mark messages sent to you as read");
                }

                message.IsRead = true;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Message marked as read" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error marking message {MessageId} as read", id);
                return StatusCode(500, new { message = "An error occurred while marking the message as read" });
            }
        }

        // DELETE: api/messages/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                var message = await _context.Messages.FindAsync(id);
                if (message == null)
                {
                    return NotFound(new { message = "Message not found" });
                }

                // Only the sender can delete a message
                if (message.SenderId != userId)
                {
                    return Forbid("You can only delete messages you sent");
                }

                _context.Messages.Remove(message);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Message deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting message {MessageId}", id);
                return StatusCode(500, new { message = "An error occurred while deleting the message" });
            }
        }

        // GET: api/messages/unread-count
        [HttpGet("unread-count")]
        public async Task<ActionResult<object>> GetUnreadCount()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                var unreadCount = await _context.Messages
                    .CountAsync(m => m.ReceiverId == userId && !m.IsRead);

                return Ok(new { UnreadCount = unreadCount });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving unread message count");
                return StatusCode(500, new { message = "An error occurred while retrieving unread count" });
            }
        }
    }

    public class SendMessageRequest
    {
        public string Content { get; set; } = string.Empty;
        public int ReceiverId { get; set; }
    }
}

