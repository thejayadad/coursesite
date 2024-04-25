'use client'
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/react';

export default function LogoutButton({
  className = 'flex items-center gap-2 p-4 px-4',
}) {
  return (
    <button
      className={`${className} hover:bg-primary/60 rounded-full hover:text-white`}
      onClick={() => signOut()}
    >
      <div className='flex flex-col  items-center dark:text-white'>
        <FiLogOut size={24} />
      </div>
    </button>
  );
}