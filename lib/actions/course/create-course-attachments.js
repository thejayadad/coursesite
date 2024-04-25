'use server'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";

// model Attachment {
//     id       String   @id @default(cuid())
//     name     String
//     url      String?
//     courseId String
//     course   Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
//   }
import cloudinary from 'cloudinary';

// Initialize Cloudinary
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});



export async function createAttachment(eventData) {
    const user = await getServerUser();
    const userEmail = user.email;
  
    if (!user) {
      throw new Error('User not found');
    }
  
    try {
      const { file } = eventData;
      const uploadResponse = await cloudinary.uploader.upload(file.path, {
        folder: 'attachments',
        resource_type: 'auto'
      });
  
      const newAttachment = await prisma.attachment.create({
        data: {
          name: file.name,
          url: uploadResponse.secure_url,
          courseId: eventData.courseId,
          userId: userEmail
        },
      });
  
      console.log("New attachment created:", newAttachment);
  
    } catch (error) {
      console.error("Error creating attachment:", error);
      throw new Error('Error: ' + error.message);
    }
  
    // Redirect or revalidate as needed
    // revalidatePath(`/dashboard`);
    // redirect('/dashboard');
  }