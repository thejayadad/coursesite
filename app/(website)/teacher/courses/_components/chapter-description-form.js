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
import { updateChapterDescription } from '@/lib/actions/chapter/update-chapter-description';
import Editor from '@/components/editor';
import PreviewEditor from '@/components/preview-editor';

// Validation schema using Yup
const schema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
  });

  const ChapterDescriptionForm = ({initialData, courseId, chapterId}) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          description: initialData.description,
        },
    });
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [previewValue, setPreviewValue] = useState(initialData.description);  // State for preview

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // Update the chapter description
            await updateChapterDescription({ description: data.description, chapterId });

            // Update the preview
            setPreviewValue(data.description);

            toast.success('Chapter description updated successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error updating chapter description:', error);
            toast.error('Error updating chapter description', {
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
                Chapter Description
                <Button
                    onClick={toggleEdit}
                    variant='light'
                >
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                        <FiEdit className='h-4 w-4 mr-2' /> Chapter Description
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    <PreviewEditor value={previewValue} />  {/* Preview Editor */}
                </>
            )}
            {isEditing && (
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Editor
                                    {...field}
                                    placeholder="Enter course Description..."
                                    error={errors.description?.message}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        setPreviewValue(value);  // Update the preview value
                                    }}
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
}

export default ChapterDescriptionForm