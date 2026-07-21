import { describe, it, expect } from "vitest";
import { generateICSEvent } from "@/lib/calendar/ics";

describe("generateICSEvent", () => {
  it("produces a valid VEVENT block", () => {
    const ics = generateICSEvent({
      jobTitle: "Software Engineer",
      companyName: "Acme, Inc.",
      interviewDate: "2026-08-01T10:00:00.000Z",
      notes: "Bring laptop",
    });
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("SUMMARY:Interview: Software Engineer at Acme\\, Inc.");
    expect(ics).toContain("DTSTART:20260801T100000Z");
  });

  it("throws on an invalid date", () => {
    expect(() =>
      generateICSEvent({ jobTitle: "X", companyName: "Y", interviewDate: "not-a-date" })
    ).toThrow();
  });
});