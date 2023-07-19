import React, { useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

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
      alert(response.data.msg)
      localStorage.setItem("whatsaptoken",JSON.stringify(response.data.token))
      localStorage.setItem("whatsapname",JSON.stringify(response.data.name))
    } catch (error) {
      console.error(error); 
      alert(error.response.data.msg)
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/">Signup</Link></p>
    </div>
  );
}

export default Login;
