
import { redirect } from 'next/navigation';
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import CourseSidebar from '../_components/course-sidebar';
import { getProgress } from '@/lib/actions/progress/get-progress';
import CourseNavbar from '../_components/course-navbar';

const layout = async ({children, params}) => {
    const session = await getServerSession(authOptions);
    const userId = session.email;
    const { id } = params;
    console.log("Pst Id " + id)

    const course = await prisma.course.findUnique({
        where: {
          id: id,
        }, 
        include: {
          chapters: {
            where: {
                isPublished: true,
            },
            include: {
                userProgress: {
                    where: {
                        userId,
                    }
                }
            },
            orderBy: {
                position: "asc"
            }
          }
        }
      })
      if(!course){
        return redirect("/")
      }
      const progressCount = await getProgress(userId, course.id)
  return (
    <div className='h-full'>
      <div className='h-[80px] md:pl-80 fixed inset-y-0 w-full z-50'>
        <CourseNavbar
          course={course}
          progressCount={progressCount}
        />
      </div>
    <div className='hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50'>
      <CourseSidebar
          course={course}
          progressCount={progressCount}
      />
    </div>
    <main className='md:pl-80 h-full pt-[80px]'>
      {children}
    </main>
  </div>
  )
}

export default layout
