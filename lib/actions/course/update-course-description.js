'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCourseDescription(eventData) {
  const user = await getServerUser();
  const userEmail = user.email;
  const { description, courseId } = eventData;

  try {


    // Update the course title using prisma.course.update
    const updatedCourse = await prisma.chapter.update({
      where: { id: courseId },
      data: {
        description,
      },
    });

    console.log("Course title updated:", updatedCourse);

  } catch (error) {
    console.error("Error updating course title:", error);
    throw new Error('Error: ' + error.message);
  }

  revalidatePath(`/dashboard`);
  redirect('/dashboard');
}
