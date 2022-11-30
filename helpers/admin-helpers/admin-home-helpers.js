// requires
var connection = require('../../config/connection')
var collection = require('../../config/collection')

module.exports = {

     all_orders : () => {
        return new Promise(async(resolve,reject) => {
            let orders = await connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).find().toArray()
            resolve(orders)
        })
    }, 
     weekDiff : (days) => {
        return new Promise(async(resolve,reject) => {
            let sales = await connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).
            find( { 
            date: { $gte: days } } )
            .toArray()
            resolve(sales)
        })
    },
     total_users : (days) => {
        return new Promise(async(resolve,reject) => {
           let all_users = await connection.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(all_users)
        })
    },
     activeusers : (status) => {
        return new Promise(async(resolve,reject) => {
            let userCount = await connection.get().collection(collection.USER_COLLECTION).find({
                loginStatus : status
            }).count()
    
            resolve(userCount)
        })
    },
    
    users : (days) => {
        return new Promise(async(resolve,reject) => {
            let users = await connection.get().collection(collection.USER_COLLECTION).
            find( { 
            date: { $gte: days } } )
            .toArray()
            resolve(users)
        })
    },
     order_payment : (method) => {
        return new Promise(async(resolve,reject) => {
            let paymantMethod  = await connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).find({
                paymentmethod : method
            }).count()
            resolve(paymantMethod)
        })
    },
     order_paymentDate : (days,method) => {
        return new Promise(async(resolve,reject) => {
            let paymantMethod  = await connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).find({
                status : 'delivered',
                paymentmethod : method,date : {$gte: days }
            }).count()
            resolve(paymantMethod)
        })
    }, 
    ordersCount : () => {
        return new Promise(async(resolve,reject) => {
            let count = await connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).find().count()
            resolve(count)
    
        })
    }
    
    
    

    

}
