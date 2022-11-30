const user_login_helper = require('../../helpers/user-helpers/user-login-helper')
const bcrypt = require('bcrypt')
//........................................................ twilio ..............................................................................................
const twilio = require('../../config/twilio');
const client = require('twilio')(twilio.accountSID, twilio.authToken)
 //........................................................global variable .........................................................................................

var numberStatus
var otpphoneNumber
var loginStatus = false;
var emailstatus = false
var blocErrr


exports.user_login_get = (req,res)=>{
    if (req.session.user) {
        res.redirect('/')
      } else {
        res.render('login', {
          emailstatus,
          loginStatus,
          blocErrr
        })
        blocErrr = false
        loginStatus = false
        emailstatus = false
      }
}

exports.user_login_post = (req,res)=>{
    user_login_helper.doLogin(req.body).then((data) => {
      console.log(data.login);
        if (data.status) {       
            req.session.user = data.user
            if(req.session.returnTo){
              res.redirect(req.session.returnTo)
            } else{
              res.redirect('/')
            }  
          }else if(data.login === false){
            blocErrr = true;
            res.redirect('/login')
          } else if(data.emailstatus){
            emailstatus = true;
            res.redirect('/login')
          }
         else {
          res.redirect('/login')
          loginStatus = true
        }
      })
}

exports.user_otp_login_get = (req,res)=>{
    if (req.session.user) {
        res.redirect('/')
      } else {
        res.render('otp-login', {
          numberStatus
        })
        numberStatus = false
      }
}

exports.user_otp_login_post = (req,res)=>{
  user_login_helper.doFindNumber(req.body.number).then((data) => {
        if (data != null) {
          otpphoneNumber = req.body.number
          client
            .verify
            .services(twilio.serviceID)
            .verifications
            .create({
              to: `+91${req.body.number}`,
              channel: "sms"
            }).then((data) => {
              res.redirect('/verify')
            }).catch((err) => {
              console.log(err);
            })
        } else {
          res.redirect('/otp-login')
          numberStatus = true
        }
      })
}

exports.user_otp_login_verify_get = (req,res)=>{
    if (req.session.user) {
        res.redirect('/')
      } else {
        res.render('otp-verify')
      }   
}

exports.user_otp_login_verify_post = (req,res)=>{
    client
    .verify
    .services(twilio.serviceID)
    .verificationChecks
    .create({
      to: `+91${otpphoneNumber}`,
      code: req.body.otp
    }).then((data) => {
      if (data.status == "approved") {
        req.session.user = otpphoneNumber
        user_login_helper.doFindNumber(otpphoneNumber).then((data)=>{
          req.session.user = data
           res.redirect('/')
        })
      } else {
        res.redirect('/login')
      }
    }).catch((err) => {
      res.send(err)
      console.log(err);
    })
}

exports.user_forget_password_get = (req,res) => {
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render('forgetPassword')
  }
  
}

exports.user_forget_password_post = (req,res) => {
  user_login_helper.doFindNumber(req.body.number).then((data) => {
    if (data != null) {
      otpphoneNumber = req.body.number
      client
        .verify
        .services(twilio.serviceID)
        .verifications
        .create({
          to: `+91${req.body.number}`,
          channel: "sms"
        }).then((data) => {
          res.redirect('/forget-password-verify')
        }).catch((err) => {
          console.log(err);
        })
    } else {
      res.redirect('/forget-password')
      numberStatus = true
    }
  })
}

exports.user_forget_password_verify_get = (req,res) => {
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render('forgetPassword-verify')
  }
}

exports.user_forget_password_verify_post = (req,res) => {
  console.log(otpphoneNumber);
  client
  .verify
  .services(twilio.serviceID)
  .verificationChecks
  .create({
    to: `+91${otpphoneNumber}`,
    code: req.body.otp
  }).then((data) => {
    if (data.status == "approved") {
      req.session.mobile = otpphoneNumber
      user_login_helper.doFindNumber(otpphoneNumber).then((data)=>{
         res.redirect('/change-password-login')
      })
    } else {
      res.redirect('/login')
    }
  }).catch((err) => {
    res.send(err)
    console.log(err);
  })
}

exports.user_change_password_get = (req,res) => {
  if (req.session.user) {
    res.redirect('/')
  } else if(req.session.mobile){
    console.log(req.session.mobile);
    res.render('change-password')
  } else{
    res.redirect('/login')
  }
}

exports.user_change_password_post = (req,res) => {
console.log(req.body.password);
bcrypt.hash(req.body.password, 10, (err, hash)=> {
  if(err) throw err
  else{                  
    req.body.password = hash                   
  }
  user_login_helper.updatePassword(otpphoneNumber,req.body.password).then((data) => {
    res.redirect('/login')
  })
})
}