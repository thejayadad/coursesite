import CourseList from '@/components/course-list'
import React from 'react'

const DashboardPage = async () => {
  return (
   <div className='p-6 space-y-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          Info Card
        </div>
        <div>
          Info Card
        </div>
      </div>
      {/* <CourseList /> */}
   </div>
  )
}

export default DashboardPage