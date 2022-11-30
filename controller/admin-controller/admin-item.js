const { ObjectID } = require('bson')
const cloudinary = require('../../cloudinary')
const products_helpers = require('../../helpers/admin-helpers/admin-products-helper')
const moment = require('moment');

exports.admin_add_item_get = async(req,res)=>{
    if(req.session.user){
        res.redirect('/')
        }else if(req.session.admin){
            // let brands = await all_brands()
            products_helpers.doFindCategory().then((response)=>{
                res.render('add-item',{response})
            })   
        }
        else{
        res.redirect('/login')
        }
}




exports.admin_add_item_post = async(req,res)=>{
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
                if(req.body.offerprice){
             
                }else{
                    req.body.offerprice = req.body.price
                }
      let id = req.body.categories
      products_helpers.doFindSingleCategory(id).then(async(data)=>{
                let categoryOffers = 0
                await products_helpers.findCoupen(data.category).then((response)=>{
                    if(response){
                       let offerPrice  = parseInt((response.coupen/100) * parseInt(req.body.price)) 
                       categoryOffers =  parseInt(req.body.price) - parseInt(offerPrice)
                       
                    }else{
                         categoryOffers = 0
                    }
                })
                 
      const  productData={
                    productName : req.body.productName,
                    quantity :parseInt (req.body.quantity),
                    small : parseInt(req.body.small),
                    medium :parseInt( req.body.medium),
                    large : parseInt(req.body.large),
                    price : parseInt(req.body.price),
                    offerPrice : parseInt(req.body.offerprice),
                    brand : req.body.brand,
                    date : moment().format('L'),
                    description : req.body.description,
                    categories :data.category ,
                    categoryId : ObjectID(req.body.categories),
                    categoryOffer : categoryOffers,
                    image1 :urls[0],
                    image2 :urls[1],
                    image3 :urls[2],    
      }    
        products_helpers.doAdd(productData)
         res.redirect('/admin/product-details')
        
       
    })
     
}


