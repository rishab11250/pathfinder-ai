import { generateGeminiContent } from "@/lib/ai/gemini";

export async function runAiGeneration(prompt) {
  return generateGeminiContent(prompt);
}