var connection = require('../../config/connection')
var collection = require('../../config/collection')
const { ObjectID } = require('bson');
const cloudinary = require('../../cloudinary') 
const banner_helper = require('../../helpers/admin-helpers/admin-banner-helper')




exports.admin_banners_controll_get = (req,res) => {
  if(req.session.admin){
    res.render('add-banners')
  } else{
    res.redirect('/login')
  }
    
}

exports.admin_banners_controll_post = async(req,res) => {

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
      const  productData={
      bannerName : req.body.banners,
      bannerSubHeading : req.body.bannerssub,
      bannerHeading : req.body.bannershead,
      bannerDescription : req.body.bannersdes,
      images :urls,         
      }
      return new Promise((resolve,reject)=>{   
       connection.get().collection(collection.BANNERS).insertOne(productData).then((data) => {
        res.redirect('/admin/display-banners')
       })
      })
}

exports.admin_all_banners_get = (req,res) => {
  if(req.session.admin){
   banner_helper.findBanners().then((data) => {
      res.render('display-banners',{data})
    })  
  } else{
    res.redirect('/login')
  }  
}

exports.admin_edit_banners_get = (req,res) => {
  if(req.session.admin){
    banner_helper.findBanner(req.query.id).then((data) => {
      res.render('edit-banners',{data})
    })
    
  }
}

exports.admin_edit_banners_post = async(req,res) => { 
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
  const  productData={
  bannerName : req.body.banners,
  bannerSubHeading : req.body.bannerssub,
  bannerHeading : req.body.bannershead,
  bannerDescription : req.body.bannersdes,
  images :urls,
 
 
  }
    banner_helper.updateBanners(req.query.id,productData).then((data) => {
      res.redirect('/admin/display-banners')
     })
}

exports.admin_delete_banner_post = (req,res) => {
  console.log(req.query.id);
  banner_helper.delete_banner(req.query.id)
  res.redirect('/add-banners')
}

