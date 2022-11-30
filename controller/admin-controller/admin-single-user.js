const single_user_helper = require('../../helpers/admin-helpers/admin-single-user-helpers')
const { ObjectID } = require('bson');

exports.admin_single_user_get = (req,res)=>{
    if(req.session.user){
        res.redirect('/')
        }else if (req.session.admin){
        var id = ObjectID(req.query.id)
        single_user_helper.doFindUser(id).then((data)=>{
        res.render('singleUser',{data})
        })  
        }else{
        res.redirect('/login')
        } 
}


