const orders = require('../user-controller/user-check-out')
const wallet_purchasing_helper = require('../../helpers/user-helpers/user-wallet-purchase-helper')
const add_to_wallet = require('../../helpers/user-helpers/user-order-helper')
const total = require('../user-controller/user-cart')


exports.user_wallet_purchasing_get = async(req,res) => {
    let walletHistory = await wallet_purchasing_helper.walletHistiry(orders.orderID) 
    let order = {
        wallet : -total.totalPrice,
        walletHistory : [walletHistory]
    }
    await add_to_wallet.addTowallet(order,req.session.user._id).then((data) => {
        res.redirect('/myOrders')
    })
}