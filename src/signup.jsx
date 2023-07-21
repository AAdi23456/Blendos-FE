import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    password: '',
    state: '',
    country: ''
  });

  const { Name, email, password, state, country } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', formData);
      console.log(response.data.msg);
      alert(response.data.msg);
      navigate('/login');
    } catch (error) {
      alert(error.response.data.msg);
      console.error(error);
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        margin: 'auto',
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9'
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Name"
          value={Name}
          onChange={handleChange}
          placeholder="Name"
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', marginBottom: '10px' }}
        />
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', marginBottom: '10px' }}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', marginBottom: '10px' }}
        />
        <br />
        <input
          type="text"
          name="state"
          value={state}
          onChange={handleChange}
          placeholder="State"
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', marginBottom: '10px' }}
        />
        <br />
        <input
          type="text"
          name="country"
          value={country}
          onChange={handleChange}
          placeholder="Country"
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', marginBottom: '10px' }}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            width: '100%',
            backgroundColor: '#4caf50',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ fontSize: '14px', marginTop: '10px' }}>
        Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login</Link>
      </p>
    </div>
  );
}

export default Signup;
