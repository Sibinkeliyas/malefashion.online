// requires
var connection = require('../../config/connection')
var collection = require('../../config/collection')


module.exports = {

     doUserdetails :  () => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.USER_COLLECTION).find().toArray((err,data)=>{
            if(err) throw err
            else{
            resolve(data)
            }
            })
        })
    }

}
