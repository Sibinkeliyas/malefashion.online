const sales_helper = require('../../helpers/admin-helpers/admin-sales-helper')
const { ObjectID } = require('bson');

exports.admin_sales_report_get = async(req,res) => {
    let revenue = 0,sales,order
    if(req.session.admin){
        sales = await sales_helper.orders()
        order =await sales_helper.all_orders()
       
       for(var i = 0 ;i < order.length ; i++){

           if(order[i].status == "delivered"){
               revenue =parseInt(revenue) + parseInt(order[i].totalPrice[0].total)
           }
         
       } 


        res.render('sales-report',{sales,revenue})
    }
}









//..................function........................//



