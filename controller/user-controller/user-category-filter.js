const wallet = require('../user-controller/user-home');
const user_shop_helper = require('../../helpers/user-helpers/user-shop-helpers')
const user_home_helper = require('../../helpers/user-helpers/user-home-helper')
const user_category_filter = require('../../helpers/user-helpers/user-category-helpers')

 //........................................................global variable .........................................................................................


 let profileStatus;



 exports.user_category_filter_get = async(req,res)=>{
    profileStatus = false
    let wish_list,count,price
    if(req.session.user){
        count  =await user_category_filter.docartProductCount(req.session.user._id)
        profileStatus = true
        wish_list = await user_home_helper.doFindWishList(req.session.user._id)
    }else{
        profileStatus = false
        req.session.returnTo = req.originalUrl
    }
    user_shop_helper.doFindCategory().then((data) => {
        cartDetails = data
      })
      price = {
        max : 0
      }
    let wallets = wallet.wallets
    let category = await user_category_filter.doFindCategory(req.query.id)
    let data = await user_category_filter.doFindCategoryItems(req.query.id)
    res.render('shop',{data,profileStatus,Name : req.session.user,count,wallets,cartDetails,wish_list,category,price})
 }