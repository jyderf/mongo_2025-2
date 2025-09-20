use("supermarket");

db.productos.aggregate([
  
  { // Etapa 1: $lookup  // Esta etapa se encarga de unir documentos de la colección 'productos' con la colección 'categorias'.  
    $lookup: {
      from: "categorias",          // Colección externa con la que se hará la unión
      localField: "categoria_id",  // Campo en la colección 'productos' para la unión
      foreignField: "_id",         // Campo en la colección 'categorias' para la unión
      as: "cat"                    // Nombre del nuevo campo que contendrá los documentos de la categoría (será un array)
    }
  },
     
  {/*Etapa 2: $unwindEsta etapa "desanida" el array 'cat' que se creó en la etapa anterior.Es útil para procesar cada elemento del array como un documento independiente,facilitando el acceso directo a sus campos en las etapas siguientes. */
    $unwind: "$cat"
  },
  {// Etapa 3: $project // Esta etapa define la forma final del documento de salida. // Permite seleccionar, renombrar y excluir campos.
    $project: {
      _id: 0,                      // Oculta el campo _id para un resultado más limpio
      nombre: 1,                   // Incluye el campo 'nombre' del producto
      // creando un nuevo campo de nivel superior. // Renombra el campo "cat.nombre" a "categoria" para la salida,      
      categoria: "$cat.nombre", 
      precio: 1,                   // Incluye el campo 'precio'
      stock: 1,                    // Incluye el campo 'stock'
      proveedor: 1                 // Incluye el campo 'proveedor'
    }
  }
]);