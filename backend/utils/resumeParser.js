import { PDFParse } from 'pdf-parse';

export const extractResumeTextFromBuffer = async (buffer) => {
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();
  return result.text;
};
