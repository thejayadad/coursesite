'use client'
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input, Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { createChapter } from '@/lib/actions/chapter/create-chapter';
import ChapterItem from './chapter-item';
import { useRouter } from 'next/navigation';

// Validation schema using Yup
const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});

// Separate component to render each chapter


const ChapterForm = ({ initialData, courseId }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter()

  const [chapters, setChapters] = useState(initialData.chapters);

  const toggleCreating = () => setIsCreating((current) => !current);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const newChapter = await createChapter({ title: data.title, courseId });
      setChapters([...chapters, newChapter]);

      toast.success('Chapter created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error creating chapter:', error);
      toast.error('Error creating chapter', {
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

  //OnRedorder

// ... (other imports)

// OnReorder function
// OnReorder function
const onReorder = async (newChapters) => {
    try {
      setIsUpdating(true);

      // Send reordered chapters to the server
      const response = await fetch('/api/reorderChapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ list: newChapters, courseId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state with reordered chapters
        setChapters(newChapters);
        toast.success('Chapters reordered successfully!');
      } else {
        throw new Error(data.error || 'Failed to reorder chapters');
      }
    } catch (error) {
      console.error('Error reordering chapters:', error);
      toast.error('Error reordering chapters');
    } finally {
      setIsUpdating(false);
    }
  };

  
  // Load the order from localStorage on component mount
  useEffect(() => {
    const storedOrder = localStorage.getItem('chapterOrder');
    if (storedOrder) {
      const order = JSON.parse(storedOrder);
      const reorderedChapters = initialData.chapters.sort((a, b) => {
        return order.indexOf(a.id) - order.indexOf(b.id);
      });
      setChapters(reorderedChapters);
    }
  }, []);
  

  // Load the order from localStorage on component mount
  useEffect(() => {
    const storedOrder = localStorage.getItem('chapterOrder');
    if (storedOrder) {
      const order = JSON.parse(storedOrder);
      // Reorder chapters based on stored order
      const reorderedChapters = [...initialData.chapters].sort((a, b) => {
        return order.indexOf(a.id) - order.indexOf(b.id);
      });
      setChapters(reorderedChapters);
    }
  }, [initialData.chapters]);

  // Check for reordered chapter IDs in local storage on component mount
  useEffect(() => {
    const storedChapterOrder = localStorage.getItem('chapterOrder');
    if (storedChapterOrder) {
      const reorderedChapterIds = JSON.parse(storedChapterOrder);
      // Reorder chapters based on reorderedChapterIds
      const reorderedChapters = reorderedChapterIds.map(id => chapters.find(chapter => chapter.id === id));
      setChapters(reorderedChapters);
    }
  }, []);
  
  
  // ... (rest of the component remains the same)
  const onEdit = (id) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`)
  }

  return (
    <div className='mt-6 border bg-liteGrey rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course Chapter
        <Button onClick={toggleCreating} variant='light'>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <FiPlus className='h-4 w-4 mr-2' />
              Add Chapter
            </>
          )}
        </Button>
      </div>
      {!isCreating && chapters.length === 0 && (
        <div>
          No Chapters
        </div>
      )}
      {chapters.map((chapter) => (
        <ChapterItem 
        onEdit={onEdit}
        onReorder={onReorder} 
        items={initialData.chapters || []}
        key={chapter.id} title={chapter.title} />
      ))}
      {isCreating && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='Introduction To Course...'
                  error={errors.title?.message}
                />
              )}
            />
            <Button type='submit' disabled={loading}>
              {loading ? 'Loading...' : 'Save'}
            </Button>
          </form>
        </>
      )}
      {!isCreating && (
        <p className='text-xs text-muted-foreground mt-4'>
          Drag and Drop To reorder Chapters
        </p>
      )}
      <ToastContainer />
    </div>
  );
};

export default ChapterForm;
