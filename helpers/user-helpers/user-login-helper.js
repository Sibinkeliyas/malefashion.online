const connection = require('../../config/connection')
const collection = require('../../config/collection')
const bcrypt = require('bcrypt')
const { response } = require('express')

module.exports = {

     doLogin : (userData) => {
        return new Promise(async(resolve,reject)=>{
            let user = await connection.get().collection(collection.USER_COLLECTION).findOne({email : userData.email})
            if(user){
                if(user.loginStatus){
                      bcrypt.compare(userData.password, user.password, function(err, result) {
                      if(result == true) 
                      {
                          response.status = true
                          response.user = user
                          resolve(response)
                      }else{
                          resolve({status : false})
                      }
                    });
                  } else{
                    resolve({login : false})
                  }
                      } else{
                      
                        resolve({emailstatus : true})
                      }
                   
        })
    },
     doFindNumber : (userNumber) => {
        
        return new Promise(async(resolve,reject)=>{
          let user = await connection.get().collection(collection.USER_COLLECTION).findOne({mobile : userNumber})        
          resolve(user)
        })
      },
      updatePassword : (mobile,password) => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.USER_COLLECTION).findOneAndUpdate({
                mobile : mobile
            },{
                $set : {
                    password : password
                }
            }).then((data) => {
                resolve(data)
            })
        })
    }

}