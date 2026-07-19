"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getAgentRuns() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const runs = await db.agentRun.findMany({
      where: {
        user: {
          clerkUserId: userId,
        },
      },
      orderBy: {
        startedAt: "desc",
      },
    });

    return { runs };
  } catch (error) {
    console.error("Error fetching agent runs:", error);
    return { error: error.message };
  }
}

export async function getAgentRun(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const run = await db.agentRun.findUnique({
      where: {
        id,
        user: {
          clerkUserId: userId,
        },
      },
    });

    if (!run) throw new Error("Agent run not found");

    return { run };
  } catch (error) {
    console.error("Error fetching agent run:", error);
    return { error: error.message };
  }
}

export async function createAgentRun(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const run = await db.agentRun.create({
      data: {
        userId: user.id,
        agentName: data.agentName,
        userPrompt: data.userPrompt,
        status: data.status || "Running",
        startedAt: new Date(),
      },
    });

    revalidatePath("/agent-history");

    return { run };
  } catch (error) {
    console.error("Error creating agent run:", error);
    return { error: error.message };
  }
}

export async function updateAgentRun(id, data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const run = await db.agentRun.update({
      where: {
        id,
        user: {
          clerkUserId: userId,
        },
      },
      data: {
        status: data.status,
        output: data.output,
        errorMessage: data.errorMessage,
        completedAt: data.status !== "Running" ? new Date() : null,
      },
    });

    revalidatePath("/agent-history");
    revalidatePath(`/agent-history/${id}`);

    return { run };
  } catch (error) {
    console.error("Error updating agent run:", error);
    return { error: error.message };
  }
}
