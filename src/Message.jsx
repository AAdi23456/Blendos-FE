import React, { useEffect, useState } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const chatContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
};

const chatHeaderStyle = {
  backgroundColor: '#075e54',
  color: '#fff',
  padding: '15px',
  fontSize: '18px',
  fontWeight: 'bold',
};

const chatMessagesStyle = {
  flexGrow: 1,
  overflowY: 'auto',
  padding: '10px',
};

const messageStyle = {
  margin: '10px 0',
};

const senderStyle = {
  fontWeight: 'bold',
};

const contentStyle = {
  backgroundColor: '#dcf8c6',
  padding: '10px',
  borderRadius: '10px',
  display: 'inline-block',
};

const contentRightStyle = {
  backgroundColor: '#dcf8c6',
  textAlign: 'right',
};

const timeStyle = {
  color: '#999',
  fontSize: '12px',
  marginTop: '5px',
};

const chatInputStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  padding: '10px',
};

const inputStyle = {
  flexGrow: 1,
  border: 'none',
  padding: '5px',
};

const buttonStyle = {
  backgroundColor: '#075e54',
  color: '#fff',
  border: 'none',
  padding: '10px',
  marginLeft: '10px',
  cursor: 'pointer',
};

const name = JSON.parse(localStorage.getItem('whatsapname'));
const senderid=JSON.parse(localStorage.getItem('senderid'));
const sendername=JSON.parse(localStorage.getItem('sendername'));
const userid=JSON.parse(localStorage.getItem('user_id'));
function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();

    
    const socket = socketIOClient('http://localhost:8080', { 
    transports:["websocket"] });

    socket.on('chatMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

   
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const userid = JSON.parse(localStorage.getItem('user_id'));
      const token = JSON.parse(localStorage.getItem('whatsaptoken'));
      const headers = { token, userid };

      const response = await axios.get('http://localhost:8080/oldmessages', { headers });
     
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error retrieving messages:', error);
    }
  };

  const handleSendMessage = () => {
    const sender = sendername;
 
    const to_user =name; 
    const data = { sender, to_user, message: newMessage ,senderid,userid};

const socket = socketIOClient('http://localhost:8080', {
  
  transports: ['websocket'],
});
  
    socket.emit('chatMessage', data);
     
   
    setNewMessage('');
  };

  return (
    <div style={chatContainerStyle}>
      <div style={chatHeaderStyle}>Blendos</div>
      <div style={chatMessagesStyle}>
        {messages.map((message) => (
          <div key={message.id} style={messageStyle}>
            <div style={senderStyle}>{message.sender}</div>
            <div style={message.sender === name ? contentRightStyle : contentStyle}>
              {message.message}
              <div style={timeStyle}>{message.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={chatInputStyle}>
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleSendMessage} style={buttonStyle}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Messages;
