export async function getEmbeddings(texts: string[]) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
    {
      headers: { 
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json" 
      },
      method: "POST",
      body: JSON.stringify({ inputs: texts }),
    }
  );

  if (!response.ok) {
    throw new Error("Fallo al obtener embeddings de Hugging Face");
  }

  return response.json();
}