// requires
var connection = require('../../config/connection')
var collection = require('../../config/collection')


module.exports = {

     add_brand : (brand) => {

        connection.get().collection(collection.BRANDS).insertOne(brand)

    },
     all_brands : () => {
        return new Promise(async(resolve,reject)=>{
            let brands = await connection.get().collection(collection.BRANDS).find().toArray()
            resolve(brands)
        })
        
    }

}