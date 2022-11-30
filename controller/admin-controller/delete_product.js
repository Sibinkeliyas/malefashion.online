var connection = require('../../config/connection')
var collection = require('../../config/collection')
const { ObjectID } = require('bson')
const delete_helpers = require('../../helpers/admin-helpers/admin-delete-product-helpers')


exports.admin_delete_prduct = (req,res)=>{
    if(req.session.user){
        res.redirect('/')
        }else if (req.session.admin){
        var id = ObjectID(req.query.id)
        delete_helpers.doDelete(id)
        res.redirect('/admin/product-details')
        
        }else{
        res.redirect('/login')
        }
}




