interface TextStatistics {
  characterCount: number;
  characterCountNoSpaces: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  averageWordLength: number;
  averageSentenceLength: number;
  wordFrequency: Map<string, number>;
}

function getWords(palabras: string): string[] {
  return palabras
    .toLowerCase()
    .split(/\W+/)
    .filter(palabras => palabras.length > 0);
}

export function countWords(palabras: string): number {
  return getWords(palabras).length;
}

const STOP = ["el", "la", "los", "la", "y", "a"];

export function getWordFrequency(texto: string): Map<string, number> {
  const palabras = getWords(texto);
  const frecuenciapalabras = new Map<string, number>();
  for (const palabra of palabras) {
    if (STOP.includes(palabra)) continue;
    frecuenciapalabras.set(palabra, (frecuenciapalabras.get(palabra) || 0) + 1);
  }
  return frecuenciapalabras;
}

export function palabrasunicas(texto: string): number {
  const palabras = getWords(texto);
  const palabrasUnicas = new Set<string>(palabras);
  return palabrasUnicas.size;
}

export function topPalabras(texto: string): string[] {
  const freq = getWordFrequency(texto);
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([palabra]) => palabra);
}
