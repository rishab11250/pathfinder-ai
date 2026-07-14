import { parseAIJson } from "@/lib/ai/prompt-safety";

export function parseAiResponse(aiResult) {
  return parseAIJson(aiResult.response.text());
}