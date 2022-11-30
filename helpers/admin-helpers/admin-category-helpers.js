// requires
const { ObjectID } = require('bson');
var connection = require('../../config/connection')
var collection = require('../../config/collection')

module.exports = {

    doFindCategory : () => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.CATEGORIES).find().toArray((err,data)=>{
                resolve(data)
            })
        })
    
    },
    doCategory : (category) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.CATEGORIES).insertOne(category).then((data)=>{
                resolve(data.insertedId)
            })
        })
    },
    doProductCheck : (item) => {
        return new Promise(async(resolve,reject) => {
            let category = await connection.get().collection(collection.PRODUCT_COLLECTION).findOne({
               categories : item 
            })
          
                resolve(category)
        })
    },
     doUpdateCategory : (categoryID,category) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.CATEGORIES).updateOne({_id : categoryID},
               {$set : { category : category }})
        })
    },
    doDeleteCategory : (categoryID) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.CATEGORIES).deleteOne({_id :ObjectID(categoryID)})
        })
    
    },
    all_category_coupen : () => {
        return new Promise(async(resolve,reject) => {
           let coupen = await connection.get().collection(collection.CATEGORY_COUPEN).find().toArray()
           resolve(coupen)
        })
    },
     categories : () => {
        return new Promise(async(resolve,reject) => {
            let category = await connection.get().collection(collection.CATEGORIES).find().toArray()
            resolve(category)
        })
    },
    findCoupen : (coupen) => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.CATEGORY_COUPEN).findOne({
                category : coupen.category
            }).then((data) => {
                resolve(data)
            })
        })
    },
     coupen  : (coupen) => {
        return new  Promise(async(resolve,reject) => {
            connection.get().collection(collection.CATEGORY_COUPEN).insertOne(coupen)
        })
    },
    
    add_coupen : (coupen) => {
        return new Promise(async(resolve,reject) => {
            let product = await connection.get().collection(collection.PRODUCT_COLLECTION).find({
                categories : coupen.category
            }).toArray()
            let offerPrice = 0
            let categoryOfferPrice = 0
            for(var i = 0 ;i < product.length ; i++){
            
                offerPrice  = parseInt((coupen.coupen/100) * product[i].price) 
                categoryOfferPrice =  parseInt(product[i].price) - parseInt(offerPrice)
            
                let coupens = await connection.get().collection(collection.PRODUCT_COLLECTION).update({
                    _id : product[i]._id
                },{
                    $set : {categoryOffer : categoryOfferPrice}
                },
            
                )
            }
        })
    },
     delete_coupen : (category) => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.CATEGORY_COUPEN).deleteOne({
                _id : ObjectID(category.id)
            }).then((data) => {
                removeCategoryOffer(category.item)
            })
        })
    },
     
     doFindSingleCategory : (categoryID) => {
        return new Promise(async(resolve,reject)=>{
            let user = await connection.get().collection(collection.CATEGORIES).findOne({_id :categoryID})
            resolve(user)
        })
    }    

}
 function removeCategoryOffer  (category)  {
    return new Promise(async(resolve,reject) => {
        let product = await connection.get().collection(collection.PRODUCT_COLLECTION).find({
            categories : category
        }).toArray()
        for(var i = 0 ; i  < product.length ; i++){
            connection.get().collection(collection.PRODUCT_COLLECTION).updateOne({
                _id : ObjectID(product[i]._id)
            },{
                $set : {
                    categoryOffer : 0
                }
            })
        }
        
    })
}