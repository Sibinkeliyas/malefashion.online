const { ObjectID } = require('bson');
const wallet = require('../user-controller/user-home')
const total = require('../user-controller/user-cart')
const user_checkout_helpers = require('../../helpers/user-helpers/user-checkout-helper')
const add_wallet = require('../../helpers/user-helpers/user-home-helper')
const user_profile  = require('../../helpers/user-helpers/user-profile-helper')





 //........................................................global variable .........................................................................................


 let profileStatus;
 let totalPriceStatus
 let coupenStatus;
 let totalprize = parseInt(total.totalPrice)


 exports.user_place_order_get = async(req,res)=>{
    let count,alladdress,cart,totalprice,selectedAddress
  if(req.session.user){
    cart = await user_checkout_helpers.doFindCartItem(req.session.user._id)
    totalprice =await user_checkout_helpers.docartTotalAmount(req.session.user._id) 
    if(totalprice !=null){
    totalPriceStatus = true
   }
    selectedAddress = await user_checkout_helpers.findpaymentAddress(req.query.id,req.session.user._id)
      var address = false
      alladdress = await user_checkout_helpers.doAddressFind(req.session.user._id)
        if(alladdress == null || totalprice == null ||selectedAddress == null ){
          address = true
        }
     
    count  =await user_checkout_helpers.docartProductCount(req.session.user._id)
    if(totalprice == total.totalPrice){
        coupenStatus = true
        
    }
    if(total.coupenPrice != null || total.coupenPrice){
      totalprice = parseInt(totalprice) - parseInt(total.coupenPrice)
    }
    let wallet = await add_wallet.walletFind(req.session.user._id)
    // wallet total;

    let wallets = 0
    for(var i = 0 ; i <wallet.length; i++){
      wallets = parseInt(wallets) + parseInt(wallet[i].wallet.wallet)
  }
  let defaultAddress = await user_profile.defaultAddress(req.session.user._id)
    profileStatus = true
    if(defaultAddress.length == 0){
      res.redirect('/select-address')
    }else{
      res.render('place-order',{count,profileStatus,
        Name : req.session.user
        ,address,
        cart,totalprize : totalprice,
        totalPriceStatus,
        wallets,coupenStatus,
        totalprice,defaultAddress})
    
    }
    
  }
 }


 exports.user_place_order_post = async(req,res)=>{
    if(req.session.user){
        req.body.userID = req.session.user._id
        let products = await user_checkout_helpers.getCartList(req.session.user._id)  
        let productsQuantity = await user_checkout_helpers.getCartquantity(req.session.user._id)   
         
        let totalprice =await user_checkout_helpers.doTotalAmount(req.session.user._id)  
        exports.cart = products
       
        if(req.body.payment === 'cod'){
          let place_orderID = await user_checkout_helpers.placeOrder(req.body,products,total.totalPrice,productsQuantity,req.session.user._id,)
            res.redirect('/myOrders')
        }else if(req.body.payment === 'paypal'){
          let place_orderID = await user_checkout_helpers.placeOrder(req.body,products,total.totalPrice,productsQuantity,req.session.user._id,)
            exports.orderID = ""+place_orderID.insertedId
            exports.orderAddress = req.body
            exports.totalPrice = total.totalPrice
            exports.productID = productsQuantity
            res.redirect('/online-payment-pay-pal')
        }
        else if(req.body.payment === 'wallet'){
          let place_orderID = await user_checkout_helpers.placeOrder(req.body,products,total.totalPrice,productsQuantity,req.session.user._id,)
            exports.orderID = ""+place_orderID.insertedId
            exports.orderAddress = req.body
            exports.totalPrice = total.totalPrice
            exports.productID = productsQuantity
            res.redirect('/wallet-purchasing')
        }
        else{
          // exports.orderID = ""+place_orderID.insertedId
            exports.orderAddress = req.body
            exports.products = products
            exports.totalPrice = total.totalPrice
            exports.productID = productsQuantity
            res.redirect('/online-payment-razor-pay')
            
        } 
        
        
        
      }
 }


 exports.user_select_order_address_get = (req,res)=>{
    if(req.session.user){
        res.render('slelect-address')
      } else{
        res.redirect('/login')
      }
}




//.............................................single product..........................................//

exports.user_single_product_buy_get = async(req,res)=>{
    if(req.session.user){
        profileStatus
        let count  =await user_checkout_helpers.docartProductCount(req.session.user._id)
        var address = false
        var alladdress = await user_checkout_helpers.doAddressFind(req.session.user._id)
            if(alladdress == null){
              address = true
            }
            exports.count = count
        let order = await  user_checkout_helpers.doViewItem(ObjectID(req.query.id))
        res.render('checkout',{profileStatus,Name : req.session.user,count,order,quantity : req.query.orderquantity,alladdress,address})
      }else{
        res.redirect('/login')
      }
}

exports.user_single_product_buy_post = async(req,res)=>{
    if(req.session.user){
        req.body.userID = req.session.user._id
        var address = await user_checkout_helpers.doSelectedAddressFind(req.session.user._id,req.body.cod)
        var products = await user_checkout_helpers.doFindproduct(ObjectID(req.query.id))
        products.itemquantity  = parseInt (req.body.quantity)
        let productobj = {
          products
        }
        let total = { 
          total : parseInt(req.body.total)
        }

        let product = [productobj]
        let totalPrice = [total]
        req.body.address = address[0].userAddress 
        user_checkout_helpers.SingleplaceOrder(req.body,product,totalPrice).then((data)=>{
          res.json({status : true})
        })            
      }
}


