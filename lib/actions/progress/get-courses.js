'use server'

import { getProgress } from "./get-progress"
import prisma from "@/lib/prisma"

export const getCourses = async({userId, title, categoryId}) => {
    try {
        const courses = await prisma.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    }
                },
                purchases: {
                    where: {
                        userId,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        const coursesWithProgress = await Promise.all(courses.map(async course => {
            if (course.purchases.length === 0){
                return {
                    ...course,
                    progress: null
                }
            }
            const progressPercentage = await getProgress(userId, course.id)
            return {
                ...course,
                progress: progressPercentage
            }
        }));

        return coursesWithProgress; // Return the processed courses
    } catch (error) {
        console.log("error " + error);
        throw new Error('Error fetching courses'); // Throw an error to handle it in the component
    }
}
