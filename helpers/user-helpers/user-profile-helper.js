const connection = require('../../config/connection')
const collection = require('../../config/collection')
const { ObjectID } = require('bson');
const { reject, resolve } = require('promise');


module.exports = {

     doAddressFind : (userID) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.ADDRESS_COLLECTION).findOne({userID : ObjectID(userID)}).then((data)=>{
                resolve(data)
            })
        })
    },
     doAddressInsert : (address,userID) => {
        address._id = ObjectID()
        return new Promise(async(resolve,reject)=>{
          let useraAdress = await connection.get().collection(collection.ADDRESS_COLLECTION).findOne({userID : ObjectID(userID)})
          if(useraAdress){
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
                pincode : address.pinCode,
                mobile : address.mobile,
                email : address.email}
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
    defaultAddress : (userID) => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.ADDRESS_COLLECTION).aggregate([
                {
                    $match : 
                    {
                        userID : ObjectID(userID)
                    }
                },
                {
                    $unwind : '$userAddress'
                },
                {
                    $match :
                    {
                        'userAddress.addressStatus' : true
                    }
                }
            ]).toArray().then((data) => {
                resolve(data)
            })
        })
    },
    updatePassword : (userID,password) => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.USER_COLLECTION).updateOne({
                _id : ObjectID(userID)
            },{
                $set : {
                    password : password
                }
            }).then((data) => {
                resolve(data)
            })
        })
    },
    changeDefaultAddress : async(userID,addressID) => {
       await changeDefaultAddress(userID)
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.ADDRESS_COLLECTION).updateOne({
                userID : ObjectID(userID),'userAddress._id' : ObjectID(addressID)
            },{
                $set : {"userAddress.$.addressStatus" : true}
            }).then((data) => {
                resolve(data)
            })
        })
    },
    coupons : () => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.COUPENS).aggregate([
                {
                    $unwind : '$userID'
                }
                ]).toArray().then((data) => {
                resolve(data)
            })
        })
    }
}

function changeDefaultAddress(userID){
    return new Promise(async(resolve,reject) => {
        connection.get().collection(collection.ADDRESS_COLLECTION).updateOne({
            userID : ObjectID(userID),'userAddress.addressStatus' : true
        },{
            $set : {"userAddress.$.addressStatus" : false}
        }).then((data) => {
            resolve(data)
        })
    })
}