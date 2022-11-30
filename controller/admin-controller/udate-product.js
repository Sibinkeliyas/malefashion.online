const { ObjectID } = require('bson')
const cloudinary = require('../../cloudinary')
const update_products_helpers = require('../../helpers/admin-helpers/admin-update-product-helper')



let images1,images2,images3


exports.admin_update_product_get = (req,res)=>{
    let categoryItems
    if(req.session.user){
    res.redirect('/')
    }else if (req.session.admin){
    let id = ObjectID(req.query.id)
    update_products_helpers.doFindCategory().then((response)=>{
        categoryItems = response
    })
    update_products_helpers.doFindproduct(id).then((data)=>{
        images1 = data.image1
        images2 = data.image2
        images3 = data.image3
    res.render('update-product',{data,categoryItems})
    })   
    }else{
    res.redirect('/login')
    }
}

exports.admin_update_product_post = async(req,res)=>{
    const cloudinaryImageUploadMethod=(file)=>{
        return new Promise((resolve)=>{
          cloudinary.uploader.upload(file,(err,res)=>{
            if(err) return res.status(500).send('upload image error')
            resolve(res.secure_url)
          })
        })
      }
      const files=req.files
      let arr1=Object.values(files)
      let arr2=arr1.flat()
      
      const urls=await Promise.all(
        arr2.map(async (file)=>{
          const {path} = file;
          const result= await cloudinaryImageUploadMethod(path)
          return result
        })
        
      )

      let url1
      let url2
      let url3
      if (req.files.image1 == undefined && req.files.image2 != undefined && req.files.image3 != undefined){
        url1 = images1 ,
        url2 = urls[0],
        url3 = urls[1]
      } else if(req.files.image1 != undefined && req.files.image2 == undefined && req.files.image3 != undefined){
        url1 =urls[0] ,
        url2 = images2,
        url3 = urls[1]
      } else if(req.files.image1 != undefined && req.files.image2 != undefined && req.files.image3 == undefined){
        url1 =urls[0] ,
        url2 = urls[1],
        url3 = images3
      } else   if(req.files.image1 == undefined && req.files.image2 == undefined && req.files.image3 != undefined){
        url1 = images1,
        url2 = images2,
        url3 = urls[0]
      } else if(req.files.image1 != undefined && req.files.image2 == undefined && req.files.image3 == undefined){
        url1 =urls[0] ,
        url2 = images2,
        url3 = images3
      } else if(req.files.image1 == undefined && req.files.image2 != undefined && req.files.image3 == undefined){
        url1 =images1 ,
        url2 = urls[0],
        url3 = images3
      } else if(req.files.image1 == undefined && req.files.image2 == undefined && req.files.image3 == undefined){
        url1 =images1 ,
        url2 = images2,
        url3 = images3
      } else if(req.files.image1 != undefined && req.files.image2 != undefined && req.files.image3 != undefined){
        url1 = urls[0] ,
        url2 = urls[1],
        url3 = urls[2]
      }

    const categoryName = await update_products_helpers.doFindSingleCategory(ObjectID(req.body.categories))  
    let id = ObjectID(req.query.id)
    if(req.body.offerprice != undefined){
    }else{
        req.body.offerprice = req.body.price
    }
    const productData = {       
        productName : req.body.name,
         quantity : req.body.quantity,
         small : 0,
         medium : 0,
         large : 0,
         price :parseInt(req.body.price),
         offerPrice : parseInt(req.body.offerprice),
        brand : req.body.brand,
        quantity :parseInt(req.body.quantity),
        description : req.body.description,
        categories :categoryName.category,
        categoryId :  ObjectID(req.body.categories), 
        image1 :url1, 
        image2 :url2,
        image3 :url3,
        }
        update_products_helpers.doUpdateProduct(id,productData)
    res.redirect('/admin/product-details')   

} 