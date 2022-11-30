const user_home_helper = require('../../helpers/user-helpers/user-home-helper');




 //........................................................global variable .........................................................................................


 var profileStatus;

 


exports.user_home_get = async(req,res)=>{
    let count,wallets = 0
    profileStatus = false
    let wishlistUserID,wish_list
    if (req.session.user) {
    wish_list = await user_home_helper.doFindWishList(req.session.user._id)
    console.log(wish_list);
    let wallet = await user_home_helper.walletFind(req.session.user._id)
// wallet total;
    for(var i = 0 ; i <wallet.length; i++){
        wallets = parseInt(wallets) + parseInt(wallet[i].wallet.wallet)
    }
    
    exports.wallets = wallets
    profileStatus = true;
    count  =await user_home_helper.docartProductCount(req.session.user._id)
   wishlistUserID  = req.session.user._id
    } else {
      profileStatus = false;  
      req.session.returnTo = req.originalUrl
    }
    // search

    let banners = await user_home_helper.doFindBanners()
    user_home_helper.doFindAllproduct().then((data) => {
      req.session.returnTo = req.originalUrl
      res.render('index', {
        Name: req.session.user,
        data,
        profileStatus,
        count,
        wish_list,
        wallets,
        banners
      })
    })
}

exports.display_search_get = async(req,res) => {
  console.log(req.query.search);
  let count,wallets = 0
  profileStatus = false
  let wishlistUserID,wish_list
  if (req.session.user) {
  wish_list = await user_home_helper.doFindWishList(req.session.user._id)
  let wallet = await user_home_helper.walletFind(req.session.user._id)
// wallet total;
  for(var i = 0 ; i <wallet.length; i++){
      wallets = parseInt(wallets) + parseInt(wallet[i].wallet.wallet)
  }
  exports.wallets = wallets
  profileStatus = true;
  count  =await user_home_helper.docartProductCount(req.session.user._id)
 wishlistUserID  = req.session.user._id
  } else {
    profileStatus = false;  
    req.session.returnTo = req.originalUrl
  }
  // search
  let banners = await user_home_helper.doFindBanners()
   user_home_helper.searchProduct(req.query.search).then((data) =>{
    res.render('search', {
      Name: req.session.user,
      profileStatus,
      count,
      wish_list,
      wallets,
      banners,data
    })
   })

}
