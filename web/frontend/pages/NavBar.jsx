import React from 'react'
import { Link } from "react-router-dom";



function NavBar() {
    return (
        <>
            <ul class="nav flex-column card">
                <li class="nav-item">
                    <Link className='nav-link' to="/">Home Page</Link>
                </li>
                <li class="nav-item">
                    <Link className='nav-link' to="/order">Order Page</Link>
                </li>
                <li class="nav-item">
                    <Link className='nav-link' to="/manage">Manage Page</Link>
                </li>
            </ul>
        </>
    )
}

export default NavBar