use("supermarket");

db.ventas.aggregate([

    {
        $match: {
            $or: [{ _id: { $eq: 1 } }, { _id: { $eq: 2 } }]
        }
    }

]);