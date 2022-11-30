const product_details_helpers = require('../../helpers/admin-helpers/admin-product-details-helpers')
const { ObjectID } = require('bson');


exports.admin_product_details_get = (req,res)=>{
    if(req.session.user){
        res.redirect('/')
        }else if (req.session.admin){
            product_details_helpers.doProductmanagement().then((data)=>{
        res.render('product-management',{data})
        })
        }else{
        res.redirect('/login')
        }
}


