import natural from "natural";
import similarity from "compute-cosine-similarity";

// Paso 1: Tus datos de libros
const libros = [
  { id: 1, titulo: "Harry Potter", autor: "J.K. Rowling", genero: "Fantasy", descripcion: "Wizard boy adventure" },
  { id: 2, titulo: "Lord of the Rings", autor: "J.R.R. Tolkien", genero: "Fantasy", descripcion: "Epic quest with a magic ring" },
  { id: 3, titulo: "The Martian", autor: "Andy Weir", genero: "Science Fiction", descripcion: "Astronaut survives on Mars" }
];

// Paso 2: Crear textos combinados
const textos = libros.map(libro => 
  `${libro.titulo} ${libro.genero} ${libro.autor} ${libro.descripcion}`
);

// Paso 3: Vectorizar usando TF-IDF
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
textos.forEach(texto => tfidf.addDocument(texto));

// Paso 4: Comparar libros leídos por el usuario
const librosLeidos = [1]; // Harry Potter

// Comparar el libro leído con todos los demás
const vectorBase = tfidf.listTerms(librosLeidos[0] - 1).map(t => t.tfidf);
const similitudes = libros.map((libro, idx) => {
  const vectorActual = tfidf.listTerms(idx).map(t => t.tfidf);
  return { 
    libro: libro, 
    similitud: similarity(vectorBase, vectorActual) 
  };
});

// Ordenar por mayor similitud
const recomendaciones = similitudes
  .filter(r => !librosLeidos.includes(r.libro.id)) // No recomendar el mismo libro
  .sort((a, b) => b.similitud - a.similitud);

console.log("Recomendaciones:");
console.log(recomendaciones);
