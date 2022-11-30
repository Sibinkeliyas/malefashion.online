const wallet = require('../user-controller/user-home')
const user_address_helpers = require('../../helpers/user-helpers/user-address-helper')

 //........................................................global variable .........................................................................................


 var profileStatus;



 exports.user_add_address_get  = async(req,res)=>{
    if(req.session.user){
        let count  =await user_address_helpers.docartProductCount(req.session.user._id)
        let wallets = wallet.wallets
         res.render('add-address',{profileStatus,count,Name : req.session.user,wallets})
       }else{
         res.redirect('/login')
       }
 }


exports.user_add_address_post = (req,res)=>{
    if(req.body === null){
    }else{
        user_address_helpers.doAddressInsert(req.body,req.session.user._id).then((data)=>{
        res.redirect('/select-address')
      })   
    }
}

exports.user_select_address_get = async(req,res)=>{
    if(req.session.user){
        profileStatus = true
        let addressStatus
        let wallets = wallet.wallets
        let address = await user_address_helpers.doAddressFind(req.session.user._id)
        let count  =await user_address_helpers.docartProductCount(req.session.user._id)
        console.log(address);
        res.render('selectAddress',{profileStatus,Name : req.session.user,count,address,addressStatus,wallets,display :req.query.id})
      } else{
        res.redirect('/login')
      }
      
}

exports.user_delete_address_post = (req,res)=>{
    user_address_helpers.removeAddress(req.query.id,req.session.user._id).then((data) => {
  if(data === true){
    res.json({status : false})
  }else{
    res.json({status : true})
  }
    })
}


exports.user_edit_address_post = (req,res)=>{
    user_address_helpers.editAddress(req.session.user._id,req.body.addressID,req.body)
    res.redirect('/select-address')
}










