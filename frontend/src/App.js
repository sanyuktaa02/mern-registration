import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true); // Toggle state to manage Login and Register views

  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to MERN Registration</h1>
      </header>

      <div className="auth-container">
        {isLogin ? (
          <div className="login-container">
            <Login />
            <p>
              Don't have an account?{" "}
              <button onClick={() => setIsLogin(false)}>Register</button>
            </p>
          </div>
        ) : (
          <div className="register-container">
            <Register />
            <p>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)}>Login</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
