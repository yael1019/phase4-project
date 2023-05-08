import React, { useRef } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

function Navbar() {
    const navRef = useRef();

    // this is a toggle, when the button is clicked it adds/removes this classname so the buttons are not shown at the same time
    const showNavbar = () => {
        navRef.current.classList.toggle('responsive_nav')
    }
  return (
    <div>
        <header>
            <h3>BlogBrew</h3>
            <nav ref={navRef}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/categories'>Category</NavLink>
                <NavLink to='/users'>My Profile</NavLink>
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
    </div>
  )
}

export default Navbar