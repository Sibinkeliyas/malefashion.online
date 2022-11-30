const connection = require('../../config/connection')
const collection = require('../../config/collection')
const { ObjectID } = require('bson');
const moment = require('moment');
const coupen = require('../../controller/user-controller/user-cart')


module.exports = {

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
                     }
               ]).toArray().then((data)=>{
                let amount  = 0
                for(var i = 0 ; i < data.length ; i++){
                    if(data[i].products.offerPrice == data[i].products.price && data[i].products.categoryOffer == null || data[i].products.offerPrice == data[i].products.price && data[i].products.categoryOffer == 0 ){
                        amount = parseInt(amount) + ((parseInt(data[i].quantity) * parseInt(data[i].products.price)))
                    }
                    else{
                        if(data[i].products.offerPrice > data[i].products.categoryOffer){
                            amount = parseInt(amount) + ((parseInt(data[i].quantity) * parseInt(data[i].products.categoryOffer)))
                           
                        }else if(data[i].products.offerPrice < data[i].products.categoryOffer){
                            amount = parseInt(amount) + ((parseInt(data[i].quantity) * parseInt(data[i].products.offerPrice)))
                        }else if(data[i].products.categoryOffer == null){
                            
                        }
                    }
                 
                }
                 resolve(amount)
               })
             
         })
 
        },
         paymentAddress : (addresID,user) => {
            return new Promise(async(resolve,reject)=>{
                let address =await connection.get().collection(collection.ADDRESS_COLLECTION).aggregate([
                    {
                        $match : 
                        {
                            userID : ObjectID(user)
                        }
                    },
                    {
                        $unwind : '$userAddress'
                    },
                    {
                        $match :
                        {    
                         'userAddress._id' : ObjectID(addresID)
                        }
                    },
                    {
                        $unwind : '$userAddress'
                    },
                ]).toArray()
                resolve(address[0])
            })
        },
         findpaymentAddress : (addresID,userID) => {
            return new Promise(async(resolve,reject)=>{
               let address = await connection.get().collection(collection.ADDRESS_COLLECTION).
                findOne({userID: ObjectID(userID),'userAddress._id' :ObjectID(addresID)})
                resolve(address)
            })
        },
        
     doAddressFind : (userID) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.ADDRESS_COLLECTION).findOne({userID : ObjectID(userID)}).then((data)=>{
                resolve(data)
            })
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
     doSelectedAddressFind : (userID,addresID) => {
        return new Promise(async(resolve,reject)=>{
            connection.get().collection(collection.ADDRESS_COLLECTION).aggregate([
                {
                    $match : {userID : ObjectID(userID)}
                },
                {
                    $unwind : '$userAddress'
                },
                {
                    $project : {
                        userAddress : 1
                    }
                },
                {
                    $match : {'userAddress._id' : ObjectID(addresID)}
                }
            ]).toArray().then((data)=>{
                resolve(data)
            })
        })
    },
    
     getCartList : (userID) => {
        return new Promise(async(resolve,reject)=>{
            let cart = await connection.get().collection(collection.CART).aggregate([
                {
                    $match : 
                    {
                        userId : ObjectID(userID)
                    }
                },{
                    $unwind : '$products'
                },
                {
                 $project : {'products.item' : 1,'products.quantity' : 1}
                },
                

                {
                    $lookup : {
                        from : collection.PRODUCT_COLLECTION,
                        localField : 'products.item',
                        foreignField : '_id',
                        as:'products'
                    }
                },
                {
                    $unwind : '$products'
                },
                {
                    $project : {products : 1,quantity : 1}
                }
            ]).toArray()
            resolve(cart)
        })
    },
     getCartquantity : (userID) => {
        return new Promise(async(resolve,reject)=>{
           let quantity = await connection.get().collection(collection.CART).
           aggregate([
            {
                $match : 
                {
                    userId : ObjectID(userID)
                }
            },{
                $unwind : '$products'
            },{
                $project :{quantity : '$products.quantity',item : '$products.item'}
            },{
                $unwind : '$quantity'
            }
           ]).toArray()
         
            resolve(quantity)
        })
    },
     placeOrder : (order,products,totalPrize,productsQuantity,userID) => {
        for(i=0;i< products.length ; i++){
            products[i].products.itemquantity = productsQuantity[i].quantity
        }
        let total = {
            total : totalPrize
        }
        let totalPrice = [total]
        return new Promise(async(resolve,reject)=>{
            let status
            if(order.payment === 'cod' || order.payment === 'wallet'){
                status = "placed"
            }else{
                status = "pending"
            }
        
        let orderObj = {
            deliveryDetails : {
                name :  order.firstName+ order.lastName,
                mobile : order.mobile,
                address : order.address,
                pincode : order.pinCode,

            },
            userID : ObjectID(order.userID),
            paymentmethod : order.payment,
            products : products,
            totalPrice : totalPrice, 
            date :  moment().format('L'),
            deliveryDate : moment().add(7, 'days').calendar() ,
            status : status
        }
        connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).insertOne(orderObj).then((data)=>{
            resolve(data)
        })
        
        // ....................quantity decreasing...........................//
        quantitydecrease(productsQuantity)
        // ....................adding user into coupen.......................//
        if(coupen.coupen != undefined){
            addUser(userID,coupen.coupen)
        }
        // ....................adding user into coupen........................//
        connection.get().collection(collection.CART).deleteOne
        ({
            userId : ObjectID(order.userID)})
          
        })

    },   
     doViewItem : (productID) => {
        return new Promise(async(resolve,reject)=>{
        
        let product =  await connection.get().collection(collection.PRODUCT_COLLECTION).findOne({_id : productID})
          resolve(product)
        })
    },
     SingleplaceOrder : (order,products,totalPrice,productsQuantity) => {
     
        return new Promise(async(resolve,reject)=>{
         let status = order.payment==='cod'?'peding':'pending'
         let orderObj = {
             deliveryDetails : {
                 name :  order.address.firstName+ order.address.lastName,
                 mobile : order.address.mobile,
                 address : order.address.address,
                 pincode : order.address.pincode,
 
             },
             userID : ObjectID(order.userID),
             paymentmethod : order.payment,
             products : products,
             totalPrice : totalPrice, 
             date : moment().format('L'),
             status : status
         }
         connection.get().collection(collection.ORDER_PAYMENT_COLLECTION).insertOne(orderObj).then((data)=>{
             resolve(data)
         })
         
           
         })
 
     },
  
    
    

     doFindproduct : (productID) => {
        return new Promise(async(resolve,reject)=>{
           let user = await connection.get().collection(collection.PRODUCT_COLLECTION).findOne({_id : productID})
           resolve(user)
           
        })
    },
    docartTotalAmount : (userID) => {
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

        }

}

function quantitydecrease  (productsQuantity) {
    for(i = 0 ; i  < productsQuantity.length ; i ++){
         connection.get().collection(collection.PRODUCT_COLLECTION).updateOne({
            _id : productsQuantity[i].item
        },
        {
            $inc : {'quantity' : -productsQuantity[i].quantity}
        })
    }
}

function addUser  (userID,coupen) {
    let userIDs = {
        userID : ObjectID(userID)
    }
   
    return new Promise(async(resolve,reject) => {
        connection.get().collection(collection.COUPENS).updateOne({
            coupenName : coupen
        },{
            $push : {userID :userIDs}
        })
    })
}