'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function updateChapterTitle(eventData) {
  const user = await getServerUser();
  const { title, chapterId } = eventData;

  try {
    // Update the chapter title using prisma.chapter.update
    const updatedChapter = await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        title,
      },
    });

    console.log("Chapter title updated:", updatedChapter);

  } catch (error) {
    console.error("Error updating chapter title:", error);
    throw new Error('Error: ' + error.message);
  }

  revalidatePath(`/dashboard`);
  redirect('/dashboard');
}
