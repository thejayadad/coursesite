'use server'
// use server
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateChapterIsFree(eventData) {
  const user = await getServerUser();
  const { isFree, chapterId } = eventData;

  try {
    // Update the chapter isFree status using prisma.chapter.update
    const updatedChapter = await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        isFree: isFree,
      },
    });

    console.log("Chapter isFree updated:", updatedChapter);

    // Return the updated chapter
    return updatedChapter;

  } catch (error) {
    console.error("Error updating chapter isFree:", error);
    throw new Error('Error: ' + error.message);
  }

  revalidatePath(`/dashboard`);
  redirect('/dashboard');
}
