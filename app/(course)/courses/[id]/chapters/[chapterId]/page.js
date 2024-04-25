import React from 'react';
import { getChapter } from '@/lib/actions/chapter/get-single-chapter';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import CustomBanner from '../../../_components/custom-banner';
import VideoPlayer from '../../../_components/video-player';
import CourseEnrollButton from '../../../_components/course-enroll-button';
import {Divider} from "@nextui-org/react";
import Preview from '../../../_components/preview';
import CourseProgress from '@/components/course-progress';
import CourseProgressButton from '../../../_components/course-progress-button';

const ChaptersPage = async ({ params }) => {
    console.log('Params:', params);  // Log the params object
    
    try {
        const session = await getServerSession(authOptions);
        const userEmail = session.user?.email;
        console.log("UserEmail Chap " + userEmail);

        const { id: courseId, chapterId } = params;  // Destructuring
        
        console.log("ChapterId", chapterId);
        console.log("CourseId", courseId);

        if (!courseId) {
            throw new Error('CourseId is undefined');
        }

        const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } = await getChapter({ userEmail, chapterId, courseId });

        if (!course || !chapter) {
            throw new Error('Course or Chapter not found');
        }

        const isLocked = !chapter.isFree && !purchase;
        const completeOnEnd = !!purchase && !userProgress?.isCompleted;

        if (userProgress?.isCompleted) {
            return <CustomBanner variant="success" label="You've already completed this chapter" />;
        }

        if (isLocked) {
            return (
                <div>
                    <CustomBanner variant="warning" label="You need to purchase this course" />
                    <div className='flex flex-col max-w-4xl mx-auto pb-2'>
                        <div className='p-4'>
                            <VideoPlayer
                                chapterId={chapterId}
                                title={chapter.title}
                                courseId={courseId}
                                videoUrl={chapter.videoUrl} // Corrected prop name
                                nextChapterId={nextChapter?.id}
                                isLocked={isLocked}
                                completeOnEnd={completeOnEnd}
                            />    
                        </div>  
                        <CourseEnrollButton
                                    courseId={params.courseId}
                                    price={course.price}
                                />  
                    </div>
                </div>
            );
        }

        return (
            <div>
                <CustomBanner
                    variant='success'
                    label="Enjoy this chapter"
                />
                <div className='flex flex-col max-w-4xl mx-auto pb-2'>
                    <div className='p-4'>
                        <VideoPlayer
                            chapterId={chapterId}
                            title={chapter.title}
                            courseId={courseId}
                            videoUrl={chapter.videoUrl} // Corrected prop name
                            nextChapterId={nextChapter?.id}
                            isLocked={isLocked}
                            completeOnEnd={completeOnEnd}
                        />    
                    </div>   
                    <div>
                        <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
                            <h2 className='text-2xl font-semibold mb-2'>{chapter.title}</h2>
                            {purchase ? (
                                <div>
                                    <div>
                                    <CourseProgress
                                    size="sm"
                                    value={progress}
                                    variant={progress === 100 ? "success" : "default"}
                                    />
                                </div>
                                </div>
                            ) : (
                                // <CourseEnrollButton
                                //     courseId={params.courseId}
                                //     price={course.price}
                                // />
                                <>
                                <CourseProgressButton
                                    chapterId={chapterId}
                                    courseId={courseId}
                                    nextChapterId={nextChapter?.id}
                                    isCompleted={userProgress?.isCompleted}
                                />
                                </>
                            )}
                        </div>
                        <Divider />    
                        <div>
                            <Preview
                                value={chapter.description}
                            />
                        </div>
                    </div>  
                </div>
            </div>
        );

    } catch (error) {
        console.log("Error fetching chapters: ", error);
        return <CustomBanner variant="error" label="Error fetching chapters" />;
    }
};

export default ChaptersPage;
