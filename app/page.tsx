import { TransformersChatbot } from '@/components/transformers-chatbot'

export default function Home() {
  return <TransformersChatbot />
}

const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  console.log("Respuesta del servidor:", data);
  alert("¡PDF cargado y procesado!");
};

// En tu JSX (el HTML del chat)
<input type="file" accept=".pdf" onChange={handleFileUpload} />