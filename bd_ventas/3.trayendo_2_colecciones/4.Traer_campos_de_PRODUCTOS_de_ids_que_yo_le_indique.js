use("supermarket");

db.productos.aggregate([
    {
        $project: {
            _id: 1,
            nombre: 1,
            categoria_id: 1,
            precio: 1,
            stock: 1,
            proveedor_id: 1

        }
    }, 
    {
        $match: {
            $or: [{ _id: 1 }, { _id: 6 }, { _id: 11 }, { _id: 26 }]
        }
    }

]);