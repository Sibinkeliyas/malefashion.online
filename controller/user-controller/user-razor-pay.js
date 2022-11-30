const { response } = require('express')
require('dotenv').config();
const orderID = require('../user-controller/user-check-out')
const user_rezor_pay_helper = require('../../helpers/user-helpers/user-razor-pay-helpers')
const productsQuantity = require('../user-controller/user-check-out')
const user_checkout_helpers = require('../../helpers/user-helpers/user-checkout-helper')
let order 


exports.user_online_razor_pay_get = async(req,res) => {
  if(req.session.user){
    console.log(orderID);
    user_rezor_pay_helper.generateRazorPay(orderID.orderID,orderID.totalPrice).then((response)=>{
      res.render('razorpay',{cart : orderID.cart,totalprize : orderID.totalPrice,instance :process.env.key_id,response })
    })
  }else{
    res.redirect('/login')
  }
}

exports.user_online_razor_pay_post = async(req,res) => {
  user_rezor_pay_helper.verify_payment(req.body).then(async(data)=>{
    let place_orderID = await user_checkout_helpers.placeOrder(orderID.orderAddress,orderID.products,orderID.totalPrice,orderID.productID,req.session.user._id,)
    order = place_orderID.insertedId
      user_rezor_pay_helper.orderPaymentStatus(place_orderID.insertedId).then((data) => {
        res.json({status : true})
      })
      
    
    }).catch((err)=>{
      user_rezor_pay_helper.orderPaymentcancel(order,productsQuantity.orderedItemQuantity)
    })
  
}


exports.user_online_razor_pay_cancel = (req,res) => {  
  user_rezor_pay_helper.orderPaymentcancel(order,productsQuantity.orderedItemQuantity).then((data) => {      
  })
  res.redirect('/myOrders')
}