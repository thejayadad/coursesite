'use server'
export const getChapter = async ({ userEmail, courseId, chapterId }) => {
    try {
        // Fetch the course first
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                price: true,
            },
        });

        if (!course) {
            throw new Error('Course not found');
        }

        const purchase = await prisma.purchase.findUnique({
            where: {
                id: courseId,
                userId: userEmail,
                courseId: courseId
            },
        });

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            },
        });

        if (!chapter) {
            throw new Error('Chapter not found');
        }

        let muxData = null;
        let attachments = [];
        let nextChapter = null;

        if (purchase) {
            attachments = await prisma.attachment.findMany({
                where: {
                    courseId,
                },
            });
        }

        if (chapter.isFree || purchase) {
            muxData = await prisma.muxData.findUnique({
                where: {
                    chapterId,
                },
            });
        }

        nextChapter = await prisma.chapter.findFirst({
            where: {
                courseId,
                position: {
                    gt: chapter.position,
                },
            },
            orderBy: {
                position: "asc",
            },
        });

        const userProgress = await prisma.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId: userEmail,
                    chapterId: chapterId
                }
            },
        });

        return {
            chapter,
            course,
            muxData,
            attachments,
            nextChapter,
            userProgress,
            purchase,
        };
    } catch (error) {
        console.log("Get Chapters Error ", error);
        throw new Error('Error fetching chapters');
    }
};
