const moment = require('moment')
const user_sign_up_helper = require('../../helpers/user-helpers/user-sign-up-helper')


 //........................................................global variable .........................................................................................

var status = false;

exports.user_sign_up_get = (req,res)=>{
    if (req.session.user) {
        res.redirect('/')
      } else {
    
        res.render('sign_up', {
          status
        })
        status = false
      }
    
}

exports.user_sign_up_post = (req,res)=>{
  req.body.date = moment().format('L')
  user_sign_up_helper.doSignup(req.body).then((data) => {
        if (data.status) {
          status = true
          res.redirect('/sign-up')
        } else {
          user_sign_up_helper.findRefferal(req.body.refferal).then((response) => {
            if(response){
              user_sign_up_helper.addTowallet(data,response)
              user_sign_up_helper.addTowallet(response._id,req.body)
            }
          })
          res.redirect('/login')
        }
    
      })
}





