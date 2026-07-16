"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { issueSchema } from "@/lib/schemas/issue";
import { handleServerError } from "@/lib/error-handler";

export async function createIssue(data) {
  try {
    const { userId } = await auth();

    // The user might not be logged in, we still want to allow feedback if possible,
    // but looking at the schema, User is related to userId.
    // If we require them to be logged in:
    // (We'll check if there's a user. If not, userId remains null)
    
    // We can also query to see if the user exists in our DB, since clerkUserId != User.id
    let dbUser = null;
    if (userId) {
      dbUser = await db.user.findUnique({
        where: { clerkUserId: userId },
      });
    }

    const validatedData = issueSchema.parse(data);

    const issue = await db.issue.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        priority: validatedData.priority,
        url: validatedData.url || null,
        userId: dbUser ? dbUser.id : null,
      },
    });

    return { success: true, issueId: issue.id };
  } catch (error) {
    if (error.name === 'ZodError') {
      return { success: false, error: "Validation failed. Please check your inputs." };
    }
    console.error("Error creating issue:", error);
    // Use the global error handler if it exists, or just return false
    return { success: false, error: "An unexpected error occurred while saving your issue." };
  }
}
