'use client'
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import ChapterTitleForm from '../../../_components/chapter-title-form';
import ChapterDescriptionForm from '../../../_components/chapter-description-form';
import ChapterAccessForm from '../../../_components/chaper-access-form';
import ChapterVideoForm from '../../../_components/chapter-video-forms';
import Banner from '@/components/banner';
import ChapterActions from '../../../_components/chapter-actions-form';

const EditChapter = async ({ params, courseId, initialData }) => {
    const { id } = params;
    console.log("Chapter Id " + id);

    const chapter = await prisma.chapter.findUnique({
        where: {
            id: id,
            courseId: courseId
        },
        include: {
            muxData: true,
        }
    });

    if (!chapter) {
        return redirect("/dashboard");
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean)

    return (
        <>
            {!chapter.isPublished && (
                <Banner
                    isPublished={chapter.isPublished}
                />
            )}
            <div className='p-6'>
                <div className='flex items-center justify-between'>
                    <div className='w-full'>
                        <Link
                            href={`/teacher/courses/${courseId}`}
                            className='flex items-center text-sm hover:opacity-75 transition mb-6'
                        >
                            <FiArrowLeft className='h-4 w-4 mr-2'/> Back To Course Setup
                        </Link>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex flex-col gap-y-2'>
                                <h1 className='text-2xl font-medium'>
                                    Chapter Creation
                                </h1>
                                <span className='text-sm text-slate-700'>
                                    Complete All Fields {completionText}
                                </span>
                            </div>
                            <ChapterActions
                             disabled={!isComplete}
                             courseId={courseId}
                             chapterId={chapter.id}
                             isPublished={chapter.isPublished}
                            />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
                    <div className='space-y-4'>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                Icon <h2 className='text-xl'>Customize Your Chapter</h2>
                            </div>
                            {/* CHAPTER FORM */}
                            <ChapterTitleForm
                                initialData={chapter}
                                courseId={courseId}
                                chapterId={chapter.id} // Pass chapterId here
                            />
                            <ChapterDescriptionForm
                                initialData={chapter}
                                courseId={courseId}
                                chapterId={chapter.id}
                            />
                        </div>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                Icon <h2 className='text-xl'></h2>
                            </div>
                            <ChapterAccessForm
                                initialData={chapter}
                                courseId={courseId}
                                chapterId={chapter.id}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            Icon <h2 className='text-xl'>
                                Add A Video
                            </h2>
                        </div>
                        <ChapterVideoForm
                            initialData={chapter}
                            courseId={courseId}
                            chapterId={chapter.id}  
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditChapter;
