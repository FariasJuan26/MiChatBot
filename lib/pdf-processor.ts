import pdf from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

/**
 * Esta función toma el archivo PDF y lo divide en trozos pequeños
 * para que la IA pueda procesarlos sin saturarse.
 */
export const getPdfChunks = async (fileBuffer: Buffer) => {
  try {
    // 1. Extraer el texto crudo del PDF
    const data = await pdf(fileBuffer);
    const rawText = data.text;

    // 2. Configurar el divisor de texto
    // Usamos chunks de 1000 caracteres con un solapamiento de 200
    // para no perder el contexto entre fragmentos.
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    // 3. Generar los fragmentos
    const chunks = await splitter.createDocuments([rawText]);
    
    return chunks;
  } catch (error) {
    console.error("Error procesando el PDF:", error);
    throw new Error("No se pudo procesar el archivo PDF.");
  }
};