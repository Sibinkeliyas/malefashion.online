const connection = require('../../config/connection')
const collection = require('../../config/collection')
const { ObjectID } = require('bson');

// razorpay
//..............env............//
require('dotenv').config();
const crypto = require('crypto')
const Razorpay = require('razorpay');
var instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  

module.exports = {

      generateRazorPay : (orderID,total) => { 
        console.log(total);
        return new Promise(async(resolve,reject)=>{
          var options = {
            amount: parseInt(total),
            currency : "INR",
            receipt : orderID
          };
          instance.orders.create(options,function(err,order){
            resolve(order)
          })
         })
        
  },
  
        verify_payment : (details) => {
            return new Promise(async(resolve,reject)=>{
        
            let hmac =crypto.createHmac('sha256', 'm4m3ubcolZTkmIMQNv7v8PEe');
        
        
            hmac.update(details['payment[razorpay_order_id]']+'|'+details['payment[razorpay_payment_id]']);
        
            //.......to convert into hex....//
        
            hmac=hmac.digest('hex')
        
            //------------
        
            if(hmac == details['payment[razorpay_signature]']){
            resolve("data")
            }else{
            reject()
            }
            })
        },
         orderPaymentStatus : (orderID) => {
            return new Promise(async(resolve,reject)=>{
              connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).updateOne(
                {_id : ObjectID(orderID)},{
                  $set : {status : 'placed'}
                }
              ).then((data) => {
                resolve(data)
              })
            })
          },
           orderPaymentcancel : (orderID,productsQuantity) => {
            return new Promise(async(resolve,reject)=>{
              connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).updateOne(
                {_id : ObjectID(orderID)},{
                  $set : {status : 'failed'}
                }
              )
              quantityIncreasing(productsQuantity)
            })
          }
          
          

}


function quantityIncreasing (productsQuantity){
    for(i=0;i<productsQuantity.length;i++){     
         connection.get().collection(collection.PRODUCT_COLLECTION).updateOne({
            _id : ObjectID(productsQuantity[i].item)
        },
        {
            $inc : {quantity :  productsQuantity[i].quantity}
        }).then((data)=>{
            resolve(data)
        })
    }
    }
  