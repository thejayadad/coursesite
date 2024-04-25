'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";

export async function createCourse(eventData) {
  const user = await getServerUser();
  const userEmail = user.email;

  if (!user) {
    throw new Error('User not found');
  }

  console.log("UserEmail " + userEmail);

  try {
    const { title } = eventData;

    // Fetch user by email to get the correct userId
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    console.log("Existing user:", existingUser);

    // Create a new course using prisma.course.create
    const newCourse = await prisma.course.create({
      data: {
        title,
        userId: existingUser.email,  // Assign existingUser.id to userId
      },
    });

    console.log("New course created:", newCourse);

    return newCourse; // Return the new course data

  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error('Error: ' + error.message); // Throw the actual error message
  }
}
