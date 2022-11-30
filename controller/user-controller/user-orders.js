const products = require('../user-controller/user-check-out');
const wallet = require('../user-controller/user-home')
const user_order_helper = require('../../helpers/user-helpers/user-order-helper')
const user_home_helper = require('../../helpers/user-helpers/user-home-helper')



 //........................................................global variable .........................................................................................


 var profileStatus;




exports.user_all_orders_get = async(req,res)=>{
    let count
    let orderStatus
  if(req.session.user){
    profileStatus = true
    let orderedProduct  = await user_order_helper.doFindOrderedProduct(req.query.id,req.query.productID)
   let orderCount = await user_order_helper.doOrderCount(req.session.user._id)
    count  =await user_order_helper.docartProductCount(req.session.user._id)
  let orders = await  user_order_helper.doOrderDetails(req.session.user._id)
  if(orders.length < 1){
    orderStatus = true
  }
  let wallets = 0
  let wallet = await user_home_helper.walletFind(req.session.user._id)

  // wallet total;
  
  
      for(var i = 0 ; i <wallet.length; i++){
          wallets = parseInt(wallets) + parseInt(wallet[i].wallet.wallet)
      }
      
  
   res.render('order',{profileStatus,Name: req.session.user,count,orders,orderCount,orderStatus,wallets})
  }else{
    res.redirect('/login')
  }
   
  
}


exports.user_all_orders_details_get = async(req,res)=>{
    if(req.session.user)
    {
      let orderedProduct  = await user_order_helper.doFindOrderedProduct(req.query.id,req.query.productID)
      let count  =await user_order_helper.docartProductCount(req.session.user._id)
      res.render('orderDetails',{profileStatus,Name : req.session.user,count,orderedProduct})
    }else{
      res.redirect('/login')
    }
}



exports.user_cancel_order_post = async(req,res)=>{
    if(req.session.user){ 
        let status = "cancelled"
        let orderedItemQuantity = await user_order_helper.doFindorderQuantity(req.query.id) 
        let paymentMethods = await user_order_helper.paymentMethod(req.query.id)
        user_order_helper.updateOrder(req.query.id,orderedItemQuantity,status).then((data)=>{
           if(data != null){
             res.json({status : true})
           }
          })
        let totalAmounts = await user_order_helper.totalAmount(req.query.id)
         let wallets = {
            wallet : 0,
            walletHistory : null
         }
         
        for(let i = 0 ; i<totalAmounts.length;i++) {
            wallets.wallet = parseInt(wallets.wallet) + parseInt(totalAmounts[i].totalPrice.total)
            wallets.walletHistory = totalAmounts
        }
       
        if (paymentMethods.paymentmethod != "cod" && paymentMethods.status != 'pending'){
            user_order_helper.addTowallet(wallets,req.session.user._id,paymentMethods)
        } 
    }else{
        res.redirect('/login')
    }
    
}


exports.user_return_product_post = async(req,res) => {
    if(req.session.user){ 
        let status = "returned"
        let orderedItemQuantity = await user_order_helper.doFindorderQuantity(req.query.id) 
        user_order_helper.updateOrder(req.query.id,orderedItemQuantity,status).then((data)=>{
           if(data != null){
             res.json({status : true})
           }
          })

        let totalAmounts = await user_order_helper.totalAmount(req.query.id)
        let wallets = {
            wallet : 0,
            walletHistory : null
         }
        for(let i = 0 ; i<totalAmounts.length;i++) {
            wallets.wallet = parseInt(wallets.wallet) + parseInt(totalAmounts[i].totalPrice.total)
            wallets.walletHistory = totalAmounts
        }
        user_order_helper.addTowallet(wallets,req.session.user._id)
        
       
    }else{
        res.redirect('/login')
    }
}

exports.user_wallet_get = (req,res) => {
    let wallets = wallet.wallets
    res.render('wallet-history',{profileStatus,count :products.count,wallets})
}
