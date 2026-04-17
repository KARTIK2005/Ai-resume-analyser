/**
 * Cleans the raw text response from the Gemini API and parses it to a JSON object.
 * It removes markdown code block backticks if present.
 * @param {string} rawResponse 
 * @returns {object}
 */
export function formatGeminiResponse(rawResponse) {
  try {
    let cleanString = rawResponse.trim();
    
    // Remove markdown json block wrappers if they exist
    if (cleanString.startsWith('```json')) {
      cleanString = cleanString.replace(/^```json/, '');
    } else if (cleanString.startsWith('```')) {
      cleanString = cleanString.replace(/^```/, '');
    }
    
    if (cleanString.endsWith('```')) {
      cleanString = cleanString.replace(/```$/, '');
    }
    
    cleanString = cleanString.trim();

    const parsed = JSON.parse(cleanString);

    // Provide default fallbacks just in case the LLM misses some fields
    return {
      score: typeof parsed.score === 'number' ? parsed.score : parseInt(parsed.score) || 0,
      matched_skills: Array.isArray(parsed.matched_skills) ? parsed.matched_skills : [],
      missing_skills: Array.isArray(parsed.missing_skills) ? parsed.missing_skills : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      summary: parsed.summary || ""
    };

  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    console.debug("Raw Response was:", rawResponse);
    throw new Error("Failed to parse the analysis result. The API returned an invalid format.");
  }
}
