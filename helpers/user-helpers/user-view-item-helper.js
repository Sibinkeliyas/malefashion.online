const connection = require('../../config/connection')
const collection = require('../../config/collection')
const { ObjectID } = require('bson');

module.exports = {

     docartProductCount : (userID) => {
        return new Promise(async(resolve,reject)=>{
            let count = 0
            let cart = await connection.get().collection(collection.CART).findOne({
                userId :ObjectID (userID)})
            if(cart){
                count = cart.products.length
                resolve(count)
            }else{
                resolve(0)
            }
        })
    },
     doViewItem : (productID) => {
        return new Promise(async(resolve,reject)=>{
        let product =  await connection.get().collection(collection.PRODUCT_COLLECTION).findOne({_id : productID})
          resolve(product)
        })
    },
     doMatchcategory : (userID,categoryID) => {
        return new Promise(async(resolve,reject)=>{
          let user = await connection.get().collection(collection.PRODUCT_COLLECTION).aggregate([
            {
              $match: { categoryId: ObjectID(categoryID) },
            },      
          ]).toArray()
          resolve(user) 
        })
    }
    
    
    

}