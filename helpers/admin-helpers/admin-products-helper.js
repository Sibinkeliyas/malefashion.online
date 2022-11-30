// requires
var connection = require('../../config/connection')
var collection = require('../../config/collection')
const { ObjectID } = require('bson');

module.exports = {

    
  doFindCategory : () => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.CATEGORIES).find().toArray((err,data)=>{
                resolve(data)
            })
        })
    },
     doFindSingleCategory : (categoryID) => {
        return new Promise(async(resolve,reject)=>{
            let user = await connection.get().collection(collection.CATEGORIES).findOne({_id :ObjectID(categoryID)})
            resolve(user)
        })
    },
     findCoupen : (coupen) => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.CATEGORY_COUPEN).findOne({
                category : coupen
            }
            ).then((data) => {
                resolve(data)
            })
        })
    },
     doAdd : (productData) => {
        return new Promise(async(resolve,reject)=>{     
            connection.get().collection(collection.PRODUCT_COLLECTION).insertOne(productData)
        })
    }
    
    


}