'use server'

import prisma from "@/lib/prisma";

export const getAllChapters = async () => {
    try {
        const chapters = await prisma.chapter.findMany({});
        return chapters;
    } catch (error) {
        console.log("Get Chapters Error ", error);
        throw new Error('Error fetching chapters');
    }
};
