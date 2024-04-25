'use server'

import prisma from "@/lib/prisma";

export const getAllCourses = async () => {
    try {
        const courss = await prisma.course.findMany({});
        return  courss;
    } catch (error) {
        console.log("Get Post Error ", error);
        throw new Error('Error fetching posts');
    }
};
