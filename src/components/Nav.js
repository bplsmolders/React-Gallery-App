import React from 'react';
import { NavLink } from 'react-router-dom';


const Nav = () => {
    return(
        <nav className="main-nav">
            <ul>
                <li><NavLink exact to="/drum">drums</NavLink></li>
                <li><NavLink exact to="/bass">bass</NavLink></li>
                <li><NavLink exact to="/guitar">guitar</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav