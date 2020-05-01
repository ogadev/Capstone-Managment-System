import React from 'react';
import './styles/header.css';
function Header() {

/*************************************************************************
 this is the header, you can add it to any other pages. An example is the 
 dashboard.js file
***************************************************************************/
    return (
        <header>
            <h3 className="header-h3">Capstone Poject</h3>
            <ul>
                <li><a href="/home">home</a></li>
                <li><a href="/preferences">preferences</a></li>
                <li><a href="/proposal">proposal</a></li>
                <li><a href="#">sign out</a></li>
            </ul>
        </header>
    )
}

export default Header;