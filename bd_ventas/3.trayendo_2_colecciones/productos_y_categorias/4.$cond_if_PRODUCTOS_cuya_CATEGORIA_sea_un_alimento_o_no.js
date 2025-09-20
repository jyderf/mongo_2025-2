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
    $unwind: "$cat"
  },
  {
    $match: {
      $or: [{ "cat.nombre": "Frutas" }, { "cat.nombre": "Aseo" }]
    }
  },
  {
    $project: {
      _id: 1,
      nombre: 1,
      categoria: "$cat.nombre", // Renombramos 'cat.nombre' a 'categoria'
      precio: 1,
      stock: 1,
      proveedor: 1,
      sub_categoria:{
        $cond:{
            if:{$eq:["$cat.nombre","Aseo"]},
            then:"El producto no es un alimento",
            else:"El producto es un alimento",
        }
      }
    }
  }
]);