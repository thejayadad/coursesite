'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateChapterVideo(eventData) {
    const user = await getServerUser();
    const { videoUrl, chapterId } = eventData;
  
    if (!user) {
      throw new Error('User not found');
    }
  
    try {
      // Update the chapter videoUrl using prisma.chapter.update
      const updatedChapter = await prisma.chapter.update({
        where: { id: chapterId },
        data: {
          videoUrl,
        },
      });

      // Create or update MuxData record
      let muxData;
      if (videoUrl) {
        muxData = await prisma.muxData.upsert({
          where: { chapterId },
          create: {
            assetId: '', // Your assetId here
            playbackId: '', // Your playbackId here
            chapterId,
          },
          update: {
            assetId: '', // Update assetId if necessary
            playbackId: '', // Update playbackId if necessary
          },
        });
      }

      console.log("Chapter video updated:", updatedChapter);
      console.log("MuxData:", muxData);
  
    } catch (error) {
      console.error("Error updating chapter video:", error);
      throw new Error('Error: ' + error.message);
    }
  
    revalidatePath(`/dashboard`);
    redirect('/dashboard');
}
