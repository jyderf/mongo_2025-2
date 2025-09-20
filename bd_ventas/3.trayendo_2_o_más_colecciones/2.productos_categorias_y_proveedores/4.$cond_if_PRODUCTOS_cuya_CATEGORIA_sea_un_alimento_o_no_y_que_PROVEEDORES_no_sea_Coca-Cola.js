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
        $lookup: {
            from: "proveedores",
            localField: "proveedor_id",
            foreignField: "_id",
            as: "prov"
        }
    },
    {
        $unwind: "$prov"
    },
    {
        $match: {
            $and: [
                { $or: [{ "cat.nombre": "Granos" }, { "cat.nombre": "Bebidas" }] },
                { $or: [{ "_id": 26 }, { "_id": 27 }, { "_id": 28 }] }
            ]
        }
    },
    {
        $project: {
            _id: 1,
            nombre: 1,
            categoria: "$cat.nombre", // Renombramos 'cat.nombre' a 'categoria'
            precio: 1,
            stock: 1,
            proveedor: "$prov.nombre",
            sub_categoria: {
                $cond: {
                    if: { $and: [{ $eq: ["$nombre", "Cerveza lata"] }, { $eq: ["$cat.nombre", "Bebidas"] }] },
                    then: "El producto no es para niños",
                    else: "El producto es para el público en general",
                }
            }
        }
    }
]);
/*

RESULTADO

[
  {
    "_id": 26,
    "nombre": "Gaseosa cola 1.5L",
    "precio": 4200,
    "stock": 110,
    "categoria": "Bebidas",
    "proveedor": "Coca-Cola",
    "sub_categoria": "El producto es para el público en general"
  },
  {
    "_id": 27,
    "nombre": "Jugo de naranja",
    "precio": 3600,
    "stock": 90,
    "categoria": "Bebidas",
    "proveedor": "Coca-Cola",
    "sub_categoria": "El producto es para el público en general"
  },
  {
    "_id": 28,
    "nombre": "Cerveza lata",
    "precio": 3500,
    "stock": 200,
    "categoria": "Bebidas",
    "proveedor": "Coca-Cola",
    "sub_categoria": "El producto no es para niños"
  }
]
*/