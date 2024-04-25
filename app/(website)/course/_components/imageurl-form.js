'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input, Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Added FiTrash2 for delete icon
import { updateCourseImage } from '@/lib/actions/course/update-course-imageurl';
import ImageUpload from './image-upload';

// Validation schema using Yup
const schema = Yup.object().shape({
  imageUrl: Yup.string().required('Image is required'),
});

const ImageUrlForm = ({ initialData, courseId }) => {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      imageUrl: initialData.imageUrl,
    },
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const imageUrl = watch('imageUrl'); // Get imageUrl from form values

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleUpload = (url) => {
    setValue('imageUrl', url); // Set the uploaded image URL to the form field
  };

  const handleDelete = () => {
    setValue('imageUrl', ''); // Clear the imageUrl field
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateCourseImage({ ...data, courseId }); // Pass the courseId along with the imageUrl
      toast.success('Image updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error updating image:', error);
      toast.error('Error updating image', {
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
        Course Image
        <Button onClick={toggleEdit} variant='light'>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FiEdit className='h-4 w-4 mr-2' /> Edit Image
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='imageUrl'
            control={control}
            render={({ field }) => (
              <div className='flex items-center'>
                <Input
                  {...field}
                  placeholder='Image URL...'
                  error={errors.imageUrl?.message}
                />
                {imageUrl && (
                  <Button
                    onClick={handleDelete}
                    className='ml-2'
                    variant='error'
                  >
                    <FiTrash2 />
                  </Button>
                )}
              </div>
            )}
          />
          {imageUrl && (
            <div className='mt-2'>
              <img src={imageUrl} alt='Course Preview' className='w-full h-auto max-h-40 object-cover' />
            </div>
          )}
          <div className='mt-2'>
            <ImageUpload onUpload={handleUpload} />
          </div>
          <Button
            className='bg-primary mt-4'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Update'}
          </Button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default ImageUrlForm;
