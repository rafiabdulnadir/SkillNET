import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const ChatBubble = ({
  className = '',
  position = 'bottom-right',
  size = 'medium',
  showUnreadBadge = true,
  autoOpen = false,
  minimized = false,
  onToggle,
  onNewMessage,
}) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Thanks for the React lesson! When can we schedule the next one?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      unread: 2,
      online: true,
      skill: 'React Development'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'I can help you with UI/UX design in exchange for Python lessons',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      unread: 1,
      online: false,
      skill: 'UI/UX Design'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'The digital marketing session was amazing! 5 stars ⭐',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unread: 0,
      online: true,
      skill: 'Digital Marketing'
    }
  ];

  // Mock messages for active conversation
  const mockMessages = {
    1: [
      {
        id: 1,
        senderId: 1,
        senderName: 'Sarah Chen',
        message: 'Hi! I saw your React development skill and I\'m really interested in learning.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'text'
      },
      {
        id: 2,
        senderId: 'me',
        senderName: 'You',
        message: 'Hi Sarah! I\'d be happy to help you learn React. What\'s your current experience level?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
        type: 'text'
      },
      {
        id: 3,
        senderId: 1,
        senderName: 'Sarah Chen',
        message: 'I have some JavaScript experience but I\'m completely new to React. Could we start with the basics?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 10 * 60 * 1000),
        type: 'text'
      },
      {
        id: 4,
        senderId: 'me',
        senderName: 'You',
        message: 'Perfect! We can start with components and JSX. When would be a good time for you?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 15 * 60 * 1000),
        type: 'text'
      },
      {
        id: 5,
        senderId: 1,
        senderName: 'Sarah Chen',
        message: 'Thanks for the React lesson! When can we schedule the next one?',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: 'text'
      }
    ]
  };

  // Load conversations
  useEffect(() => {
    if (user) {
      setConversations(mockConversations);
      const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unread, 0);
      setUnreadCount(totalUnread);
    }
  }, [user]);

  // Load messages for active conversation
  useEffect(() => {
    if (activeConversation) {
      setMessages(mockMessages[activeConversation.id] || []);
      scrollToBottom();
    }
  }, [activeConversation]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle chat bubble
  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
    
    if (newIsOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Select conversation
  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
    
    // Mark conversation as read
    if (conversation.unread > 0) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversation.id 
            ? { ...conv, unread: 0 }
            : conv
        )
      );
      setUnreadCount(prev => prev - conversation.unread);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;

    const message = {
      id: Date.now(),
      senderId: 'me',
      senderName: 'You',
      message: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate typing indicator
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      // Simulate response (in real app, this would come from WebSocket)
      const response = {
        id: Date.now() + 1,
        senderId: activeConversation.id,
        senderName: activeConversation.name,
        message: 'Thanks for your message! I\'ll get back to you soon.',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, response]);
      onNewMessage?.(response);
    }, 2000);

    scrollToBottom();
  };

  // Handle enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'chat-bottom-right',
    'bottom-left': 'chat-bottom-left',
    'top-right': 'chat-top-right',
    'top-left': 'chat-top-left',
  };

  // Size classes
  const sizeClasses = {
    small: 'chat-small',
    medium: 'chat-medium',
    large: 'chat-large',
  };

  if (!user) return null;

  return (
    <div className={`chat-bubble ${positionClasses[position]} ${sizeClasses[size]} ${className}`}>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className={`chat-toggle-button ${minimized ? 'minimized' : ''}`}
          aria-label="Open chat"
          type="button"
        >
          <span className="chat-icon">💬</span>
          {showUnreadBadge && unreadCount > 0 && (
            <span className="chat-badge">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              {activeConversation ? (
                <>
                  <button
                    onClick={() => setActiveConversation(null)}
                    className="back-button"
                    type="button"
                  >
                    ←
                  </button>
                  <img
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    className="chat-avatar"
                  />
                  <div className="chat-user-info">
                    <div className="chat-user-name">{activeConversation.name}</div>
                    <div className="chat-user-status">
                      <span className={`status-indicator ${activeConversation.online ? 'online' : 'offline'}`}></span>
                      {activeConversation.online ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </>
              ) : (
                <div className="chat-title">Messages</div>
              )}
            </div>
            <button
              onClick={toggleChat}
              className="chat-close-button"
              aria-label="Close chat"
              type="button"
            >
              ✕
            </button>
          </div>

          {/* Chat Content */}
          <div className="chat-content">
            {!activeConversation ? (
              /* Conversations List */
              <div className="conversations-list">
                {conversations.length === 0 ? (
                  <div className="no-conversations">
                    <div className="no-conversations-icon">💬</div>
                    <p>No conversations yet</p>
                    <span>Start chatting with skill partners!</span>
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => selectConversation(conversation)}
                      className="conversation-item"
                      type="button"
                    >
                      <div className="conversation-avatar">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="avatar-image"
                        />
                        <span className={`status-dot ${conversation.online ? 'online' : 'offline'}`}></span>
                      </div>
                      
                      <div className="conversation-content">
                        <div className="conversation-header">
                          <div className="conversation-name">{conversation.name}</div>
                          <div className="conversation-time">
                            {formatTimestamp(conversation.timestamp)}
                          </div>
                        </div>
                        <div className="conversation-preview">
                          {conversation.lastMessage}
                        </div>
                        <div className="conversation-skill">
                          {conversation.skill}
                        </div>
                      </div>
                      
                      {conversation.unread > 0 && (
                        <div className="conversation-unread">
                          {conversation.unread}
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            ) : (
              /* Messages View */
              <div className="messages-container">
                <div className="messages-list">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${message.senderId === 'me' ? 'sent' : 'received'}`}
                    >
                      <div className="message-content">
                        <div className="message-text">{message.message}</div>
                        <div className="message-time">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {typing && (
                    <div className="message received">
                      <div className="message-content">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="message-input-container">
                  <div className="message-input-wrapper">
                    <textarea
                      ref={inputRef}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="message-input"
                      rows="1"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="send-button"
                      aria-label="Send message"
                      type="button"
                    >
                      ➤
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
