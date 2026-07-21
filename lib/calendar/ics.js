function escapeICSText(str = "") {
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/**
 * Builds a standalone .ics file (RFC 5545 VEVENT) for a job interview.
 * Client-safe — no server call, no auth required.
 */
export function generateICSEvent({ jobTitle, companyName, interviewDate, notes, url }) {
  const start = new Date(interviewDate);
  if (isNaN(start.getTime())) {
    throw new Error("Invalid interview date");
  }
  const end = new Date(start.getTime() + 60 * 60 * 1000); // 1hr default
  const now = new Date();

  const uid = `interview-${companyName}-${start.getTime()}@pathfinder-ai`;
  const summary = escapeICSText(`Interview: ${jobTitle} at ${companyName}`);
  const description = escapeICSText(
    `Interview for the ${jobTitle} position at ${companyName}.` +
    (notes ? `\nNotes: ${notes}` : "") +
    (url ? `\nJob posting: ${url}` : "")
  );

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PathFinder AI//Job Tracker//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatICSDate(now)}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}