import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import React from 'react'
import CourseSidebarItem from './course-sidebar-item';
import CourseProgress from '@/components/course-progress';

const CourseSidebar = async ({course, progressCount,}) => {
    const session = await getServerSession(authOptions);
    const userEmail = session.user?.email
    console.log("Email Sidebar " + userEmail)
    const purchase = await prisma.purchase.findUnique({
        where: {
            id: course.id,
            userId: userEmail,
            courseId: course.id
        }
    })
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
        <div className='p-8 flex flex-col border-b '>
            <h1 className='font-semibold'>
                {course.title}
            </h1>
            {/* {purchase && ( */}
                <div className='mt-10'>
                    <CourseProgress
                        variant="success"
                        value={progressCount}
                        size="sm"
                    />
                </div>
            {/* )} */}
        </div>
        <div className='flex flex-col w-full'>
            {course.chapters.map((chapter) => (
                <CourseSidebarItem
                    key={chapter.id}
                    id={chapter.id}
                    label={chapter.title}
                    isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                    courseId={course.id}
                    isLocked={!chapter.isFree && !purchase}
                />
            ))}
        </div>
    </div>
  )
}

export default CourseSidebar