import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signup';
import Login from './Login';
import Chats from "./Chats"
 import Messages from './Message';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chat" element={<Chats />} />
      </Routes>
    </Router>
  );
}

export default App;
