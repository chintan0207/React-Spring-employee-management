import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
    <header>
        <nav className='navbar navbar-dark bg-dark p-2'>
            <Link className="logo" to="">Employee Management System</Link>
        </nav>
    </header>

</div>
  )
}

export default Header