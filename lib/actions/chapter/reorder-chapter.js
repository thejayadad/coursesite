'use server'
// 'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";

export async function reorderChapter(req, res) {
  const user = await getServerUser();
  const { list, courseId } = req.body;

  try {
    // Update positions based on new order
    for (let index = 0; index < list.length; index++) {
      const { id } = list[index];
      await prisma.chapter.update({
        where: { id },
        data: { position: index },
      });
    }

    // Update the course with the new chapter order
    const orderedChapterIds = list.map(item => item.id);
    await prisma.course.update({
      where: { id: courseId },
      data: { chapterOrder: orderedChapterIds },
    });

    console.log("Chapters reordered successfully");

  } catch (error) {
    console.error("Error reordering chapters:", error);
  }
}
