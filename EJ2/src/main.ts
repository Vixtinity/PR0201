import { contarPalabras, topPalabras, frecuenciaPalabras } from "./analyzer.js";

/**
 * Obtiene las estadísticas principales del texto
 * @param texto El texto a analizar
 */
function analizarTexto(texto: string) {
  const palabras = texto.trim();
  const charCount = palabras.length;
  const charNoSpaces = palabras.replace(/\s+/g, "").length;
  const wordCount = contarPalabras(palabras);
  const sentenceCount = palabras.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphCount = palabras.split(/\n+/).filter(p => p.trim().length > 0).length;
  const avgWordLength = wordCount > 0 ? (charNoSpaces / wordCount).toFixed(2) : "0";
  const avgSentenceLength = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(2) : "0";


  (document.getElementById("charCount") as HTMLElement).textContent = charCount.toString();
  (document.getElementById("charNoSpaceCount") as HTMLElement).textContent = charNoSpaces.toString();
  (document.getElementById("wordCount") as HTMLElement).textContent = wordCount.toString();
  (document.getElementById("sentenceCount") as HTMLElement).textContent = sentenceCount.toString();
  (document.getElementById("paragraphCount") as HTMLElement).textContent = paragraphCount.toString();
  (document.getElementById("avgWordLength") as HTMLElement).textContent = avgWordLength.toString();
  (document.getElementById("avgSentenceLength") as HTMLElement).textContent = avgSentenceLength.toString();
}


function inicializarEventos() {
  const textarea = document.getElementById("texto") as HTMLTextAreaElement;
  const btn = document.getElementById("analizarBtn") as HTMLButtonElement;

  textarea.addEventListener("input", () => {
    const texto = textarea.value;
    (document.getElementById("charCount") as HTMLElement).textContent = texto.length.toString();
    (document.getElementById("wordCount") as HTMLElement).textContent = contarPalabras(texto).toString();
  });

  btn.addEventListener("click", () => analizarTexto(textarea.value));
}

inicializarEventos();
