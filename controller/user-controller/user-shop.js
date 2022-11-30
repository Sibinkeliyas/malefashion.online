const wallet = require('../user-controller/user-home');
const user_shop_helper = require('../../helpers/user-helpers/user-shop-helpers')
const user_home_helper = require('../../helpers/user-helpers/user-home-helper')
const user_category_filter = require('../../helpers/user-helpers/user-category-helpers')

 //........................................................global variable .........................................................................................


 let profileStatus = false;
 let cartDetails

 exports.user_shop_get = async(req,res)=>{
    let count,wish_list,price
    profileStatus = false
    if(req.session.user){
        profileStatus = true
      count  =await user_shop_helper.docartProductCount(req.session.user._id)
      wish_list = await user_home_helper.doFindWishList(req.session.user._id)
    } else{
      req.session.returnTo = req.originalUrl
    
    }

    user_shop_helper.doFindCategory().then((data) => {
      cartDetails = data
    })
    let wallets = wallet.wallets

    let category = await user_category_filter.doFindCategory(req.query.id)
    user_shop_helper.doFindAllproduct().then((data) => {
      price = {
        max : 0
      }
       console.log(wish_list);
      res.render('shop', {
        Name: req.session.user,
        data,
        cartDetails,
        profileStatus,
        count,
        wallets,wish_list,category,price
      })
    })
 }

 exports.filter_get = (req,res) => {
    // fileterMin = req.body.min
    // fileterMax = req.body.max
    // res.json({status : true})
 }

 exports.user_shop_search_get = async(req,res)=>{
  let count,wish_list,data,price
  profileStatus = false
  if(req.session.user){
      profileStatus = true
    count  =await user_shop_helper.docartProductCount(req.session.user._id)
  } else{
   
    req.session.returnTo = req.originalUrl
  
  }

  user_shop_helper.doFindCategory().then((data) => {
    cartDetails = data
  })
  let wallets = wallet.wallets
  if(req.session.user){
    wish_list = await user_home_helper.doFindWishList(req.session.user._id)
  }
  let category = await user_category_filter.doFindCategory(req.query.id)
 if(req.query.search){
  data = await user_home_helper.searchProduct(req.query.search)
  price = {
    max : 0
  }
 }else {
  data = await user_shop_helper.fileterMaxFind(req.query)
  price = {
    min : req.query.min,
    max : req.query.max
  }
 }
 console.log(wish_list);

    res.render('shop', {
      Name: req.session.user,
      data,
      cartDetails,
      profileStatus,
      count,
      wallets,wish_list,category,price
    })

}


