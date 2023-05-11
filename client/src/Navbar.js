import React, { useRef, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ handleLogout, setCategory, currentUser }) {
    const navRef = useRef();
    const navigate = useNavigate()
    // const [loggedin, setLoggedin] = useState(false)

    // this is a toggle, when the button is clicked it adds/removes this classname so the buttons are not shown at the same time
    const showNavbar = () => {
        navRef.current.classList.toggle('responsive_nav')
    }

    function handleClick() {
        setCategory(null)
        navigate('/')
    }

    function handleLoginClick() {
        // setLoggedin(!loggedin)
        navigate('/login')
    }

    function handleLogoutClick() {
        // setLoggedin(!loggedin)
        handleLogout()
        navigate('/')
    }

    return (
        <div>
            <header>
                <h3 id='BlogBrew-btn' onClick={handleClick}>BlogBrew</h3>
                <nav ref={navRef}>
                    <NavLink onClick={handleClick} to='/'>Home</NavLink>
                    <NavLink to='/categories'>Category</NavLink>
                    {
                        currentUser
                            ?
                            <NavLink to='/users/'>My Profile</NavLink>
                            :
                            ''
                    }
                    {/* this button is to close navbar on smaller screens */}
                    <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>
                {/* this button is to open navbar on smaller screens */}
                <button className='nav-btn' onClick={showNavbar}>
                    <FaBars />
                </button>
            </header>
            {
                currentUser 
                    ?
                    <button id='logout' onClick={handleLogoutClick}>Logout</button>
                    :
                    <button id='login' onClick={handleLoginClick}>Login</button>
            }
        </div>
    )
}

export default Navbar