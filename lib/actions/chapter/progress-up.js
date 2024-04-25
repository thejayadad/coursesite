'use server'
// updateProgress.js
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";

export async function updateProgress(params, isCompleted) {
    const user = await getServerUser();
    const userEmail = user.email;

    try {
        const userProgress = await prisma.userProgress.upsert({
            where: {
                id: userEmail,
                userId: userEmail,
                chapterId: params.chapterId
            },
            update: {
                isCompleted
            },
            create: {
                userId: userEmail,
                chapterId: params.chapterId,
                isCompleted,
            },
        });

        return userProgress;
    } catch (error) {
       console.log("Error Progress " + error);
       throw new Error('Failed to update progress');
    }
}
