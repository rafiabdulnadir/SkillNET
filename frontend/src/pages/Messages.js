import React, { useState } from 'react';

const Messages = () => {
  const [conversations] = useState([
    {
      id: 1,
      user: { name: 'Alice Johnson', avatar: null },
      lastMessage: 'Thanks for the React lesson!',
      timestamp: '2024-01-20T10:30:00Z',
      unread: 2
    },
    {
      id: 2,
      user: { name: 'Bob Smith', avatar: null },
      lastMessage: 'When can we schedule the guitar lesson?',
      timestamp: '2024-01-19T15:45:00Z',
      unread: 0
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages] = useState([
    {
      id: 1,
      senderId: 1,
      content: 'Hi! I\'m interested in your React lessons.',
      timestamp: '2024-01-20T09:00:00Z'
    },
    {
      id: 2,
      senderId: 'me',
      content: 'Great! I\'d be happy to help you learn React.',
      timestamp: '2024-01-20T09:15:00Z'
    },
    {
      id: 3,
      senderId: 1,
      content: 'Thanks for the React lesson!',
      timestamp: '2024-01-20T10:30:00Z'
    }
  ]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="container">
      <div className="messages-container">
        <div className="conversations-sidebar">
          <div className="sidebar-header">
            <h2>Messages</h2>
          </div>
          
          <div className="conversations-list">
            {conversations.map(conversation => (
              <div
                key={conversation.id}
                className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="conversation-avatar">
                  {conversation.user.avatar ? (
                    <img src={conversation.user.avatar} alt={conversation.user.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {conversation.user.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="conversation-info">
                  <div className="conversation-header">
                    <h4>{conversation.user.name}</h4>
                    <span className="conversation-time">
                      {formatDate(conversation.timestamp)}
                    </span>
                  </div>
                  <div className="conversation-preview">
                    <p>{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="unread-badge">{conversation.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-area">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <div className="chat-avatar">
                    {selectedConversation.user.avatar ? (
                      <img src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {selectedConversation.user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3>{selectedConversation.user.name}</h3>
                </div>
              </div>

              <div className="messages-area">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`message ${message.senderId === 'me' ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <p>{message.content}</p>
                      <span className="message-time">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="message-input-area">
                <div className="message-input-container">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="message-input"
                  />
                  <button className="send-button">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-conversation">
              <h3>Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;

