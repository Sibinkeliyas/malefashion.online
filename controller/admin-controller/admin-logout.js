

exports.admin_logout_get = (req,res)=>{
    req.session.admin = false
    res.redirect('/admin/login')
}