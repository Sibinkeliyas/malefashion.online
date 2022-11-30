// requires
const { ObjectID } = require('bson');
var connection = require('../../config/connection')
var collection = require('../../config/collection')


module.exports = {

     doBlock : (userID) => {
        return new Promise(async(resolve,reject)=>{
        let user =await connection.get().collection(collection.USER_COLLECTION).find({_id : userID})
        connection.get().collection(collection.USER_COLLECTION).updateOne({_id : userID},{$set : {loginStatus:false}})
        })
    },
    doUnblock : (userID) => {
        return new Promise(async(resolve,reject)=>{
            let user =await connection.get().collection(collection.USER_COLLECTION).find({_id : userID})
            connection.get().collection(collection.USER_COLLECTION).updateOne({_id : userID},{$set : {loginStatus: true}})
            })
    }
    

}