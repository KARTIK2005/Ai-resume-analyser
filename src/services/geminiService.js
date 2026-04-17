import { formatGeminiResponse } from '../utils/formatResponse';

// For Vite, environment variables are prefixed with VITE_
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// Using the recommended default model for text tasks
const MODEL = "gemini-flash-latest"; 

export async function analyzeResume(resumeText, jobDescription) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const prompt = `Analyze the following resume against the given job description.

Return ONLY valid JSON:
{
  "score": number,
  "matched_skills": [],
  "missing_skills": [],
  "suggestions": [],
  "summary": ""
}

Resume:
${resumeText}

Job Description:
${jobDescription}`;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        // You can also restrict output formatting from the model using system instructions or response mime type:
        // however simple instruction to return JSON works best without enforcing strict JSON schema if Gemini api doesn't fully support it yet.
      })
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.error("Gemini API Error Detail:", errData);
        throw new Error(`API failed with status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the text part from the Gemini response structure
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!botReply) {
      throw new Error("Received an empty or unexpected response structure from Gemini API.");
    }

    // Process and validate JSON
    const parsedResult = formatGeminiResponse(botReply);
    
    return parsedResult;

  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
}
