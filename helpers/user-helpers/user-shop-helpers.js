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
    
    doFindCategory : () => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.CATEGORIES).find().toArray((err,data)=>{
                resolve(data)
            })
        })

    },
    doFindAllproduct : (fileterMax,fileterMin) => {
        return new Promise(async(resolve,reject)=>{
        let data = await connection.get().collection(collection.PRODUCT_COLLECTION).find({
        
        }).toArray()
        resolve(data)
        })
    },
     fileterMaxFind : (priceproduct) => {
        let max = parseInt(priceproduct.max)
        let min = parseInt(priceproduct.min)
        return new Promise(async(resolve,reject) => {
          let price = await connection.get().collection(collection.PRODUCT_COLLECTION).find({
            price : {$gte : min, $lte : max }
          }).toArray()             
          resolve(price)
        })
    }
    

}