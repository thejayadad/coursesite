'use client'
import React, { useRef, useEffect } from 'react';
import { Spinner } from "@nextui-org/react";
import { FiLock } from 'react-icons/fi';

const VideoPlayer = ({ chapterId, title, courseId, videoUrl, nextChapterId, playbackId, isLocked, completeOnEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Here, you can add logic to handle video playback,
    // such as loading the video source and playing the video.
    if (!isLocked) {
        videoRef.current.src = videoUrl; // Set video source to videoUrl from chapter
        videoRef.current.play();
    }
  }, [isLocked, playbackId]);

  return (
    <div className='relative aspect-video'>
      {isLocked ? (
        <div className='absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary'>
          <FiLock className='h-8 w-8' />
          <p>This Chapter is Locked</p>
        </div>
      ) : (
        <div className='absolute inset-0'>
          <video ref={videoRef} className='w-full h-full' controls />
          {/* Optional: Add a loading spinner if needed */}
          {/* <Spinner className='h-8 w-8 text-secondary' /> */}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
