import React from 'react';
import { NavLink } from 'react-router-dom';


const Nav = () => {
    return(
        <nav className="main-nav">
            <ul>
                <li><NavLink exact to="/cats">cats</NavLink></li>
                <li><NavLink to="/dogs">dogs</NavLink></li>
                <li><NavLink exact to="/guitars">guitars</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav