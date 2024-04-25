'use client'
import { Button } from '@nextui-org/react';
import { FiX, FiCheckCircle } from "react-icons/fi";
import { updateProgress } from '@/lib/actions/chapter/progress-up';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseProgressButton = ({ chapterId, courseId, nextChapterId, isCompleted }) => {
  
  const handleMarkComplete = async () => {
    try {
      await updateProgress({ chapterId }, true);

      // Show toast notification
      toast.success('Chapter marked as complete!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to next chapter
      window.location.href = `/course/${courseId}/chapters/${nextChapterId || 'complete'}`;
    } catch (error) {
      console.error('Error marking chapter as complete:', error);
      
      // Show toast notification for error
      toast.error('Failed to mark chapter as complete', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Button
        type='button'
        color={isCompleted ? "warning" : "success"}
        onClick={handleMarkComplete}
      >
        {isCompleted ? (
          <>
            <FiX className="inline-block mr-2" /> Not Complete
          </>
        ) : (
          <>
            <FiCheckCircle className="inline-block mr-2" /> Mark as complete
          </>
        )}
      </Button>
    </>
  );
};

export default CourseProgressButton;
