import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'
import { FaSchool } from 'react-icons/fa';
import TitleForm from '../_components/title-form';
import DescriptionForm from '../_components/decription-form';
import ImageUrlForm from '../_components/imageurl-form';
import CategoryForm from '../_components/category-form';
import PriceForm from '../_components/price-form';
import AttachmentForm from '../_components/attachment-form';
import ChapterForm from '../_components/chapter-form';
import { ToastContainer } from 'react-toastify';

const CourseIdPage = async ({params}) => {
  const { id } = params;
  console.log("Pst Id " + id)
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    }, 
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        }
      }
    }
  })
  if(!course){
    return redirect("/")
  }
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.price,
    course.chapters.some(chapter => chapter.isPublished)
  ]
  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completedText = `(${completedFields} / ${totalFields})`

  
  return (
   <section className='p-6'>
    <div className='flex items-center justify-between'>
      <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>
              Course Setup
          </h1>
          <span className='text-sm text-primary'>Complete All Field {completedText}</span>
      </div>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-16'>
      <div>
        <div className='flex items-center gap-x-2'>
          {/* <FaSchool className='text-slate-700'/> */}
            <h1 className='text-xl flex items-center space-x-2'>
              
              Customize Your Course
            </h1>
        </div>
        <TitleForm
          initialData={course}
          courseId={course.id}
        />
        <DescriptionForm
          initialData={course}
          courseId={course.id}
        />
        <ImageUrlForm
          initialData={course}
          courseId={course.id}
        />
          <CategoryForm
          initialData={course}
          courseId={course.id}
        />

      </div>
      <div className='space-y-6'>
        <div>
          <div className='flex items-center gap-x-2'>
            Icon Here
            <h2 className='text-xl'>Course Chapters</h2>
          </div>
          <div>
          <ChapterForm
          initialData={course}
          courseId={course.id}
        />
          </div>
        </div>
        <div>
          <div className='flex items-center gap-x-2'>
            $ <h2 className='text-xl'>Sell Your Course</h2>
          </div>
          <PriceForm
            initialData={course}
            courseId={course.id}
          />
        </div>
        <div>
          <div className='flex items-center gap-x-2'>
              File Upload
              <h2 className='text-xl'>
                Resources & Attachments
              </h2>
          </div>
          <AttachmentForm
            initialData={course}
            courseId={course.id}
          />
        </div>
      </div>
    </div>
    <ToastContainer />
   </section>
  )
}

export default CourseIdPage