var express = require('express');
var router = express.Router();

//........................................................ bson object converter ..............................................................................................


const {ObjectID} = require('bson');


// .............................pay-pal.....................//

const pay_pal = require('paypal-rest-sdk')

pay_pal.configure({
    'mode' : 'sandbox',
    'client_id' : 'AXbA_u9CeTcr2zF2bsxSdOWQ7CnDyPTD5t7vG-mV30lSniPn2kzCjkgeIeNkgvCrMFDdnhurAm2rZuI_',
    'client_secret' : 'ENGs6DJB6_KHXzUxfXFR6IRVWQBQqfDYRgNAI8PEpPYvnR_cMMceyXESkijLk4PDiURcXoLnZELXKy8F'
})

require('dotenv').config();


 //........................................................ controller .........................................................................................


const user_sign_up = require('../controller/user-controller/user-sign-up')
const user_login = require('../controller/user-controller/user-login')
const user_home = require('../controller/user-controller/user-home')
const user_shop = require('../controller/user-controller/user-shop')
const user_view_item = require('../controller/user-controller/user-view-item')
const user_catgory_filter = require('../controller/user-controller/user-category-filter')
const user_profile = require('../controller/user-controller/user-profile')
const user_cart = require('../controller/user-controller/user-cart')
const user_wish_list = require('../controller/user-controller/user-wish-list')
const user_check_out = require('../controller/user-controller/user-check-out')
const user_online_payment = require('../controller/user-controller/user-online-order')
const user_razor_pay = require('../controller/user-controller/user-razor-pay')
const user_address = require('../controller/user-controller/user-address')
const user_order = require('../controller/user-controller/user-orders')
const user_wallet_purchasing = require('../controller/user-controller/user-wallet-purchasing')
const user_logout = require('../controller/user-controller/user-log-out')






 //........................................................ sign-up-get .........................................................................................

router.get('/sign-up',user_sign_up.user_sign_up_get)

 //........................................................ sign-up-post .........................................................................................

router.post('/sign-up',user_sign_up.user_sign_up_post)

 //........................................................ login-get .........................................................................................

router.get('/login',user_login.user_login_get)

 //........................................................ login-post .........................................................................................

router.post('/login',user_login.user_login_post);

//........................................................ home-get .........................................................................................

router.get('/',user_home.user_home_get)

//........................................................ home-search .........................................................................................

router.get('/search',user_home.display_search_get)

 //........................................................ shop-get .........................................................................................

router.get('/shop',user_shop.user_shop_get)

//........................................................ home-search .........................................................................................

router.get('/search-display',user_shop.user_shop_search_get)

 //........................................................ view-item-get .........................................................................................

router.get('/view-item',user_view_item.user_view_item_get)

//........................................................ category filter-get .........................................................................................

router.get('/category-filter',user_catgory_filter.user_category_filter_get)

 //........................................................ profile-get .........................................................................................

router.get('/profile', user_profile.user_profile_get)

 //........................................................ profile-post .........................................................................................

router.post('/profile',user_profile.user_profile_post)

 //........................................................ otp login-get .........................................................................................

router.get('/otp-login',user_login.user_otp_login_get)

//........................................................ otp login-post .........................................................................................

router.post('/otpLogin',user_login.user_otp_login_post)

//........................................................ verify-get .........................................................................................

router.get('/verify',user_login.user_otp_login_verify_get)

 //........................................................ verify-post ........................................................................................

router.post('/verify',user_login.user_otp_login_verify_post)

 //........................................................ add to cart-get .........................................................................................

router.get('/add-to-cart',user_cart.user_add_to_cart_get)

 //........................................................ cart-get .........................................................................................

router.get('/cart',user_cart.user_cart_get)

 //........................................................ cart-get .........................................................................................

 router.post('/cart',user_cart.user_cart_post)

 //........................................................ cart-increase-get .........................................................................................

router.get('/cart-increase',user_cart.user_cart_increase_get)

//........................................................ cart-decrease-get .........................................................................................

router.get('/cart-decrease',user_cart.user_cart_decrease_get)

 //........................................................ cart-delete-get .........................................................................................

router.get('/cart-delete',user_cart.user_cart_delete_get)

 //........................................................ wish-list-post .........................................................................................

