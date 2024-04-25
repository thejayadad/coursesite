'use client'
import { createCheckoutLink } from '@/lib/stripe';
import { Button } from '@nextui-org/react';

const CourseEnrollButton = ({ courseId, price }) => {
    const handleEnroll = async () => {
        try {
            const checkoutLink = await createCheckoutLink(courseId);
            
            if (checkoutLink) {
                window.location.href = checkoutLink; // Redirect to Stripe checkout
            } else {
                console.error('Error creating checkout link');
            }
        } catch (error) {
            console.error('Error enrolling course:', error);
        }
    };

    return (
        <Button className='w-full md:w-auto' onClick={handleEnroll}>
            Enroll for ${price}
        </Button>
    );
};

export default CourseEnrollButton;
