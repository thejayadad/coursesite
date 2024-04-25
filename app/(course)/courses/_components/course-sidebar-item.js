'use client'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FaCheckCircle, FaLock, FaPlayCircle } from 'react-icons/fa';

const CourseSidebarItem = ({ label, id, isCompleted, courseId, isLocked }) => {
    const { pathname } = usePathname();
    const router = useRouter();

    let icon;
    let buttonStyles = 'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20';
    let borderStyles = 'ml-auto opacity-0 border-2 h-full transition-all';

    if (isLocked) {
        icon = <FaLock />;
    } else if (isCompleted) {
        icon = <FaCheckCircle />;
        buttonStyles += ' text-emerald-700';
        borderStyles += ' border-emerald-700';
    } else {
        icon = <FaPlayCircle />;
    }

    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    };

    if (isActive) {
        buttonStyles += ' text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700';
        borderStyles += ' opacity-100';
    }

    return (
        <button
            onClick={onClick}
            type='button'
            className={buttonStyles}
        >
            <div className='flex items-center gap-x-2 py-4'>
                {icon}
                {label}
            </div>
            <div className={borderStyles}></div>
        </button>
    );
};

export default CourseSidebarItem;
