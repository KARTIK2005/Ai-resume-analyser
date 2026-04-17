import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker using Vite's URL import
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

/**
 * Parses the uploaded resume file and returns the extracted text.
 * @param {File} file 
 * @returns {Promise<string>}
 */
export async function parseResume(file) {
  if (!file) throw new Error("No file provided");

  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  try {
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      return await parsePDF(file);
    } 
    else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      fileType === 'application/msword' ||
      fileName.endsWith('.docx') ||
      fileName.endsWith('.doc')
    ) {
      return await parseDOCX(file);
    } 
    else {
      throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
    }
  } catch (error) {
    console.error("Error parsing file:", error);
    throw new Error(`Failed to read the file: ${error.message}`);
  }
}

async function parsePDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  
  // Load the PDF document
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = "";
  
  // Iterate through each page
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(" ");
    fullText += pageText + "\n";
  }
  
  return fullText;
}

async function parseDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  
  // Extract raw text using mammoth
  const result = await mammoth.extractRawText({ arrayBuffer });
  
  return result.value || "";
}
