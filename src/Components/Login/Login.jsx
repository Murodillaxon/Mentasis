// LoginForm.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://65799e161acd268f9af9874a.mockapi.io/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        setMessage("Вы успешно вошли в учетную запись!");
        setMessageType("success");

        // Программный переход на другой маршрут
        navigate("/dashboard"); // Замените "/dashboard" на ваш актуальный маршрут
      } else {
        // Если ответ не ок, обрабатываем текстовую ошибку
        const errorData = await response.text();

        if (errorData.includes("Invalid request")) {
          setMessage("Не удалось войти в учетную запись. Пожалуйста, проверьте свои данные.");
        } else {
          setMessage(`Не удалось войти в учетную запись. ${errorData}`);
        }

        setMessageType("error");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);

      if (error.request) {
        // The request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setMessage("Не удалось войти в учетную запись. Пожалуйста, проверьте свои данные.");
      }

      setMessageType("error");
    }
  };

  return (
    <div className="login">
      <div className="registration-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="reginputs">
            <label htmlFor="email" className="icon">
              <FaEnvelope />
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="icon">
              <FaShieldAlt />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="reg-button">
            Login
          </button>

          <p>
            Don't have an account? <Link to="/registration">Register here</Link>.
          </p>

          {message && (
            <div className={`message ${messageType}`}>
              <p>{message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
