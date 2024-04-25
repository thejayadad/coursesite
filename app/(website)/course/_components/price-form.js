'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input, Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from 'react-icons/fi';
import { updateCoursePrice } from '@/lib/actions/course/update-course-price';

// Validation schema using Yup
const schema = Yup.object().shape({
  price: Yup.number().required('Price is required').positive('Price must be positive').integer('Price must be an integer'),
});

const PriceForm = ({ initialData, courseId }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      price: initialData.price,
    },
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await updateCoursePrice({ price: data.price, courseId });

      toast.success('Course price updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error updating course price:', error);
      toast.error('Error updating course price', {
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
        Course Price
        <Button onClick={toggleEdit} variant='light'>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FiEdit className='h-4 w-4 mr-2' /> Edit Price
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="number"
            placeholder="Enter course price"
            {...register('price')}
            error={errors.price?.message}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
          <Button type="submit" className="mt-4" disabled={loading}>
            {loading ? 'Loading...' : 'Update'}
          </Button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default PriceForm;
