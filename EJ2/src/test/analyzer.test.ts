import { contarPalabras, frecuenciaPalabras, palabrasunicas, topPalabras } from "../analyzer";

describe("Pruebas de countWords", () => {

    test("Texto vacío", () => {
        expect(contarPalabras("")).toBe(0);
    });

    test("Solo espacios y saltos de línea", () => {
        expect(contarPalabras(" \n \t ")).toBe(0);
    });
    
    test("Palabras normales, guiones, y puntuación", () => {

        expect(contarPalabras("hola-mundo. prueba")).toBe(3);

        expect(contarPalabras("¡Hola! ¿Cómo estás? Tres palabras-cuatro.")).toBe(6);

    });


    test("Mayúsculas y minúsculas se cuentan igual", () => {
        expect(contarPalabras("HoLa mundo HOLA")).toBe(3);
    });
});

describe("Pruebas de getWordFrequency", () => {

    test("Texto vacío", () => {
        expect(frecuenciaPalabras("")).toEqual(new Map());
    });
    
    // ✅ Pasa: Ignorar stop words.
    test("Ignorar stop words", () => {
        const resultado = frecuenciaPalabras("el perro y el gato a la cama");
        const esperado = new Map([
            ["perro", 1],
            ["gato", 1],
            ["cama", 1]
        ]);
        expect(resultado).toEqual(esperado);
    });
    

    test("Mayúsculas y minúsculas se cuentan igual", () => {
        const resultado = frecuenciaPalabras("Manzana pera MANZANA");
        const esperado = new Map([
            ["manzana", 2],
            ["pera", 1]
        ]);
        expect(resultado).toEqual(esperado);
    });

    test("Cuenta la frecuencia correcta", () => {
        const texto = "uno dos uno tres dos uno";
        const esperado = new Map([
            ["uno", 3],
            ["dos", 2],
            ["tres", 1]
        ]);
        expect(frecuenciaPalabras(texto)).toEqual(esperado);
    });
});

describe("Pruebas de palabrasunicas", () => {
    test("Texto vacío", () => {
        expect(palabrasunicas("")).toBe(0);
    });

    test("Palabras repetidas", () => {
        expect(palabrasunicas("hola hola mundo")).toBe(2);
    });

    test("Mayúsculas y minúsculas cuentan como la misma palabra", () => {
        expect(palabrasunicas("Hola hOlA mundo Mundo")).toBe(2);
    });
    
    test("Cuenta palabras únicas ignorando stop words", () => {
        expect(palabrasunicas("el gato y la gata")).toBe(4);
    });
});

describe("Pruebas de topPalabras", () => {
    test("Texto vacío", () => {
        expect(topPalabras("")).toEqual([]);
    });

    test("Texto con más de 5 palabras", () => {
        const top = topPalabras("a b c d e f g a b a b");

        const esperado = ["a", "b", "c", "d", "e"]; // o ["b", "a", "c", "d", "e"]

        expect(top.length).toBe(5);
        expect(top).toEqual(expect.arrayContaining(["a", "b", "c", "d", "e"]));
    });

    test("Ignora stop words", () => {
        const texto = "palabra el y palabra la a palabra"; // 'palabra' aparece 3 veces
        expect(topPalabras(texto)).toEqual(["palabra"]);
    });

    test("Texto con menos de 5 palabras únicas", () => {
        const top = topPalabras("uno dos uno");
        expect(top).toEqual(["uno", "dos"]);
    });
});