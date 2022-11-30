const connection = require('../../config/connection')
const collection = require('../../config/collection')
const bcrypt = require('bcrypt')
const { response } = require('express')
let referralCodeGenerator = require('referral-code-generator');

module.exports = {

    
 doSignup : (userData) => {
    return new Promise(async(resolve,reject)=>{
         // to check the email is already exist or not
        let user = await connection.get().collection(collection.USER_COLLECTION).findOne({email : userData.email})
        if(!user){            
        //password bcrypt
        bcrypt.hash(userData.password, 10, (err, hash)=> {
        if(err) throw err
        else{                  
        userData.password = hash                   
        }
        let loginStatus=true
         userData.loginStatus = true
         userData.refferralCode = userData.name.slice(0,4)+"-" + referralCodeGenerator.alpha('lowercase', 4)               
        connection.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
        resolve(data.insertedId)
        })
        });          
        }else{
           response.status = true
            resolve(response)
        console.log("email is already exist");
        }  
    })
},

 findRefferal : (refferal) => {
    return new Promise(async(resolve,reject) => {
      connection.get().collection(collection.USER_COLLECTION).findOne(
        {refferralCode : refferal}
      ).then((data) => {
        resolve(data)
      })
    })
  },
   addTowallet : (userID,refferal) => {
    return new Promise(async(resolve,reject) => {  
        let Wallet = {
            wallet : parseInt(100),
            walletHistory : ['reffered by'+refferal.name]
        }
       
        let wallets = {
            wallet :[ Wallet],
            userID : ObjectID(userID)
        }   
        let user = await connection.get().collection(collection.WALLET).findOne({
          userID : ObjectID(userID)
        })
        if(user){
          connection.get().collection(collection.WALLET).updateOne({
            userID : ObjectID(userID)
          },{
            $push : { wallet :  Wallet}
          }).then((data) => {
            resolve(data)
          })
        }else{
          connection.get().collection(collection.WALLET).insertOne(wallets).then((data) => {
            resolve(data)
          })
        }

    })
  }
}