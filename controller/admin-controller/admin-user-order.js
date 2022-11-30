const order_helpers = require('../../helpers/admin-helpers/admin-user-orders-helpers')
const { ObjectID } = require('bson');

exports.admin_user_orders_get = async(req,res)=>{
    let all_orders = await order_helpers.allOrders()
    res.render('user-orders',{all_orders})
}


exports.admin_user_order_details_get = async(req,res)=>{
    let orders = await order_helpers.doOrderDetails(req.query.id)
    res.render('view-more',{orders})
}

exports.admin_user_order_cancel_post = (req,res)=>{
    order_helpers.cancelOrder(req.query.id).then((data)=>{
        if(data != null){
          res.json({status : true})
        }
      })
}

exports.admin_user_order_accept_post = (req,res)=>{
    order_helpers.acceptOrder(req.query.id).then((data)=>{
        if(data != null){
          res.json({status : true})
        }
      })
}

exports.admin_user_order_shipping_post = (req,res)=>{
    order_helpers.shippingOrder(req.query.id).then((data)=>{
        if(data != null){
          res.json({status : true})
        }
      })
}

exports.admin_user_order_delivery_post = (req,res)=>{
    order_helpers.deliverOrder(req.query.id).then((data)=>{
        if(data != null){
          res.json({status : true})
        }
      })
}











