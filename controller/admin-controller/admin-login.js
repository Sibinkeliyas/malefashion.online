const admin_login_helpers = require('../../helpers/admin-helpers/admin-login-helpers')



//........................................................ object converter ..............................................................................................

let emailStatus  = false
let passStatus = false



exports.admin_login_get = (req,res)=>{
    if(req.session.user){
        res.redirect('/')
    }else if(req.session.admin){
            res.redirect('/admin')
    }else{
        res.render('admin-login',{emailStatus,passStatus})
        emailStatus  = false
        passStatus = false
    }
}


exports.admin_login_post = (req,res)=>{ 
    admin_login_helpers.admin_login(req.body).then((data)=>{
        console.log(data);
        if(data.status === true){
        req.session.admin = data.admin
        res.redirect('/admin/')
        }else if(data.emailStatus === true){         
            emailStatus = true
            res.redirect('/admin/login')
        }else if(data.status === false){
            passStatus = true
            res.redirect('/admin/login')
        }
        })
}
