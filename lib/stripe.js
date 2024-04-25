import { getServerSession } from 'next-auth';
import Stripe from 'stripe';
import prisma from './prisma';


export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
    apiVersion: '2023-10-16',
});

// Create Stripe customer if not exists
export async function createCustomerIfNull() {
    try {
        const session = await getServerSession(); // Remove authOptions since it's not defined here
        const userEmail = session.user.email;
        
        const user = await prisma.user.findFirst({ where: { email: userEmail } });

        if (!user?.stripe_customer_id) {
            const customer = await stripe.customers.create({
                email: userEmail,
            });

            await prisma.user.update({
                where: { id: user?.id },
                data: { stripe_customer_id: customer.id },
            });
        }

        return user?.stripe_customer_id;
    } catch (error) {
        console.error('Error creating customer:', error);
        return undefined;
    }
}

// Create checkout link
export async function createCheckoutLink(courseId) {
    try {
        console.log('createCheckoutLink called'); // Log when createCheckoutLink is called
        const customer = await createCustomerIfNull();
        const session = await getServerSession();
        const userEmail = session.user.email;

        console.log('User email:', userEmail); // Log the user email

        const course = await prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            throw new Error('Course not found');
        }

        const checkout = await stripe.checkout.sessions.create({
            success_url: "http://localhost:3000/profile/success",
            cancel_url: "http://localhost:3000/profile",
            customer: customer,
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: course.title,
                            description: course.description,
                        },
                        unit_amount: Math.round(course.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
        });

        console.log('Checkout URL:', checkout.url); // Log the checkout URL
        return checkout.url;
    } catch (error) {
        console.error('Error creating checkout link:', error);
        return null;
    }
}
