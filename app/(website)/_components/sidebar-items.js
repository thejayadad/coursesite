'use client'
import React from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const SideBarItem = ({ icon, label, href }) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = pathname === href;

    const onClick = () => {
        router.push(href);
    };

    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex items-center gap-x-2 text-sm font-[500] pl-5 transition-all",
                isActive ? "text-primary bg-primary/60" : "text-secondary hover:text-secondary hover:bg-primary/60"
            )}
        >
            <div className='flex items-center gap-x-2 py-4'>
                <span className={clsx(icon.props.className, isActive ? 'text-primary' : 'text-secondary')}>
                    {icon}
                </span>
                <span className={isActive ? 'text-primary' : 'text-secondary'}>{label}</span>
            </div>
        </button>
    );
};

export default SideBarItem;
