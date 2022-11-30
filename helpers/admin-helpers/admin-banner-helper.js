// requires
const { ObjectID } = require('bson');
var connection = require('../../config/connection')
var collection = require('../../config/collection');
const { resolve } = require('promise');


module.exports = {

     findBanners : () => {
        return new Promise(async(resolve,reject) => {
          connection.get().collection(collection.BANNERS).aggregate([
            {
              $unwind : "$images"
            }
          ]).toArray().then((data) => {
            resolve(data)
          })
        })
      },
       findBanner : (id) => {
        return new Promise(async(resolve,reject) => {
          connection.get().collection(collection.BANNERS).aggregate([
            {
              $match : 
              {
                _id : ObjectID(id)
              }
            },
            {
              $unwind : '$images'
            }
          ]).toArray().then((data) => {
            resolve(data)
          })
        })
      },
       updateBanners : (id,details) => {
        return new Promise(async(resolve,reject) => {
          connection.get().collection(collection.BANNERS).updateOne({
            _id : ObjectID(id)
          },{
            $set :{ bannerName : details.bannerName, 
              bannerSubHeading : details.bannerSubHeading,
              bannerHeading : details.bannerHeading,
              images : details.images
            }
           
          })
        })
      },
      delete_banner : (bannerID) => {
        return new Promise(async(resolve,reject) => {
          connection.get().collection(collection.BANNERS).deleteOne({
            _id : ObjectID(bannerID)
          }).then((data) => {
            resolve(data)
          })
        })
      }

}