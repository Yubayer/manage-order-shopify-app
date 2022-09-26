import React from 'react'
import { Link } from "react-router-dom";
function Nav() {
    return (
        <>
            <Link to="/">Home Page</Link>
            <Link to="/order">Order Page</Link>
            <Link to="/manage">Manage Page</Link>
        </>
    )
}

export default Nav