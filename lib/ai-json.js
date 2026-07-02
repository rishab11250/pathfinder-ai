import { parseAIJson } from "@/lib/prompt-safety";

export function parseAiResponse(aiResult) {
  return parseAIJson(aiResult.response.text());
}