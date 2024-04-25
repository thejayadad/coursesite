'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCourse } from '@/lib/actions/course/create-course';

// Validation schema using Yup
const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});

const CreateCourse = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const courseData = {
        title: data.title,
        // Add other course data fields here
      };

      // Call the createCourseClient function to create the course
      await createCourse(courseData);

      toast.success('Course created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Error creating course', {
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
    <div className='max-w-screen-5xl mx-auto flex flex-col justify-center md:items-center md:justify-center h-full p-6'>
      <h1 className='text-2xl'>Name Your Course</h1>
      <p className='text-sm text-secondary'>Name Your Course Below</p>
      <form className="space-y-8 mt-8" onSubmit={handleSubmit(onSubmit)}>
        <span>Course Title</span>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder='Course Title...'
              error={errors.title?.message}
            />
          )}
        />
        <div className='flex items-center gap-x-2'>
          <Link href="/">
            <Button>Cancel</Button>
          </Link>
          <Button
            className='bg-primary'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Continue'}
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateCourse;
