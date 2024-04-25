'use client'
import React from 'react';
import { FiCode, FiDollarSign, FiAirplane, FiHome, FiTrendingUp } from 'react-icons/fi';
import {FaCar, FaPlane} from "react-icons/fa"
import CategoryItem from './category-item';

const Categories = () => {
  const cats = [
    { name: 'Programming', icon: <FiCode /> },
    { name: 'Money', icon: <FiDollarSign /> },
    { name: 'Travel', icon: <FaPlane /> },
    { name: 'Cars', icon: <FaCar /> },
    { name: 'Real-estate', icon: <FiHome /> },
    { name: 'Stocks', icon: <FiTrendingUp /> },
  ];

  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pb-1'>
      {cats.map((category, index) => (
        <CategoryItem
          key={index}
          label={category.name}
          icon={category.icon}
        />
      ))}
    </div>
  );
};

export default Categories;
