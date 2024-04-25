'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateCourseTitle } from '@/lib/actions/course/update-course-title';
import { FiEdit } from 'react-icons/fi';

// Validation schema using Yup
const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});

const TitleForm = ({ initialData, courseId }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialData.title,
    },
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing]  = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Call the updateCourseTitle function to update the course title
      await updateCourseTitle({ title: data.title, courseId });

      toast.success('Course title updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error updating course title:', error);
      toast.error('Error updating course title', {
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
        Course Title
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
        {/* <form onSubmit={handleSubmit(onSubmit)}>
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
      </form> */}
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
  );
};

export default TitleForm;
