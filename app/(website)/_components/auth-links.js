import React from 'react'
import { getServerSession } from 'next-auth';
import Link from "next/link"

import LogoutButton from './logout-button';
import LoginWithGoogle from './login-with-google';
import { authOptions } from '@/lib/auth';


const AuthLinks = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>  
          <div className='flex items-center'>
        {!!session ? (
          <div className='flex gap-2 items-center'>
            {/* <NewEvent categories={categories} /> */}
            <Link href={'/dashboard'}>
                DashBoard
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <LoginWithGoogle />
        )}
      </div>
    </>
  )
}

export default AuthLinks