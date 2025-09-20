use("supermarket");

db.ventas.aggregate([ 
    {
        $lookup: {
            from: "productos",
            localField: "items.producto_id",
            foreignField: "_id",
            as: "prod"
        }
    }, 
    
    {
        $match: {
           $or:[{_id:{$eq:1}},{_id:{$eq:2}}]
        }
    },   
    
    {
        $project: {
                   _id: 1,
                   cliente_id:1,
                   fecha :1,   
                   "prod.nombre":1,
                  "prod.precio":1,
                   total: 1,
          } 
       },  

]);