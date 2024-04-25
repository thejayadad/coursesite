'use client'
import React from 'react';

const CustomBanner = ({ variant, label }) => {
    let bgColor, textColor;

    switch (variant) {
        case 'success':
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500';
            textColor = 'text-black';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            break;
        default:
            bgColor = 'bg-gray-500';
            textColor = 'text-white';
            break;
    }

    return (
        <div className={`${bgColor} p-4 rounded-md shadow-md`}>
            <p className={`${textColor} font-semibold`}>{label}</p>
        </div>
    );
};

export default CustomBanner;
