"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getUserByClerkId(userId) {
  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("[Settings Action] Error fetching user:", error.message);
    throw error;
  }
}

function normalizeSettings(settings) {
  if (!settings) return { notifications: true, emailAlerts: true };
  return {
    notifications: settings.notifications ?? true,
    emailAlerts: settings.emailAlerts ?? true,
  };
}

function normalizeSettingsInput(data) {
  return {
    notifications: Boolean(data.notifications),
    emailAlerts: Boolean(data.emailAlerts),
  };
}

export async function getUserSettings(userId) {
  if (!userId) return null;

  try {
    const user = await getUserByClerkId(userId);

    const settings = await db.userSettings.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });

    return normalizeSettings(settings);
  } catch (error) {
    console.error("[Settings Action] Error in getUserSettings:", error.message);
    // Return default settings if DB call fails (e.g. table missing)
    return normalizeSettings(null);
  }
}

export async function updateUserSettings(userId, data) {
  const { userId: authenticatedUserId } = await auth();

  if (!authenticatedUserId || authenticatedUserId !== userId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await getUserByClerkId(userId);
    const settingsData = normalizeSettingsInput(data);

    const settings = await db.userSettings.upsert({
      where: { userId: user.id },
      update: settingsData,
      create: { 
        userId: user.id,
        ...settingsData
      },
    });

    revalidatePath("/settings");
    return normalizeSettings(settings);
  } catch (error) {
    console.error("[Settings Action] Error in updateUserSettings:", error.message);
    throw new Error("Failed to update settings. Please ensure database migrations are applied.");
  }
}
