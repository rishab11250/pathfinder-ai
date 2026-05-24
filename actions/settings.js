"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getUserByClerkId(userId) {
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

function normalizeSettings(settings) {
  return {
    notifications: settings.notifications,
    emailAlerts: settings.emailAlerts,
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

  const user = await getUserByClerkId(userId);

  const existingSettings = await db.userSettings.findUnique({
    where: { userId: user.id },
  });

  if (existingSettings) {
    return normalizeSettings(existingSettings);
  }

  const settings = await db.userSettings.create({
    data: { userId: user.id },
  });

  return normalizeSettings(settings);
}

export async function updateUserSettings(userId, data) {
  const { userId: authenticatedUserId } = await auth();

  if (!authenticatedUserId || authenticatedUserId !== userId) {
    throw new Error("Unauthorized");
  }

  const user = await getUserByClerkId(userId);
  const settingsData = normalizeSettingsInput(data);

  const existingSettings = await db.userSettings.findUnique({
    where: { userId: user.id },
  });

  if (!existingSettings) {
    await db.userSettings.create({
      data: { userId: user.id },
    });
  }

  const settings = await db.userSettings.update({
    where: { userId: user.id },
    data: settingsData,
  });

  revalidatePath("/settings");
  return normalizeSettings(settings);
}
