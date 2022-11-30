const view_more_orders_helper = require('../../helpers/admin-helpers/admin-view-more-orders-helpers')
const { ObjectID } = require('bson');




exports.admin_view_user_get = (req,res)=>{
    if(req.session.user){
        res.redirect('/')
        }else if (req.session.admin){
            view_more_orders_helper.doUserdetails().then((data)=>{
        res.render('user-details',{data})
        })
        }else{
            res.redirect('/login')
        }   
}



