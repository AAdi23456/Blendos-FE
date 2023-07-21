import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData);
      console.log(response.data);
      alert(response.data.msg);
      localStorage.setItem('whatsaptoken', JSON.stringify(response.data.token));
      localStorage.setItem('whatsapname', JSON.stringify(response.data.name));
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: 'auto', width: '300px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
            marginBottom: '10px'
          }}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
            marginBottom: '10px'
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            width: '100%',
            backgroundColor: '#007bff',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
      <p style={{ fontSize: '14px', marginTop: '10px' }}>
        Don't have an account?{' '}
        <Link to="/" style={{ color: '#007bff', fontWeight: 'bold' }}>
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
