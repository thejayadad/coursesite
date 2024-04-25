'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input, Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import VideoUpload from './video-upload';
import { updateChapterVideo } from '@/lib/actions/video/update-video';

// Validation schema using Yup
const schema = Yup.object().shape({
    videoUrl: Yup.string().required('Video is required'),
    videoTitle: Yup.string().required('Title is required'),
    videoDescription: Yup.string().required('Description is required'),
});

const ChapterVideoForm = ({ initialData, courseId, chapterId }) => {
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            videoUrl: initialData.videoUrl,
            videoTitle: initialData.videoTitle || '',
            videoDescription: initialData.videoDescription || '',
        },
    });
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const videoUrl = watch('videoUrl');
    const videoTitle = watch('videoTitle');
    const videoDescription = watch('videoDescription');
    
    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            // Update videoUrl in database
            await updateChapterVideo({
                videoUrl: data.videoUrl,
                chapterId,
            });
            
            toast.success('Video uploaded successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error updating video:', error);
            toast.error('Error updating video', {
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

    const handleDelete = () => {
        setValue('videoUrl', ''); // Clear the videoUrl value
    };
    
    return (
        <div className='mt-6 border bg-liteGrey rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Chapter Video
                <Button onClick={toggleEdit} variant='light'>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <FiEdit className='h-4 w-4 mr-2' /> Edit A Video
                        </>
                    )}
                </Button>
            </div>
            {isEditing && (
                <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name='videoUrl'
                        control={control}
                        render={({ field }) => (
                            <div className='flex items-center'>
                                <Input
                                    {...field}
                                    placeholder='Video URL...'
                                    error={errors.videoUrl?.message}
                                />
                                {videoUrl && (
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
         
                    {videoUrl && (
                        <div className='mt-2'>
                            <video controls className='w-full h-auto max-h-40'>
                                <source src={videoUrl} type='video/mp4' />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                    <div className='mt-2'>
                        <VideoUpload onUpload={(videoUrl) => setValue('videoUrl', videoUrl)} />
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
    )
}

export default ChapterVideoForm;
