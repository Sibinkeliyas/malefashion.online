// requires
var connection = require('../../config/connection')
var collection = require('../../config/collection')
const { ObjectID } = require('bson');

module.exports = {

     doDelete : (productID) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id : productID})
        })
    }

}