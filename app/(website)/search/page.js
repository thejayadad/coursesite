import prisma from '@/lib/prisma'
import React from 'react'
import Categories from './_components/categories'
import { getCourses } from '@/lib/actions/progress/get-courses'
import CourseList from '@/components/course-list'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'


const SearchPage = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    const courses = await getCourses({
      userId,
    });

    return (
      <div className='p-6'>
        {/* <Categories
        items={categories}
        /> */}

        Search Page

        <CourseList
          items={courses}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className='p-6'>
        Error fetching data. Please try again later.
      </div>
    );
  }
}


export default SearchPage