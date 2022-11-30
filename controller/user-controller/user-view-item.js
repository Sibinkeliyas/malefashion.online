const { ObjectID } = require('bson')
const wallet = require('../user-controller/user-home')
const user_view_item_helper = require('../../helpers/user-helpers/user-view-item-helper')

 //........................................................global variable .........................................................................................


 let profileStatus;
 let cartName



 exports.user_view_item_get =async (req,res)=>{
    let count
    profileStatus = false
    if(req.session.user){
        profileStatus = true
      count  =await user_view_item_helper.docartProductCount(req.session.user._id)
    } else{
      req.session.returnTo = req.originalUrl
    }
    var id = ObjectID(req.query.id)
  
    let data = await user_view_item_helper.doViewItem(id)
    let category = await user_view_item_helper.doMatchcategory(id,data.categoryId)
    let wallets = wallet.wallets
      res.render('view-item', {
        data,
        cartName,
        count,
        profileStatus,
        Name : req.session.user,
        category,
        wallets
      })
 }




