import { NextRequest, NextResponse } from 'next/server';
import { getPdfChunks } from '@/lib/pdf-processor';
import { getEmbeddings } from '@/lib/huggingface';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No se subió ningún archivo" }, { status: 400 });
    }

    // 1. Convertir el archivo a Buffer para procesarlo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Extraer los fragmentos (Chunks) usando tu procesador
    const chunks = await getPdfChunks(buffer);

    // 3. Opcional: Obtener los vectores (Embeddings) de los primeros trozos para probar
    // Aquí podrías mapear los chunks para enviarlos a Hugging Face
    const textContents = chunks.map(doc => doc.pageContent);
    const vectors = await getEmbeddings(textContents.slice(0, 5)); // Probamos con los primeros 5

    return NextResponse.json({ 
      message: "PDF procesado con éxito", 
      chunkCount: chunks.length,
      preview: textContents[0].substring(0, 100) + "...",
      vectorsReady: !!vectors
    });

  } catch (error) {
    console.error("Error en API Upload:", error);
    return NextResponse.json({ error: "Error interno al procesar el PDF" }, { status: 500 });
  }
}