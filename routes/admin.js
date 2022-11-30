var express = require('express');
var router = express.Router();


//........................................................ object converter ..............................................................................................


const { ObjectID, ObjectId } = require('mongodb');


//........................................................ image upload requires ..............................................................................................
var fs = require('fs')
var path = require('path')

//........................................................ file upload ..............................................................................................



//........................................................ multer .................................

const multer = require('multer');


//........................................................ conrtroller ................................

const admin_home_controller = require('../controller/admin-controller/admin-home')
const admin_login_controller = require('../controller/admin-controller/admin-login')
const admin_add_item_controller = require('../controller/admin-controller/admin-item') 
const admin_product_management = require('../controller/admin-controller/product-details')
const admin_update_product = require('../controller/admin-controller/udate-product')
const admin_delete_prduct = require('../controller/admin-controller/delete_product')
const admin_view_user = require('../controller/admin-controller/admin-view-user')
const admin_view_single_user = require('../controller/admin-controller/admin-single-user')
const admin_block_user = require('../controller/admin-controller/admin-block-user')
const admin_category = require('../controller/admin-controller/admin-category')
const admin_brands = require('../controller/admin-controller/admin-brands')
const admin_user_orders = require('../controller/admin-controller/admin-user-order')
const admin_logout = require('../controller/admin-controller/admin-logout')
const admin_sales_report = require('../controller/admin-controller/admin-sales-report')
const admin_coupen = require('../controller/admin-controller/admin-coupens')
const admin_banners = require('../controller/admin-controller/admin-banners')





//........................................................ storage ................................


const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".webp") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

//........................................................ admin-home-get ..............................................................................................

router.get('/',admin_home_controller.admin_home_get)

//........................................................ admin-login-get ..............................................................................................

router.get('/login',admin_login_controller.admin_login_get)

//........................................................ admin-login-post ..............................................................................................

router.post('/admin_login',admin_login_controller.admin_login_post)

//........................................................ admin-add-item-get ..............................................................................................

router.get('/add-item',admin_add_item_controller.admin_add_item_get)

//........................................................ admin-add-item-post ..............................................................................................

router.post('/add-item',upload.fields([
  { name: "image2", maxCount: 1 },{ name: "image3", maxCount: 1 },{ name: "image1", maxCount: 1 }]),admin_add_item_controller.admin_add_item_post)

//........................................................ product-details-get ..............................................................................................

router.get('/product-details',admin_product_management.admin_product_details_get)

//........................................................ update-product-get ..............................................................................................

router.get('/update-product',admin_update_product.admin_update_product_get)

//........................................................ update-product-post ..............................................................................................

router.post('/update-product',upload.fields([
  { name: "image1", maxCount: 1 },{ name: "image2", maxCount: 1 },{ name: "image3", maxCount: 1 }]),admin_update_product.admin_update_product_post)

//........................................................ delete-product ..............................................................................................

router.get('/delete-product',admin_delete_prduct.admin_delete_prduct)

//........................................................ all-users-get ..............................................................................................

router.get('/view-user',admin_view_user.admin_view_user_get)

//........................................................ single user-get ..............................................................................................

router.get('/single-user',admin_view_single_user.admin_single_user_get)

//........................................................ block-user-get ..............................................................................................

router.get('/block-user',admin_block_user.admin_block_user_get)

//........................................................ unblock-user-get ..............................................................................................

router.get('/unblock-user',admin_block_user.admin_unblock_user_get)

//........................................................ admin-add-category-get ..............................................................................................

router.get('/add-category',admin_category.admin_add_category_get)

//........................................................ admin-add-category-post ..............................................................................................

router.post('/add-category',admin_category.admin_add_category_post)

//........................................................ category-get ..............................................................................................

router.get('/category',admin_category.admin_all_category_get)

//........................................................ admin-delete-category-get ..............................................................................................

router.get('/delete-category',admin_category.admin_delete_category_get)

//........................................................ admin-edit-category-get ..............................................................................................

router.get('/edit-category',admin_category.admin_edit_category_get)

//........................................................ admin-edit-category-post ..............................................................................................

router.post('/edit-category',admin_category.admin_edit_category_post)

//........................................................ admin-add-coupen-get ..............................................................................................

router.get('/category-coupen',admin_category.admin_add_category_coupen_get)

//........................................................ admin-add-coupen-post ..............................................................................................

router.post('/category-coupen',admin_category.admin_add_category_coupen_post)

//........................................................ admin-add-coupen-get ..............................................................................................

router.post('/category-coupen-delete',admin_category.admin_add_category_coupen_delete_post)

//........................................................ admin-add-brands-post ..............................................................................................

router.post('/add-brand',admin_brands.admin_add_brands_post)

//........................................................ admin-add-brands-post ..............................................................................................

router.get('/brands',admin_brands.admin_display_brands_get)

//........................................................ admin-user-orders-get ..............................................................................................

router.get('/user-orders',admin_user_orders.admin_user_orders_get)

//........................................................ admin-view-more-get ..............................................................................................

router.get('/view-more',admin_user_orders.admin_user_order_details_get)

//........................................................ order-cancel ..............................................................................................

router.post('/cancel_order',admin_user_orders.admin_user_order_cancel_post)

//....................................................... order-accept ..............................................................................................

router.post('/accept_order',admin_user_orders.admin_user_order_accept_post)

//........................................................ order-shipping ..............................................................................................

router.post('/shipping_order',admin_user_orders.admin_user_order_shipping_post)

//........................................................ order-delivery ..............................................................................................

router.post('/delivery_order',admin_user_orders.admin_user_order_delivery_post)

//........................................................ order-delivery ..............................................................................................

router.get('/sales-report',admin_sales_report.admin_sales_report_get)

//........................................................ add-coupen..............................................................................................

router.get('/add-coupen',admin_coupen.admin_add_coupen_get)

//........................................................ add-coupen..............................................................................................

router.post('/add-coupen',admin_coupen.admin_add_coupen_post)

//........................................................ add-coupen..............................................................................................

router.post('/delete-coupen',admin_coupen.admin_delete_coupen_post)

//........................................................ add-banners..............................................................................................

router.get('/add-banners',admin_banners.admin_banners_controll_get)

//........................................................ add-banners..............................................................................................

router.post('/add-banners',upload.fields([
  { name: "image1", maxCount: 1 }]),admin_banners.admin_banners_controll_post)

//........................................................ add-banners..............................................................................................

router.get('/display-banners',admin_banners.admin_all_banners_get)

//........................................................ edit-banners..............................................................................................

router.get('/edit-banners',admin_banners.admin_edit_banners_get)

//........................................................ edit-banners..............................................................................................

router.post('/edit-banners',upload.fields([
  { name: "image1", maxCount: 1 }]),admin_banners.admin_edit_banners_post)

  //........................................................ delete-banners..............................................................................................

router.post('/delet-banners',admin_banners.admin_delete_banner_post)

//........................................................ admin-logout-get ..............................................................................................

router.get('/admin-logout',admin_logout.admin_logout_get)

//........................................................ admin-exporting ..............................................................................................

module.exports = router;
