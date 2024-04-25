'use client'
// CourseCard.js
import React from 'react';
import Link from "next/link";
import CourseProgress from './course-progress';

const CourseCard = ({ id, title, imageUrl, chaptersLength, price, progress, category }) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className='group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full'>
        <div className='relative w-full aspect-video rounded-md overflow-hidden'>
          <img
            src={imageUrl}
            alt={title}
            className='object-cover'
          />
        </div>
        <div className='flex flex-col pt-2'>
          <div className='text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2'>
            {title}
          </div>
          <p className='text-xs text-muted-foreground'>
            {category}
          </p>
          <div className='py-2 flex items-center gap-x-2 text-sm md:text-xs'>
            <div className='flex items-center gap-x-1 text-slate-500'>
              Icon
              <span>{chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}</span>
            </div>
          </div>
          {progress !== null ? (
            <div>
              <div>
                <CourseProgress
                  size="sm"
                  value={progress}
                  variant={progress === 100 ? "success" : "default"}
                />
              </div>
            </div>
          ) : (
            <>
              <p className='text-md md:text-sm font-medium text-slate-700'>
                ${price}
              </p>
              <div>
                <CourseProgress
                  size="sm"
                  value={progress}
                  variant={progress === 100 ? "success" : "default"}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
