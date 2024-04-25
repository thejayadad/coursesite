'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from 'react-icons/fi';
import { useRouter, redirect } from 'next/navigation';
import { updateChapterTitle } from '@/lib/actions/chapter/update-chapter-title';

// Validation schema using Yup
const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

const ChapterTitleForm = ({courseId, chapterId, initialData}) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialData.title,
    },
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (data) => {
    try {
      console.log("onSubmit function called"); // Debugging log
  
      setLoading(true);
  
      // Call the updateChapterTitle function to update the chapter title
      await updateChapterTitle({ title: data.title, chapterId });
  
      toast.success('Chapter title updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      // Redirect to the new course page
      const newCourse = await createCourse({ title: data.title });
      console.log("New Course Data:", newCourse); // Debugging log
  
      if (newCourse && newCourse.id) {
        console.log("Redirecting to:", `/teacher/courses/${newCourse.id}`); // Debugging log
        await router.push(`/teacher/courses/${newCourse.id}`);
      } else {
        console.error('Error: Course ID is undefined');
        toast.error('Error redirecting to the new course', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
  
    } catch (error) {
      console.error('Error in onSubmit:', error); // Log the error
      toast.error('Error submitting form', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className='mt-6 border bg-liteGrey rounded-md p-4'>
    <div className='font-medium flex items-center justify-between'>
      Chapter Title
      <Button
        onClick={toggleEdit}
        variant='light'
        >
           {isEditing && (
            <>Cancel</>
           )}
           {!isEditing && (
            <>
             <FiEdit className='h-4 w-4 mr-2' /> Edit Title
            </>
           )}
        </Button>
        </div>
        {
            !isEditing && (
                <p>{initialData.title}</p>
            )
        }
        {isEditing && (
            <>
            
        <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter course title..."
              error={errors.title?.message}
            />
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Update'}
        </Button>
      </form>
            </>
        )}
      <ToastContainer />
    </div>
  )
}

export default ChapterTitleForm