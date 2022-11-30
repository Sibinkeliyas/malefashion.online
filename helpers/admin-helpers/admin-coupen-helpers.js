// requires
const { ObjectID } = require('bson');
var connection = require('../../config/connection')
var collection = require('../../config/collection')

module.exports = {

    existingCoupens : () => {
        return new Promise(async(resolve,reject) => {
           let coupen = await connection.get().collection(collection.COUPENS).find().toArray()
           resolve(coupen)
        })
    },
     coupenExist : (coupen) => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.COUPENS).findOne({
                coupenName : coupen.coupenName
            }).then((data) => {
                resolve(data)
            })
        })
    },
    
    add_coupen : (coupen) => {
        let userID = {

        }
        coupen.userID = [userID]
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.COUPENS).insertOne(coupen)
        })
    },
    deleteCoupen : (id) => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.COUPENS).deleteOne({
                _id : ObjectID(id)
            }).then((data) => {
                resolve(data)
            })
        })
    }


}
