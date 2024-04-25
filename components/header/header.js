import React from 'react'
import Logo from '../logo'
import AuthLinks from './auth-links'

const Header = () => {
  return (
    <header className='px-8 py-2 border-b-[1px]'>
        <nav className='flex justify-between mx-auto max-w-screen-2xl items-center'>
            <Logo />
            <AuthLinks />
        </nav>
    </header>
  )
}

export default Header