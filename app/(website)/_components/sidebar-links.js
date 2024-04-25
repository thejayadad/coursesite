'use client'
import React from 'react'
import {FiBarChart, FiHome, FiMenu, FiSearch} from "react-icons/fi"
import SideBarItem from './sidebar-items'
import {} from "react-icons/fa"

const routes = [
    {
        icon: <FiHome />,
        label: "Home",
        href: "/"
    },
    {
        icon: <FiMenu />,
        label: "Dashboard",
        href: "/dashboard"
    },
    {
        icon: <FiBarChart />,
        label: "Analytics",
        href: "/teacher/numbers"
    },
    {
        icon: <FiSearch/>,
        label: "Browse",
        href: "/search"
    }
]

const SidebarLinks = () => {

    const links = routes;
  return (
    <div
    className='flex flex-col w-full'
    >
    {links.map( route => (
        <SideBarItem
            icon={route.icon}
            key={route.href}
            label={route.label}
            href={route.href}
        />
    ))}
    </div>
  )
}

export default SidebarLinks