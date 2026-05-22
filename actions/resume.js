"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateGeminiContent } from "@/lib/gemini";

// Add shared validation utilities
import { validateInput } from "@/app/lib/validate"; // Adjust route as per your project setup
import { resumeSaveSchema, resumeImprovementSchema } from "@/app/lib/schema"; 

export async function saveResume(rawContent) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Validate incoming boundary argument
  const validation = validateInput(resumeSaveSchema, { content: rawContent });
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  const { content } = validation.data;

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return { success: true, data: resume };
  } catch (error) {
    console.error("Error saving resume:", error);
    return { success: false, errors: { _form: ["Failed to save resume securely."] } };
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI(rawParams) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Validate and sanitize incoming parameters
  const validation = validateInput(resumeImprovementSchema, rawParams);
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  const { current, type } = validation.data;

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;

  try {
    const result = await generateGeminiContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return { success: true, data: improvedContent };
  } catch (error) {
    console.error("Error improving content:", error);
    return {
      success: false,
      errors: {
        _form: [
          error?.code === "RATE_LIMITED"
            ? "AI quota reached — please try again in a few minutes."
            : "Failed to improve content"
        ]
      }
    };
  }
}
