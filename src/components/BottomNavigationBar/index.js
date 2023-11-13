import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const BottomNavigationBar = () => {
  return (
    <nav className="bottom-navbar">
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
};

export default BottomNavigationBar;
