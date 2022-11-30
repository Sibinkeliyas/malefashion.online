const connection = require('../../config/connection')
const collection = require('../../config/collection')
const { ObjectID } = require('bson');
const { resolve } = require('promise');


module.exports = {

    
    docartProductCount : (userID) => {
        return new Promise(async(resolve,reject)=>{
            let count = 0
            let cart = await connection.get().collection(collection.CART).findOne({
                userId :ObjectID (userID)})
            if(cart){
                count = cart.products.length
                resolve(count)
            }else{
                resolve(0)
            }
        })
    },
     doAddressInsert : (address,userID) => {
        address._id = ObjectID()
        return new Promise(async(resolve,reject)=>{
          let useraAdress = await connection.get().collection(collection.ADDRESS_COLLECTION).findOne({userID : ObjectID(userID)})
          if(useraAdress){
            address.addressStatus = false
            connection.get().collection(collection.ADDRESS_COLLECTION).updateOne({userID : ObjectID(userID)},
                    {$push : {userAddress : address}}
            ).then((data)=>{
                resolve(data)
            })
          }else{
           let userAddress = {
            _id : ObjectID(),
                firstName : address.firstName,
                lastName : address.lastName,
                country : address.country,
                address : address.address,
                town : address.town,
                state : address.state,
                pinCode : address.pinCode,
                mobile : address.mobile,
                email : address.email,
                addressStatus : true
            }
            let useraAdress = {
                userID : ObjectID(userID),
                userAddress : [userAddress]
                
            }
            connection.get().collection(collection.ADDRESS_COLLECTION).insertOne(useraAdress).then((data)=>{
                resolve(data)
            })
          }
        })
    },
     doAddressFind : (userID) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.ADDRESS_COLLECTION).findOne({userID : ObjectID(userID)}).then((data)=>{
                resolve(data)
            })
        })
    },
     removeAddress : (addresID,userID) => {
        return new Promise(async(resolve,reject)=>{
       await findAddressStatus(addresID,userID).then((data) => {
        if(data[0].userAddress.addressStatus === true){
            let dataStatus = true
            resolve(dataStatus )
        }else{
                connection.get().collection(collection.ADDRESS_COLLECTION).updateOne({userID: ObjectID(userID),'userAddress._id' :ObjectID(addresID)},{
                    $pull : { userAddress: {_id : ObjectID(addresID)} }
                }).then((data)=>{
                    resolve(data)
                })
           
            }
        
        
        })
       
       })
        
    },
    
     editAddress : (userID,addresID,address) => {
        return new Promise (async(resolve,reject)=>{
            let Address = await connection.get().collection(collection.ADDRESS_COLLECTION).updateOne({
                userID: ObjectID(userID),
                'userAddress._id' :ObjectID(addresID)
            },
            {
                $set :  {'userAddress.$.firstName' :address.firstName,'userAddress.$.lastName' : address.lastName,'userAddress.$.country' : address.country,'userAddress.$.address' : address.address,'userAddress.$.town' : address.town,'userAddress.$.state' : address.state,'userAddress.$.pinCode' : address.pinCode,'userAddress.$.mobile' : address.mobile,'userAddress.$.email' : address.email,}
            }
            ).then((data) => {
                resolve(data)
            })
        })
   
    }
}


function findAddressStatus(addresID,userID) {
    return new Promise(async(resolve,reject) => {
        connection.get().collection(collection.ADDRESS_COLLECTION).aggregate([
            {
                $match :
                {
                    userID : ObjectID(userID)
                }
            },
            {
                $unwind : "$userAddress"
            },
               {
                $match :
                {
                    'userAddress._id' : ObjectID(addresID)
                }
            }
        ]).toArray().then((data) => {
            resolve(data)
        })
    })
}
