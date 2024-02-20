import React, { useState } from 'react';
import { CiLogin } from 'react-icons/ci';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import Carousel from './Carousel';
import LoginForm from '../Login/Login';
import RegistrationForm from '../Login/Reg';
import './style.css';

const Navbar = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const isLoggedIn = localStorage.getItem('user');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <header>
            <div className="Navbar">
              <a href="" className="logotype"></a>
              {isLoggedIn ? (
                <div>
                  <button onClick={handleLogout}>Выйти</button>
                </div>
              ) : (
                <Link to={'/login'}>
                  <button onClick={toggleMode}>
                    <CiLogin /> Авторизация
                  </button>
                </Link>
              )}
            </div>
            <Carousel />
          </header>
        }
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registration" element={<RegistrationForm />} />
    </Routes>
  );
};

export default Navbar;
