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
    <div style={{ textAlign: 'center', margin: 'auto', width: '300px' }}>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Name"
          value={Name}
          onChange={handleChange}
          placeholder="Name"
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <br />
        <input
          type="text"
          name="state"
          value={state}
          onChange={handleChange}
          placeholder="State"
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <br />
        <input
          type="text"
          name="country"
          value={country}
          onChange={handleChange}
          placeholder="Country"
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <br />
        <button type="submit" style={{ width: '100%' }}>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
