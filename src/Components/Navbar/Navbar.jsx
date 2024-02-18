// Navbar.jsx
import React, { useState } from 'react';
import { CiLogin } from "react-icons/ci";
import { Link, Route, Routes } from 'react-router-dom';
import Carousel from './Carousel';
import LoginForm from '../Login/Login';
import RegistrationForm from '../Login/Reg';
import './style.css';

const Navbar = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const isLoggedIn = localStorage.getItem('user');

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <header>
                        <div className="Navbar">
                            <a href="" className='logotype'></a>
                            {isLoggedIn ? (
                                <div>
                                    <Link to={'/logout'}><button onClick={toggleMode}>Выйти</button></Link>
                                </div>
                            ) : (
                                <Link to={'/login'}><button onClick={toggleMode}><CiLogin /> Авторизация</button></Link>
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
}

export default Navbar;
