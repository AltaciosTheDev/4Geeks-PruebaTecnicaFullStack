import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Add useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., API call to authenticate the user)
    console.log('Logging in with:', { username, password });

    // On successful login, redirect to the private page
    navigate('/private');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              console.log('Username:', e.target.value);
            }}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log('Password:', e.target.value);
            }}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="auth-footer">
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;