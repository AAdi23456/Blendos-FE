import React, { useEffect, useState } from 'react';
import axios from 'axios';

const name = JSON.parse(localStorage.getItem('whatsapname'));

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const userid=17
      const token = JSON.parse(localStorage.getItem('whatsaptoken'));
      const headers = { token,userid };

      const response = await axios.get('http://localhost:8080/messages', { headers,userid });
      console.log(response);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error retrieving messages:', error);
    }
  };

  return (
    <div
      className="chat-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <div
        className="chat-header"
        style={{
          backgroundColor: '#075e54',
          color: '#fff',
          padding: '15px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        Blendos
      </div>
      <div
        className="chat-messages"
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '10px',
        }}
      >
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <div className="sender" style={{ fontWeight: 'bold' }}>
              {message.sender}
            </div>
            <div
              className={`content ${message.sender === name ? 'right' : 'left'}`}
              style={{
                backgroundColor: '#dcf8c6',
                padding: '10px',
                borderRadius: '10px',
                display: 'inline-block',
              }}
            >
              {message.message}
              <div
                className="time"
                style={{
                  color: '#999',
                  fontSize: '12px',
                  marginTop: '5px',
                }}
              >
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="chat-input"
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '10px',
        }}
      >
        <input
          type="text"
          placeholder="Type a message"
          style={{
            flexGrow: 1,
            border: 'none',
            padding: '5px',
          }}
        />
        <button
          style={{
            backgroundColor: '#075e54',
            color: '#fff',
            border: 'none',
            padding: '10px',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default Messages;
