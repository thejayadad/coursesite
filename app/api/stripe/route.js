// pages/api/create-checkout-link.js

import { getServerSession } from 'next-auth';
import Stripe from 'stripe';
import prisma from '../../lib/prisma';

const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
    apiVersion: '2023-10-16',
});

export async function createCustomerIfNull(userEmail) {
    try {
        const session = await getServerSession();
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

export async function createCheckoutLink(courseId, userEmail) {
    try {
        const customer = await createCustomerIfNull(userEmail);
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

        return checkout.url;
    } catch (error) {
        console.error('Error creating checkout link:', error);
        return null;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { courseId } = req.body;
        const session = await getServerSession();
        const userEmail = session.user.email;

        const checkoutLink = await createCheckoutLink(courseId, userEmail);

        if (checkoutLink) {
            res.status(200).json({ url: checkoutLink });
        } else {
            res.status(500).json({ error: 'Error creating checkout link' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
