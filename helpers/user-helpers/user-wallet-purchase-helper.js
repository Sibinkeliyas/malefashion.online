const connection = require('../../config/connection')
const collection = require('../../config/collection')
const { ObjectID } = require('bson');
const { reject } = require('promise');



module.exports = {

    walletHistiry : (orderID) => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).findOne({
                _id : ObjectID(orderID)
            }).then((data) => {
                resolve(data)
            })
        })
    }

}

