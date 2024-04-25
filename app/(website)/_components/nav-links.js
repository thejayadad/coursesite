
import AuthLinks from '@/components/header/auth-links'
import React from 'react'

import LogoutButton from '@/app/(website)/_components/logout-button';
import {Button, ButtonGroup} from "@nextui-org/react";
import Link from "next/link"

const NavLinks = () => {

  return (
    <div className='flex gap-x-2 ml-auto items-center'>    
         

                <Link href="/teacher/courses">
                    <Button
                    variant='light'
                    >
                        Teacher
                    </Button>
                </Link>

        <AuthLinks />
    </div>
  )
}

export default NavLinks