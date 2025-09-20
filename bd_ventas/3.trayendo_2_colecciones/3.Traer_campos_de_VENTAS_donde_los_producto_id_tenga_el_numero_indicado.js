use("supermarket");

db.ventas.aggregate([
 {
        $project: {
                "_id": 1,
                "cliente_id":1,
                "fecha" :1,   
                "items": 1,
                "total": 1,
        }
    },
    {
        $match: {
           $or:[{_id:{$eq:1}},{_id:{$eq:2}}]
        }
    }

]);