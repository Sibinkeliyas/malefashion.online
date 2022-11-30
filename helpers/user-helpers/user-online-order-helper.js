const connection = require('../../config/connection')
const collection = require('../../config/collection')
const { ObjectID } = require('bson');


module.exports = {

     orderPaymentStatus : (orderID,status) => {
        return new Promise(async(resolve,reject)=>{
          connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).updateOne(
            {_id : ObjectID(orderID)},{
              $set : {status : status}
            }
          )
        })
      },
       increase : (productsQuantity) => {
        return new Promise(async(resolve,reject)=>{
            for(i = 0 ; i  < productsQuantity.length ; i ++){
                connection.get().collection(collection.PRODUCT_COLLECTION).updateOne({
                   _id : productsQuantity[i].item
               },
               {
                   $inc : {'quantity' : productsQuantity[i].quantity}
               })
           }
        })
      }

}