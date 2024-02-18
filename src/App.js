import React from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';

const App = () => {

  return (
    <div className='Container'>
      <Navbar/>
      <Home/>
    </div>
  );
};

export default App;
