'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input, Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from 'react-icons/fi';
import { createAttachment } from '@/lib/actions/course/create-course-attachments';
import FileUpload from './file-upload';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  fileUrl: Yup.string().required('File URL is required'),
});

const AttachmentForm = ({ courseId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await createAttachment({ name: data.name, url: data.fileUrl, courseId });
      toast.success('Attachment uploaded successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error uploading attachment:', error);
      toast.error('Error uploading attachment', {
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

  const handleUpload = (url) => {
    register('fileUrl').setValue(url); // Set the uploaded file URL to the form field
  };

  return (
    <div className='mt-6 border bg-liteGrey rounded-md p-4'>
    <div className='font-medium flex items-center justify-between'>
      Attachment Form
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('name')}
        placeholder="Enter attachment name"
        error={errors.name?.message}
      />
      <FileUpload onUpload={handleUpload} />
      <Button type='submit' disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </Button>
    </form>
    <ToastContainer />
  </div>
  );
};

export default AttachmentForm;
