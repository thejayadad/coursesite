'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCourseImage(eventData) {
  const user = await getServerUser();
  const userEmail = user.email;
  const { imageUrl, courseId } = eventData;

  if (!user) {
    throw new Error('User not found');
  }

  try {
    // Fetch user by email to get the correct userId
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // Update the course title using prisma.course.update
    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        imageUrl,
        userId: existingUser.userEmail,
      },
    });

    console.log("Course Image updated:", updatedCourse);

  } catch (error) {
    console.error("Error updating course image:", error);
    throw new Error('Error: ' + error.message);
  }

  revalidatePath(`/dashboard`);
  redirect('/dashboard');
}
