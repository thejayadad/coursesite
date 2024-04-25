'use client'
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Switch } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiDollarSign } from 'react-icons/fi';  // Added FiDollarSign icon
import { useRouter } from "next/navigation";
import { updateChapterIsFree } from '@/lib/actions/chapter/update-chapter-isfree';

// Validation schema using Yup
const schema = Yup.object().shape({
    isFree: Yup.boolean().required('Free or Not?'),
});

const ChapterAccessForm = ({initialData, courseId, chapterId}) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    // Set initial value for isFree
    useEffect(() => {
        setValue('isFree', initialData.isFree);
    }, [initialData.isFree]);

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
    
            // Update isFree status
            const updatedChapter = await updateChapterIsFree({ isFree: data.isFree, chapterId });
    
            // Update the frontend state with the new isFree value
            setValue('isFree', updatedChapter.isFree);
    
            toast.success('Chapter access updated successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error updating chapter access:', error);
            toast.error('Error updating chapter access', {
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
                Course Chapter
                <Button onClick={toggleEdit} variant='light'>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <FiEdit className='h-4 w-4 mr-2' />
                            Update Chapter
                        </>
                    )}
                </Button>
            </div>
            {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="isFree"
                        control={control}
                        render={({ field }) => (
                            <Switch
                                {...field}
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                            />
                        )}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Update'}
                    </Button>
                </form>
            ) : (
                <div className="flex items-center mt-4">
                <FiDollarSign className="h-4 w-4 mr-2" />
                {initialData.isFree ? 'Free Course' : 'Paid Course'}
            </div>
            
            )}
            <ToastContainer />
        </div>
    );
}

export default ChapterAccessForm;
