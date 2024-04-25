'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input, Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from 'react-icons/fi';
import { updateCourseDescription } from '@/lib/actions/course/update-course-description';

// Validation schema using Yup
const schema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
  });

const DescriptionForm = ({initialData, courseId}) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          description: initialData.description,
        },
      });
      const [loading, setLoading] = useState(false);
      const [isEditing, setIsEditing]  = useState(false)
    
      const toggleEdit = () => setIsEditing((current) => !current)
      const onSubmit = async (data) => {
        try {
          setLoading(true);
    
          // Call the updateCourseTitle function to update the course title
          await updateCourseDescription({ description: data.description, courseId });
    
          toast.success('Course description updated successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } catch (error) {
          console.error('Error updating course description:', error);
          toast.error('Error updating course description', {
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
    Course Description
    <Button
    onClick={toggleEdit}
    variant='light'
    >
       {isEditing && (
        <>Cancel</>
       )}
       {!isEditing && (
        <>
         <FiEdit className='h-4 w-4 mr-2' /> Edit Description
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
            <p>{initialData.description}</p>
        )
    }
    {isEditing && (
        <>
        
    <form onSubmit={handleSubmit(onSubmit)}>
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <Textarea
          {...field}
          placeholder="Enter course Description..."
          error={errors.description?.message}
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

export default DescriptionForm