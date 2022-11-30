// requires
var connection = require('../../config/connection')
var collection = require('../../config/collection')
const { ObjectID } = require('bson');

module.exports = {

     admin_login : (adminData) => {
        return new Promise(async(resolve,reject)=>{
            let response = {}
            let user =await connection.get().collection(collection.ADMIN_LOGIN).findOne({email:adminData.email})
            if(user){
                
            if(user.password == adminData.password){
            
            response.admin = user   
            response.status = true 
            resolve(response)
            }else{
                   
            resolve({status : false})
            }
            }else{
            resolve({emailStatus : true})
            }
            
        })
    }




}