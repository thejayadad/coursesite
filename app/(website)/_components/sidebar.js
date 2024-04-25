import Logo from '@/components/logo'
import React from 'react'
import SidebarLinks from './sidebar-links'

const Sidebar = () => {
  return (
    <div
    className='h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white'
    >
    <div className='p-6'>
        <Logo />
    </div>
    <div className='flex flex-col w-full'>
        <SidebarLinks />
    </div>
    </div>
  )
}

export default Sidebar