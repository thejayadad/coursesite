import { getProgress } from '@/lib/actions/progress/get-progress';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'
import CourseSidebar from '../_components/course-sidebar';
import prisma from '@/lib/prisma';

const SingleCourse = async  ({ params}) => {
  const { id } = params;
  console.log("Pst Id " + id)
  const course = await prisma.course.findUnique({
    where: {
      id: id
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  })
  return (
    <div>
        Single Course
    </div>
  )
}

export default SingleCourse