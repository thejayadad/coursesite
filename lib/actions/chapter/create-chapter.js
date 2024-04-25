'use server'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";

export async function createChapter(eventData) {
  const user = await getServerUser();
  const userEmail = user.email;
  
  if (!user) {
    throw new Error('User not found');
  }

  try {
    const { title, courseId } = eventData;

    const lastChapter = await prisma.chapter.findFirst({
        where: {
            courseId: eventData.id
        },
        orderBy: {
            position: "desc",
        }
    })

    const newPosition = lastChapter ? lastChapter.position + 1: 1;



    // Create a new chapter using prisma.chapter.create
    const newChapter = await prisma.chapter.create({
      data: {
        title,
        position: newPosition,
        course: {
          connect: { id: courseId },  // Connect the chapter to the course
        },
      },
    });

    console.log("New chapter created:", newChapter);

  } catch (error) {
    console.error("Error creating chapter:", error);
    throw new Error('Error: ' + error.message); // Throw the actual error message
  }

  revalidatePath(`/dashboard`);
  redirect('/dashboard');
}
