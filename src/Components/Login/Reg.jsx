// RegistrationForm.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaShieldAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // Добавленная строка
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://65799e161acd268f9af9874a.mockapi.io/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const user = await response.json();
      localStorage.setItem('user', JSON.stringify(user));

      setMessage("Регистрация прошла успешно!");
      setMessageType("success");

      navigate("/");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setMessage("Не удалось зарегистрироваться. Пожалуйста, проверьте свои данные.");
      setMessageType("error");
    }
  };

  return (
    <div className="login">
      <div className="registration-form">
        {loggedInUser ? (
          <div>
            <p>You are logged in as {loggedInUser.name} ({loggedInUser.email}).</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h1>Registration</h1>
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

                <label htmlFor="name" className="icon">
                  <FaUser />
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <p>
                By clicking Register, you agree to our{" "}
                <a href="#">terms and conditions</a>.
              </p>
              <button type="submit" className="reg-button">
                Register
              </button>

              <p>
                Already have an account? <Link to="/login">Login here</Link>.
              </p>

              {message && (
                <div className={`message ${messageType}`}>
                  <p>{message}</p>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
