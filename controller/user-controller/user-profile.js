const wallet = require('../user-controller/user-home')
const user_profile_helper = require('../../helpers/user-helpers/user-profile-helper')
const bcrypt = require('bcrypt')


let profileStatus;
const cartCount =  require('../user-controller/user-check-out')


exports.user_profile_get = async(req,res)=>{
    if (req.session.user) {
      profileStatus = true
        var address = false
        user_profile_helper.doAddressFind(req.session.user._id).then(async(data)=>{
          if(data == null){
            address = true
          }
          let wallets = wallet.wallets
          count = cartCount.count
          let all_coupens = await user_profile_helper.coupons()
          let defaultAddress = await user_profile_helper.defaultAddress(req.session.user._id)
          res.render('profile', {Name: req.session.user,data,address,profileStatus,count,wallets,defaultAddress,all_coupens})
        })   
      } else {
        res.redirect('/')
      }
    
}

exports.user_profile_post = (req,res)=>{
    req.body.userID = req.session.user._id
    user_profile_helper.doAddressInsert(req.body)
    res.redirect('/profile')
}

exports.user_change_password_post = (req,res) => {
  //password bcrypt


  
  bcrypt.compare(req.body.oldPassword, req.session.user.password, function(err, result) {
    if(result == true) 
    {
        
  bcrypt.hash(req.body.newPassword, 10, (err, hash)=> {
    if(err) throw err
    else{                  
      req.body.newPassword = hash                   
    }
    user_profile_helper.updatePassword(req.session.user._id,req.body.newPassword).then((data) => {
      res.json({status : true})
    })
  })

    }else{
      res.json({status : false})
 
    }
    }); 
},
exports.user_change_default_address_post = (req,res) => {
  user_profile_helper.changeDefaultAddress(req.session.user._id,req.body.addressID)
}
