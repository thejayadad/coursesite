'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateChapterDescription(eventData) {
  const user = await getServerUser();
  const userEmail = user.email;
  const { description, chapterId } = eventData;

  try {
    // Fetch user by email to get the correct userId

    // Update the chapter description using prisma.chapter.update
    const updatedChapter = await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        description,
      },
    });

    console.log("Chapter description updated:", updatedChapter);

  } catch (error) {
    console.error("Error updating chapter description:", error);
    throw new Error('Error: ' + error.message);
  }

  revalidatePath(`/dashboard`);
  redirect('/dashboard');
}
