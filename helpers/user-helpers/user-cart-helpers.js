const connection = require('../../config/connection')
const collection = require('../../config/collection')
const { ObjectID } = require('bson');

module.exports = {

     doAddCart : (productID,userID) => {
        let productObject = {
            item:ObjectID(productID),
            quantity :1
        }
        return new Promise(async(resolve,reject)=>{
            let carts =await connection.get().collection(collection.CART).findOne({userId : ObjectID(userID) })
            if(carts){
                let poductCheck = carts.products.findIndex((product) => product.item == productID )
                if(poductCheck != -1){
                    connection.get().collection(collection.CART).updateOne({
                      'userId' :ObjectID(userID),  'products.item' : ObjectID(productID)
                    },{
                        $inc : {'products.$.quantity' :1}
                    }
                    )
               }else{
                connection.get().collection(collection.CART).updateOne({userId :ObjectID(userID)},
                    {$push : 
                        {products : productObject }
                    })
                }
            }else{
               
                let userCart = {
                    userId : ObjectID(userID),
                    products :[productObject]
                }
                connection.get().collection(collection.CART).insertOne(userCart).then((data)=>{
                    resolve(data)
                })
            }
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
    
    doTotalAmount : (userID) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.CART).
            aggregate([
                    { 
                        $match: {  userId : ObjectID(userID)}            
                    },
                    {
                        $unwind : '$products'
                    },
                    {
                        $project : 
                        { item : '$products.item',
                        quantity : '$products.quantity'
                        }
                
                    },
                    {
                        $lookup : {
                            from : collection.PRODUCT_COLLECTION,
                            localField : 'item',
                            foreignField : '_id',
                            as:'products'
                        }
                    },
                    {
                        $project : {
                            item : 1,quantity : 1,products : {$arrayElemAt : ['$products',0]}
                        }
                    },
            ]).toArray().then((data)=>{
                let amount  = 0
                for(var i = 0 ; i < data.length ; i++){
                    if(data[i].products.offerPrice == data[i].products.price &&  data[i].products.categoryOffer == 0 ){
                        amount = parseInt(amount) + ((parseInt(data[i].quantity) * parseInt(data[i].products.price)))
                    }
                    else{
                        if( data[i].products.categoryOffer == 0){
                            amount = parseInt(amount) + ((parseInt(data[i].quantity) * parseInt(data[i].products.offerPrice)))
                        }
                        else if(data[i].products.offerPrice > data[i].products.categoryOffer){
                            amount = parseInt(amount) + ((parseInt(data[i].quantity) * parseInt(data[i].products.categoryOffer)))
                        
                        }else if(data[i].products.offerPrice < data[i].products.categoryOffer){
                            amount = parseInt(amount) + ((parseInt(data[i].quantity) * parseInt(data[i].products.offerPrice)))
                        }else if(data[i].products.categoryOffer == null || data[i].products.categoryOffer == 0){
                            amount = parseInt(amount) + ((parseInt(data[i].quantity) * parseInt(data[i].products.offerPrice)))
                        }
                    }
                
                }
                resolve(amount)
                })
            
        })

        },
          doFindCartItem : (userID) => {
            return new Promise(async(resolve,reject)=>{
              let cart = await connection.get().collection(collection.CART).
               aggregate([
                        { 
                            $match: {  userId : ObjectID(userID)}            
                        },
                        {
                            $unwind : '$products'
                        },
                        {
                            $project : 
                           { item : '$products.item',
                           quantity : '$products.quantity'
                            }
                      
                        },
                        {
                            $lookup : {
                                from : collection.PRODUCT_COLLECTION, 
                                localField : 'item',
                                foreignField : '_id',
                                as:'products'
                            }
                        },
                        {
                            $project : {
                                item : 1,quantity : 1,products : {$arrayElemAt : ['$products',0]}
                            }
                        }
                      
                  ]).toArray()
                resolve(cart)
            })
        },
         checkingCoupen : (coupen) => {
            return new Promise(async(resolve,reject) => {
                connection.get().collection(collection.COUPENS).findOne({
                    coupenName : coupen
                }).then((data) => {
                  resolve(data)
                })
            })
        },
        

     coupenRepeates : (userID,coupen) => {
        return new Promise(async(resolve,reject) => {
            connection.get().collection(collection.COUPENS).aggregate([
                {
                    $match :
                    {
                        coupenName : coupen
                    }
                },
                {
                    $unwind : '$userID'
                },
                {
                    $match :
                    {
                        'userID.userID' : ObjectID(userID)
                    }
                }
               
            ]).toArray().then((data) => {
                resolve(data)
            })
        })
    },
     doincreaseCart : (cartID,userID,quantity) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.CART).updateOne({'products.item' : cartID,userId: ObjectID(userID)},{
                $set : {'products.$.quantity' :quantity}
            }).then((data)=>{
            
            })
        })
    },
    

     doDecreaseCart : (cartID,userID,quantity) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.CART).updateOne({'products.item' : cartID,userId: ObjectID(userID)},{
                $set : {'products.$.quantity' :quantity}
            }).then((data)=>{
                
            })
        })
    },
     doDeleteCart : (cartID,userID) => {
        return new Promise(async(resolve,reject)=>{    
            connection.get().collection(collection.CART).updateOne({userId: ObjectID(userID),'products.item' :ObjectID(cartID)},{
                $pull : { products: {item : ObjectID(cartID)} }
            }).then((data)=>{
                resolve(data)
            })
       
        })
    }



    

}