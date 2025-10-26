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

// pongo las palabras almacenadas en minuscula
function palabrasObtener(palabras: string): string[] {
  return palabras
    .toLowerCase()
    .split(/\W+/)
    .filter(palabras => palabras.length > 0);
}

//tomo el contenido de palabras y las cuento con lenghth
export function contarPalabras(palabras: string): number {
  return palabrasObtener(palabras).length;
}

// palabras que se ignoran
const STOP = ["el", "la", "los", "la", "y", "a"];

// calcula la cantidad de veces que aparece cada palabra en el texto
export function frecuenciaPalabras(texto: string): Map<string, number> {
  const palabras = palabrasObtener(texto);
  const frecuenciapalabras = new Map<string, number>();
  for (const palabra of palabras) {
    if (STOP.includes(palabra)) continue;
    frecuenciapalabras.set(palabra, (frecuenciapalabras.get(palabra) || 0) + 1);
  }
  return frecuenciapalabras;
}

//tomo las palabras del texto, y al pasarlas por el set, se borran las repetidas
export function palabrasunicas(texto: string): number {
  const palabras = palabrasObtener(texto);
  const palabrasUnicas = new Set<string>(palabras);
  return palabrasUnicas.size;
}

//calcula la frecuencia de las palabras, las ordeno y devulvo las 5 que mas se usan
export function topPalabras(texto: string): string[] {
  const freq = frecuenciaPalabras(texto);
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([palabra]) => palabra);
}