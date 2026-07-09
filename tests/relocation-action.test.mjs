import { describe, expect, it, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  findUniqueUser: vi.fn(),
  relocationCreate: vi.fn(),
  generateGeminiContent: vi.fn(),
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: mocks.auth,
}));

vi.mock("@/lib/prisma", () => ({
  db: {
    user: {
      findUnique: mocks.findUniqueUser,
    },
    relocationAnalysis: {
      create: mocks.relocationCreate,
    },
  },
}));

vi.mock("@/lib/gemini", () => ({
  generateGeminiContent: mocks.generateGeminiContent,
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { analyzeRelocation } from "../actions/relocation.js";

describe("analyzeRelocation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns unauthorized when user is not authenticated", async () => {
    mocks.auth.mockResolvedValue({ userId: null });

    const result = await analyzeRelocation(
      "Bangalore",
      "Mumbai",
      "1000000"
    );

    expect(result.success).toBe(false);
    expect(result.errors._form[0]).toBe("Unauthorized");
  });

  it("returns validation error when required inputs are missing", async () => {
    mocks.auth.mockResolvedValue({ userId: "user-1" });
    mocks.findUniqueUser.mockResolvedValue({
      id: "db-user-1",
    });

    const result = await analyzeRelocation(
      "",
      "Mumbai",
      "1000000"
    );

    expect(result.success).toBe(false);
    expect(result.errors._form[0]).toContain("required");
  });

  it("returns error when user is not found", async () => {
    mocks.auth.mockResolvedValue({ userId: "user-1" });
    mocks.findUniqueUser.mockResolvedValue(null);

    const result = await analyzeRelocation(
      "Bangalore",
      "Mumbai",
      "1000000"
    );

    expect(result.success).toBe(false);
  });

  it("creates relocation analysis successfully", async () => {
    mocks.auth.mockResolvedValue({ userId: "user-1" });

    mocks.findUniqueUser.mockResolvedValue({
      id: "db-user-1",
    });

    mocks.generateGeminiContent.mockResolvedValue({
      response: {
        text: () =>
          JSON.stringify({
            costOfLivingDelta: "25% higher",
            equivalentSalary: "1250000",
            hiddenCosts: ["Rent"],
            relocationBonusScript: "Ask politely",
            colaNegotiationScript: "Negotiate COLA",
          }),
      },
    });

    mocks.relocationCreate.mockResolvedValue({
      id: "relocation-1",
    });

    const result = await analyzeRelocation(
      "Bangalore",
      "Mumbai",
      "1000000"
    );

    expect(result.success).toBe(true);
    expect(mocks.generateGeminiContent).toHaveBeenCalled();
    expect(mocks.relocationCreate).toHaveBeenCalled();
  });

  it("handles AI generation failure gracefully", async () => {
    mocks.auth.mockResolvedValue({ userId: "user-1" });

    mocks.findUniqueUser.mockResolvedValue({
      id: "db-user-1",
    });

    mocks.generateGeminiContent.mockRejectedValue(
      new Error("Gemini failure")
    );

    const result = await analyzeRelocation(
      "Bangalore",
      "Mumbai",
      "1000000"
    );

    expect(result.success).toBe(false);
  });
});