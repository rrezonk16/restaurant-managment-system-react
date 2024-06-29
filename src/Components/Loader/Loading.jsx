import React from 'react';
import logo from '../Images/logo_sm.png';
import './Loading.css'; 

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-animation">
        <img src={logo} alt="Loading logo" className="loading-logo" />
      </div>
    </div>
  );
};

export default Loading;
