use("supermarket");

db.productos.aggregate([
  {
    $lookup: {
      from: "categorias",
      localField: "categoria_id",
      foreignField: "_id",
      as: "cat"
    }
  },
  {
    // Aplanamos el array 'cat' para poder acceder a sus campos directamente
    // y usar el $match de forma efectiva.
    $unwind: "$cat"
  },
  {
    // El $match debe ir aquí, después de que 'cat' esté disponible
    // y antes del $project que podría ocultarlo.
    $match: {
      $or: [{ "cat.nombre": "Frutas" }, { "cat.nombre": "Aseo" }]
    }
  },
  {
    // Finalmente, proyectamos los campos que queremos en el resultado.
    $project: {
      _id: 1,
      nombre: 1,
      categoria: "$cat.nombre", // Renombramos 'cat.nombre' a 'categoria'
      precio: 1,
      stock: 1,
      proveedor: 1
    }
  }
]);