'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteChapter(eventData) {
  const user = await getServerUser();
  const { chapterId } = eventData;

  try {
    // Delete the chapter using prisma.chapter.delete
    await prisma.chapter.delete({
      where: { id: chapterId },
    });

    console.log("Chapter deleted");
  } catch (error) {
    console.error("Error deleting chapter:", error);
    throw new Error('Error: ' + error.message);
  }
  revalidatePath("/dashboard")
  redirect("/dashboard")
}

