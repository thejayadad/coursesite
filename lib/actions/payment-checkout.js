'use server'
import { authOptions } from "../auth"
import prisma from "../prisma";
import Stripe from "stripe";
import { select } from "@nextui-org/react";


export async function createCheckout(eventData) {
    const user = await getServerUser();
    const userEmail = user.email;  
    if (!user) {
      throw new Error('User not found');
    }  
    console.log("UserEmail " + userEmail);

    try {
       const course = await prisma.course.findUnique({
        where: {
            id: CourseId,
            isPublised: true,
        }
       }) 
       const purchase = await prisma.purchase.findUnique({
        where: {
            id: userEmail,
            userId: userEmail,
            courseId: courseId,
        }
       })

       const line_items: Stripe.Checkout.SessionCreateParams.LineItem = [
        {
            quantity: 1,
            price_data: {
                currency: "USD",
                product_data: {
                    name: course.title,
                    description: course.description,
                },
                unit_amount: Math.round(course.price * 100),
            }
        }
       ]

       let stripeCustomer = await prisma.stripeCustomer.findUnique({
        where: {
            id: userEmail,
            userId: userEmail
        },
        select: {
            stripeCustomerId: true,
        }
       })
       
    } catch (error) {

        console.log("Checkout Error " + error)
    }

}
