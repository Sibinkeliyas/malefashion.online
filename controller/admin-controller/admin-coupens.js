const coupen_helpers = require('../../helpers/admin-helpers/admin-coupen-helpers')
const { ObjectID } = require('bson');



exports.admin_add_coupen_get = (req,res) => {
    if(req.session.admin){
        coupen_helpers.existingCoupens().then((data)=>{
            res.render('add-coupen',{data})
        })
        
    }else{
        res.redirect('/login')
    }
   
}
exports.admin_add_coupen_post = async(req,res) => {
    let coupen = await coupen_helpers.coupenExist(req.body)
    if(coupen){
        res.json({status : true})
    }else{
        req.body.coupenexpire = new Date(req.body.coupenexpire)
        coupen_helpers.add_coupen(req.body)
        res.redirect('/admin/add-coupen')
    }
   
}

exports.admin_delete_coupen_post = (req,res) => {
    coupen_helpers.deleteCoupen(req.query.id)
}













