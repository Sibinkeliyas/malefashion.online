 var profileStatus;



 exports.user_logout_get = (req,res)=>{
   req.session.returnTo = false
    req.session.user = false
    accountStatus = false
    profileStatus = false
    res.redirect('/')
 }