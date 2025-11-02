import React from 'react';
import logo from '../Assets/logo_nobackground.png';

function Logo() {
    return (
        <div className="logo-container">
            <img src={logo} alt="FitLife Logo" className="logo-image" />
            <h1 className="logo-title">FitLife</h1>
        </div>
    );
}

export default Logo;

