const { ObjectID } = require('bson')
const block_helper = require('../../helpers/admin-helpers/admin-block-helpers')


exports.admin_block_user_get = (req,res)=>{
    if(req.session.user){
        res.redirect('/')
        }else if (req.session.admin){
        var id = ObjectID(req.query.id)
        block_helper.doBlock(id)
        res.redirect('/admin/view-user') 
        }else{
        res.redirect('/login')
        }   
}


exports.admin_unblock_user_get = (req,res)=>{
    if(req.session.user){
        res.redirect('/')
        }else if (req.session.admin){
        var id = ObjectID(req.query.id)
        block_helper.doUnblock(id)
        res.redirect('/admin/view-user')
        
        
        }else{
        res.redirect('/login')
        }
}


