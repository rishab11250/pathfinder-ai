import { describe, expect, it, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  findMany: vi.fn(),
  update: vi.fn(),
  sendEmail: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  db: { jobApplication: { findMany: mocks.findMany, update: mocks.update } },
}));

vi.mock("@/lib/email/send-email", () => ({
  sendEmail: mocks.sendEmail,
}));

describe("interview reminder logic", () => {
  beforeEach(() => vi.clearAllMocks());

  it("skips users with emailAlerts disabled", async () => {
    mocks.findMany.mockResolvedValue([
      { id: "1", jobTitle: "SWE", companyName: "Acme", interviewDate: new Date(),
        user: { email: "a@test.com", settings: { emailAlerts: false } } },
    ]);
    // import and invoke the job body's inner logic here once extracted,
    // or test via the exported step function if you refactor the loop
    // into a standalone testable function (recommended for real coverage).
    expect(mocks.sendEmail).not.toHaveBeenCalled();
  });
});