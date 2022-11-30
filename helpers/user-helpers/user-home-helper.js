const connection = require('../../config/connection')
const collection = require('../../config/collection')
const { ObjectID } = require('bson');
const moment = require('moment');

module.exports = {

     doFindWishList : (userID) => {
        console.log(userID)
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.WISH_LIST).
                aggregate([
                    {
                        $match :
                        {
                            userID : ObjectID(userID)
                        }
                    },
                    {
                        $unwind : '$products'
                    }
                ]).toArray().then((data) => {
                    resolve(data)
                })
        })
    },
     walletFind : (userID) => {
        return new Promise(async(resolve,reject) => {
            let wallet = await connection.get().collection(collection.WALLET).aggregate([
            {
              $match :
                {
                    userID : ObjectID(userID)
                }
            },
             {
                 $unwind : '$wallet'
            }
            ]).toArray()
            resolve(wallet)
        })
    },
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
     doFindBanners : () => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.BANNERS).aggregate([
             
                {
                    $unwind : '$images'
                }
            ]).toArray().then((data) => {
                resolve(data)
            })
        })
    },
     doFindAllproduct : () => {
        console.log(moment().subtract(7, 'days').calendar());
        return new Promise(async(resolve,reject)=>{
         let data = await connection.get().collection(collection.PRODUCT_COLLECTION).find({
            date : {$gte :moment().subtract(7, 'days').calendar()}
         }).toArray()
         resolve(data)
        })
    },
     doFindSingleWishList : (userID) => {
        return new Promise(async(resolve,reject)=>{   
            if(userID !=null){
                let wishList = await connection.get().collection(collection.WISH_LIST).aggregate([
                    {
                        $match : {userID : ObjectID(userID)}
                    },
                    {
                        $unwind : '$wish_list'
                    },
                    {
                        $project : {wishList : '$wish_list.item'}
                    },                                                  
                ]).toArray()   
                resolve(wishList)
             }else{
                resolve(null)
             }               
        })
    },
    searchProduct : (search) => {
        console.log(search);
       return new Promise(async(resolve,reject) => {
        connection.get().collection(collection.PRODUCT_COLLECTION).find({
            productName :  { $regex: '.*'+search+'.*', $options: 'i' }
          }).toArray().then((data) => {
             console.log("promise");
             console.log(data);
              resolve(data)
          })
       })
        
    }
}