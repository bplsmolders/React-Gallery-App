import React from 'react';
import { NavLink } from 'react-router-dom';


const Nav = () => {
    return(
        <nav className="main-nav">
            <ul>
                <li><NavLink exact to="/drums">drums</NavLink></li>
                <li><NavLink to="/bass">bass</NavLink></li>
                <li><NavLink exact to="/guitars">guitars</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav