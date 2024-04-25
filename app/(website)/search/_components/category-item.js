// CategoryItem.js
import React from 'react';

const CategoryItem = ({ label, icon }) => {
  return (
    <div className='flex items-center gap-x-1'>
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default CategoryItem;
