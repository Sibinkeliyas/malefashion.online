const orders = require('../user-controller/user-check-out')
const orderID = require('../user-controller/user-check-out')
const user_online_order_helper = require('../../helpers/user-helpers/user-online-order-helper')

//............ 

const paypal = require('paypal-rest-sdk');
const { reject } = require('promise');
require('dotenv').config();

let paypalSuccessStatus = false


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.client_id,
    'client_secret': process.env.client_secret
  });



 //........................................................global variable ...........................................................................................



 exports.user_pay_pal_get = async(req,res) => {
    if(req.session.user){
        res.render('pay-pal',{cart : orders.cart,totalprize : orders.totalPrice,paypalSuccessStatus})
        paypalSuccessStatus = false
    }else{
        res.redirect('/login')
    }
    
 }



 exports.user_pay_pal_post = (req,res) => {
      paypalSuccessStatus = false
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success-payment-pay-pal",
            "cancel_url": "http://localhost:3000/cancel-payment-pay-pal"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Hat for the best team ever"
        }]
    };
    
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
          throw error;
      } else {
          for(let i = 0;i < payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
              res.redirect(payment.links[i].href);
            }
          }
      }
    });
 }


 exports.user_pay_pal_success = async(req,res)=> {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
        let status = 'placed'
        user_online_order_helper.orderPaymentStatus(orderID.orderID,status).then((data)=>{

        })
      }
  });
  paypalSuccessStatus = true;
  res.redirect('/online-payment-pay-pal')
 }


 exports.user_pay_pal_cancel = (req,res) => {
    let status = "failed"
    user_online_order_helper.increase(orderID.productID)
    user_online_order_helper.orderPaymentStatus(orderID.orderID,status).then((data)=>{
        
    })
    paypalSuccessStatus = true;
 }

