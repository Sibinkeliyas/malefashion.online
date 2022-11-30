// requires
var connection = require('../../config/connection')
var collection = require('../../config/collection')
const { ObjectID } = require('bson');

module.exports = {

     doFindUser : (userID) => {
        return new Promise(async(resolve,reject)=>{
        let user =await connection.get().collection(collection.USER_COLLECTION).findOne({_id : userID})
        resolve(user)
        })
    
    }

}