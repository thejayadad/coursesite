'use client';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { signIn } from 'next-auth/react';

export default function LoginWithGoogle() {
  return (
    <div className="relative inline-block">
      <button
        className="bg-white text-center w-full py-4 flex gap-3 items-center justify-center"
        title="Login"
        onClick={() => signIn('google')}
      >
        <div className='flex flex-col items-center dark:text-white'>
        <FiUser size={24} />
        </div>
      </button>
    </div>
  );
}