router.post('/wish-list',user_wish_list.user_add_wish_list_post)

 //........................................................ wish-list-get .........................................................................................

router.get('/wish-list',user_wish_list.user_wish_list_get)

 //........................................................ wish-delete .........................................................................................

router.post('/delete-wishlist',user_wish_list.user_wish_list_delete_post)

 //........................................................ check-out-get .........................................................................................

router.get('/place-order',user_check_out.user_place_order_get) 

//........................................................ check-out-post .........................................................................................

router.post('/check-out',user_check_out.user_place_order_post)

//........................................................ online-pay-pal-post .........................................................................................

router.get('/online-payment-pay-pal',user_online_payment.user_pay_pal_get)

//........................................................ online-pay-pal-post .........................................................................................

router.post('/online-payment-pay-pal',user_online_payment.user_pay_pal_post)

//........................................................ online-pay-pal-success .........................................................................................

router.get('/success-payment-pay-pal',user_online_payment.user_pay_pal_success)

 //........................................................ online-pay-pal-cancel .........................................................................................

router.get('/cancel-payment-pay-pal',user_online_payment.user_pay_pal_cancel)

 //........................................................ online-razorpay-get .........................................................................................

router.get('/online-payment-razor-pay',user_razor_pay.user_online_razor_pay_get)

//........................................................ online-razorpay-post .........................................................................................

router.post('/online-payment-razor-pay',user_razor_pay.user_online_razor_pay_post)

//........................................................ online-razorpay-cancel .........................................................................................

router.post('/razorpay-cancel',user_razor_pay.user_online_razor_pay_cancel)

//........................................................ add address-get .........................................................................................

router.get('/add-address',user_address.user_add_address_get)

 //........................................................ add address-post .........................................................................................

router.post('/add-address',user_address.user_add_address_post)

//........................................................ select address-post .........................................................................................

router.get('/select-address',user_address.user_select_address_get)

//........................................................ remove address-post .........................................................................................

router.post('/delete-address',user_address.user_delete_address_post)

//........................................................ edit address-get .........................................................................................

router.post('/edit_address',user_address.user_edit_address_post)

//........................................................ all orders-get .........................................................................................

router.get('/select-order',user_check_out.user_select_order_address_get)

//........................................................ buy now-get .........................................................................................

router.get('/buyNow',user_check_out.user_single_product_buy_get)

//........................................................ buy now-post .........................................................................................

router.post('/buyNow',user_check_out.user_single_product_buy_post)
 
//........................................................ user-order-get ..............................................................................................

router.get('/myOrders',user_order.user_all_orders_get)

//........................................................ order-details-get ..............................................................................................

router.get('/orderDetails',user_order.user_all_orders_details_get)

//........................................................ order-cancel ..............................................................................................

router.post('/cancel_order',user_order.user_cancel_order_post)

//........................................................ order-cancel ..............................................................................................

router.post('/return_order',user_order.user_return_product_post)

//........................................................ order-cancel ..............................................................................................

router.get('/wallet_history',user_order.user_wallet_get)

//........................................................ price filter ..............................................................................................

router.post('/price-filter',user_shop.filter_get)

//........................................................ change password ..............................................................................................

router.post('/change-password',user_profile.user_change_password_post)

//........................................................ change password ..............................................................................................

router.post('/change-DefaultAddress',user_profile.user_change_default_address_post)

//........................................................ wallet purchasing ..............................................................................................

router.get('/wallet-purchasing',user_wallet_purchasing.user_wallet_purchasing_get)

//........................................................ forget password ..............................................................................................

router.get('/forget-password',user_login.user_forget_password_get)

//........................................................ forget password ..............................................................................................

router.post('/forget-password',user_login.user_forget_password_post)

//........................................................ forget password-verify ..............................................................................................

router.get('/forget-password-verify',user_login.user_forget_password_verify_get)

//........................................................ forget password-verify ..............................................................................................

router.post('/forget-password-verify',user_login.user_forget_password_verify_post)

//........................................................ change password ..............................................................................................

router.get('/change-password-login',user_login.user_change_password_get)

//........................................................ change password ..............................................................................................

router.post('/change-password-login',user_login.user_change_password_post)

//........................................................ user-logout-get ..............................................................................................

router.get('/logout', user_logout.user_logout_get)

//........................................................ module-exporting..............................................................................................

module.exports = router;