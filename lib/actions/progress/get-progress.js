'use server'

import prisma from "@/lib/prisma"


export const getProgress = async(userId, courseId) => {
    try {
        const publishedChapters = await prisma.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
            select: {
                id: true
            }
        })
        const publishedChaptersId = publishedChapters.map((chapter) => chapter.id)
        const validCompletedChapters = await prisma.userProgress.count({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChaptersId
                },
                isCompleted: true,
            }
        })
        const progressPercentage = (validCompletedChapters / publishedChaptersId.length) * 100;
        return progressPercentage
    } catch (error) {
        console.log("Error " + error)
    }
}