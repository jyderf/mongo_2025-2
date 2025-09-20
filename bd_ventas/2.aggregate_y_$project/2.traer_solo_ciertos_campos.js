use("supermarket");

db.ventas.aggregate([

    {
        $project: {
            "_id": 1,
            "fecha": 1,
            "items": 1,
            "total": 1,
        }
    },
    
]);