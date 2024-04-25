'use client'
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { FiTrash } from 'react-icons/fi';
import { deleteChapter } from '@/lib/actions/chapter/delete-chapter';
import { toast } from 'react-toastify';

const ChapterActions = ({ disabled, courseId, chapterId, isPublished }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteChapter({ chapterId });
      toast.success('Chapter deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting chapter:", error);
      toast.error('Error deleting chapter', {
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
    <div className='flex items-center gap-x-2'>
      <Button
        className='hover:bg-primary/90'
        onClick={() => {}}
        disabled={disabled}
        variant="bordered"
        size="md"
      >
        {isPublished ? "UnPublish" : "Publish"}
      </Button>
      <Button
        className='hover:text-red-600'
        variant="light"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? 'Deleting...' : <FiTrash className='h-4 w-4'/>}
      </Button>
    </div>
  );
}

export default ChapterActions;
