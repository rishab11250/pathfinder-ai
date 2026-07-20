/**
 * PII (Personally Identifiable Information) Sanitizer
 * Redacts email addresses, phone numbers, and SSNs from text and prompt payloads before sending to AI endpoints.
 */

const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

// Matches US/International/Indian formatted & continuous 10-12 digit phone numbers
// Examples: +91 98765-43210, +919876543210, 98765-43210, (123) 456-7890, 123-456-7890, +1-800-555-0199, 9876543210
const PHONE_REGEX = /(?:\+\d{1,3}[\s.-]*)?(?:\(\d{2,4}\)|\d{2,5})[\s.-]*\d{3,5}[\s.-]+\d{3,5}\b|\b(?:\+\d{1,3})?\d{10,12}\b/g;

// Matches US Social Security Numbers
const SSN_REGEX = /\b\d{3}-\d{2}-\d{4}\b/g;

/**
 * Sanitizes a string by replacing PII patterns with redaction placeholder tags.
 *
 * @param {string} text - Input text string.
 * @returns {string} Sanitized string with PII masked.
 */
export function sanitizePII(text) {
  if (typeof text !== "string" || !text) return text;

  return text
    .replace(EMAIL_REGEX, "[REDACTED EMAIL]")
    .replace(SSN_REGEX, "[REDACTED SSN]")
    .replace(PHONE_REGEX, "[REDACTED PHONE]");
}

/**
 * Recursively sanitizes string values in an object or array payload.
 *
 * @param {object|array|string} payload - Target payload object/array to sanitize.
 * @returns {object|array|string} Payload copy with sanitized text fields.
 */
export function sanitizePIIPayload(payload) {
  if (!payload || typeof payload !== "object") {
    if (typeof payload === "string") return sanitizePII(payload);
    return payload;
  }

  if (Array.isArray(payload)) {
    return payload.map((item) => sanitizePIIPayload(item));
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizePII(value);
    } else if (value && typeof value === "object") {
      sanitized[key] = sanitizePIIPayload(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

/**
 * Checks whether a given string contains any recognizable PII patterns.
 *
 * @param {string} text - Input text string to evaluate.
 * @returns {boolean} True if PII is detected, false otherwise.
 */
export function hasPII(text) {
  if (typeof text !== "string" || !text) return false;
  const emailPattern = new RegExp(EMAIL_REGEX.source, "i");
  const phonePattern = new RegExp(PHONE_REGEX.source, "i");
  const ssnPattern = new RegExp(SSN_REGEX.source, "i");
  return emailPattern.test(text) || phonePattern.test(text) || ssnPattern.test(text);
}
