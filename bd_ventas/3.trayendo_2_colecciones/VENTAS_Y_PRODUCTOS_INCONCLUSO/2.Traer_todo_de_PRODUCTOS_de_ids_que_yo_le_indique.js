use("supermarket");

db.productos.aggregate([

    {
        $match: {
            $or: [{ _id: 1 }, { _id: 6 }, { _id: 11 }, { _id: 26 }]
        }
    }

]);