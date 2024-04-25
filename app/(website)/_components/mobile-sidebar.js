'use client'
import React, {useState} from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import SidebarLinks from './sidebar-links';


const MobileSidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden"
            />
        </NavbarContent>
        <NavbarMenu>
            <NavbarItem className='mt-6'>
                <SidebarLinks />
            </NavbarItem>
        </NavbarMenu>
    </Navbar>
    </>
  )
}

export default MobileSidebar