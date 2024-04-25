
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import NavLinks from './nav-links'

const Navbar = () => {
  return (
    <div
    className='p-4 border-b h-full flex items-center bg-white shadow-sm'
    >  <MobileSidebar />
        <NavLinks />
    </div>
  )
}

export default Navbar