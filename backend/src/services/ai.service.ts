import { ai } from "../ai/gemini";
import { SYSTEM_PROMPT } from "../ai/prompt";

export async function extractCRM(records: any[]) {
  try {
    const prompt = `
${SYSTEM_PROMPT}

CSV Records:
${JSON.stringify(records)}

Return only valid JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    const text = response.text;

    console.log("========== GEMINI RAW RESPONSE ==========");
    console.log(text);
    console.log("=========================================");

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    console.log("========== CLEANED JSON ==========");
    console.log(cleaned);
    console.log("==================================");

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}