const home_helpers = require('../../helpers/admin-helpers/admin-home-helpers')
const moment = require('moment')
//admin dashboard needs//
let week = moment().subtract(7, 'days').calendar()
let month = moment().subtract(30, 'days').calendar()
const { ObjectID } = require('bson');




exports.admin_home_get = async(req,res)=>{
    if(req.session.admin){
        let revenue = 0,Wrevenue = 0,mrevenue = 0

        //...............total orders.....................//

        let orders_count =await home_helpers.ordersCount()
        let orders =await home_helpers.all_orders()
        for(i = 0 ;i < orders.length ; i++){
            if(orders[i].status == "delivered"){
                revenue =parseInt(revenue) + parseInt(orders[i].totalPrice[0].total)
            }
          
        }  
        exports.revenue = revenue
        
        //................weekly ordres...................//


        let weeks = await home_helpers.weekDiff(week)  
        for(var i = 0 ; i < weeks.length ; i++){
            if(weeks[i].status == "delivered"){
                Wrevenue =parseInt(Wrevenue) + parseInt(weeks[i].totalPrice[0].total)
            }
        }   
        //................monthlly........................//


        let months = await home_helpers.weekDiff(month)   
        for(var i = 0 ; i < months.length ; i++){
            if(months[i].status == "delivered"){
                mrevenue =parseInt(mrevenue) + parseInt(months[i].totalPrice[0].total)
            }
        }   
        //................total orderes...................//

        let all_users = await home_helpers.total_users()

        //------active-users-----//

        let activeStatus = true;
        let acticeUsers = await home_helpers.activeusers(activeStatus)

        //------active-users-----//

        let nonactiveStatus = false;
        let nonacticeUsers = await home_helpers.activeusers(nonactiveStatus)

        //................weekly..........................//

        let weeklyUsers = await home_helpers.users(week)

        //................monthly..........................//

        let monthly = await home_helpers.users(month)

        //...............no. of COD's.....................//
        let methodCod = "cod"
        let cod =await home_helpers.order_payment(methodCod)


        //-------week-----

        let codWeek =await home_helpers.order_paymentDate(week,methodCod)
   

        //-------month-----

        let codmonth =await home_helpers.order_paymentDate(month,methodCod)

        

        //...............no. of paypal's.....................//
        let methodpaypal = "paypal"
        let paypal =await home_helpers.order_payment(methodpaypal)

        //-------week-----

        let paypalweek =await home_helpers.order_paymentDate(week,methodpaypal)


        //-------month-----

        let paypalmonth =await home_helpers.order_paymentDate(month,methodpaypal)
 
        


        //...............no. of razorpay's.....................//
        let methodrazorpay = "razorpay"
        let razorpay =await home_helpers.order_payment(methodrazorpay)
 

       //-------week-----


       let razorpayweek =await home_helpers.order_paymentDate(week,methodrazorpay)


       //-------month-----

       let razorpaymonth =await home_helpers.order_paymentDate(month,methodrazorpay)

        res.render('home',{admin : req.session.admin.email,orders_count,revenue,weeks,Wrevenue,months,mrevenue,all_users,weeklyUsers,monthly,cod,codWeek,codmonth,paypal,paypalweek,paypalmonth,razorpay,razorpayweek,razorpaymonth,acticeUsers,nonacticeUsers})
       } else if(req.session.user){
           res.redirect('/')
       } else{
           res.redirect('/login')
       }
}





















