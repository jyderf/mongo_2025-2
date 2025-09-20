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
        // Esta etapa aplana el array 'cat'
        $unwind: "$cat"
    },
    {
        $match: {
            // Ahora el campo "cat.nombre" es accesible para la condición
            "cat.nombre": "Frutas"
        }
    },
    {
        $project: {
            nombre: 1,
            // Renombramos el campo anidado a un nuevo campo de nivel superior
            categoria: "$cat.nombre",
            precio: 1,
            stock: 1,
            proveedor: 1
        }
    }
])