const category_helpers = require('../../helpers/admin-helpers/admin-category-helpers')
const { ObjectID } = require('bson');




exports.admin_all_category_get = (req,res)=>{
   category_helpers.doFindCategory().then((data)=>{
        res.render('display-categories',{data})
    })
}

exports.admin_add_category_get = (req,res)=>{
    if(req.session.user){
        res.redirect('/')
    }else if(req.session.admin){
       
            res.render('add-category',)
              
    }else{
        res.redirect('/login')
    }  
}


exports.admin_add_category_post = (req,res)=>{
    category_helpers.doCategory(req.body)
    res.redirect('/admin/category')
}

exports.admin_edit_category_get = (req,res)=>{
    if(req.session.admin){
        var id = ObjectID(req.query.id)   
        category_helpers. doFindSingleCategory(id).then((data)=>{      
            res.render('edit-category',{data})
        })
    }else{
        res.redirect('/login')
    }
    
}

exports.admin_edit_category_post = (req,res)=>{
    var id = ObjectID(req.query.id)
   category_helpers.doUpdateCategory(id,req.body.Category)
    res.redirect('/admin/category')
}

exports.admin_delete_category_get =async (req,res)=>{

    if(req.session.admin){
    var id = ObjectID(req.query.id)
    let product = await category_helpers.doProductCheck(req.query.item)
    if( product !=null){
        res.json({status : true})
    }else{
       category_helpers. doDeleteCategory(id)
        res.redirect('/admin/category')
    } 
    }else{
        res.redirect('/login')
    }
}


exports.admin_add_category_coupen_get = async(req,res) => {
    if(req.session.admin){
        let data  = await category_helpers.all_category_coupen()
        let category = await category_helpers.categories()
        res.render('add-category-coupen',{category,data})
    }else{
        res.redirect('/login')
    }
   
}

exports.admin_add_category_coupen_post = async(req,res) => {
    let coupens =  await category_helpers.findCoupen(req.body)
    if(coupens != null){
        res.json({status : true})
    }else{
       category_helpers.coupen(req.body)
       category_helpers.add_coupen(req.body)
        res.redirect('/admin/category-coupen')
    }
   
}

exports.admin_add_category_coupen_delete_post = (req,res) => {
    category_helpers.delete_coupen(req.query)
}




























