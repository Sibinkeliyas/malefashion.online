
// login 
        jQuery('#login').validate({
            rules: {
              
              email: {
                    required: true,
                    email:true,
                },
               
               
            }, messages: {
              email1: "Please enter your name",
              email: {
                    required: "Please enter email",
                    Email: "Please enter valid email",
                },
                
          
	},
            submitHandler: function (form) {
                form.submit();
            }
}); 
  

// sign up


        jQuery('#form').validate({
            rules: {
                name: "required",
                email: {
                    required: true,
                    email:true,
                },
                password: {
                    required: true,
                    minlength: 5
                },
                Confirmpassword: {
                    required:true,
                    equalTo : "#Password"
                },
                mobile: {
                    required: true,
                    minlength: 10,
                    maxlength:10
                }
            }, messages: {
                name: "Please enter your name",
                email: {
                    required: "Please enter email",
                    Email: "Please enter valid email",
                },
                password: {
                    required: "Please enter your password",
                    minlength: "Password must be 5 char long"
                },
                Confirmpassword:{
                    required: "Please enter your password",
                    equalTo : "make sure your password is match"
        },
        mobile: {
            required: "Please enter your Mobile number",
            minlength: "Mobile must be 10 digit",
            maxlength:"Mobile must be 10 digit"
        }
	},
            submitHandler: function (form) {
                form.submit();
            }
}); 
   

// change password


jQuery('#change-password').validate({
    rules: {
       
        password: {
            required: true,
            minlength: 5
        },
        
    }, messages: {
        
        password: {
            required: "Please enter your password",
            minlength: "Password must be 5 char long"
        },
        
},
    submitHandler: function (form) {
        form.submit();
    }
}); 

// password mob

jQuery('#passMob').validate({
    rules: {
       
        number: {
            required: true,
            minlength: 10,
            maxlength:10
        }
        
    }, messages: {
        
        number: {
            required: "Please enter your Mobile number",
            minlength: "Mobile must be 10 digit",
            maxlength:"Mobile must be 10 digit"
        }
        
},
    submitHandler: function (form) {
        form.submit();
    }
}); 
   


// check out form

jQuery('#place-order-form').validate({
    rules: {
        firstName: "required",
        lastName : "required",
        country : 'required',
        address : 'required',
        town : 'required',
        state : 'required',
        pinCode : {
            required: true,
            minlength: 6,
            maxlength:10
        },
        email: {
            required: true,
            email:true,
        },
        
        mobile: {
            required: true,
            minlength: 10,
            maxlength:10
        },
       
    }, messages: {
        firstName: "Please enter your name",
        lastName: "Please enter your last name",
        country : 'Please enter your country',
        address : 'Please enter your  address',
        town : 'Please enter your town ',
        state : 'Please enter your town ',
        email: {
            required: "Please enter email",
            Email: "Please enter valid email",
        },
 
        mobile: {
            required: "Please enter your Mobile number",
            minlength: "Mobile must be 10 digit",
            maxlength:"Mobile must be 10 digit"
        },
        
        },
            submitHandler: function (form) {
                form.submit();
            }
}); 


jQuery('#place-order-form').validate({
        rules: {
                firstName: "required",
                lastName : "required",
                country : 'required',
                address : 'required',
                town : 'required',
                state : 'required',
                pinCode : {
                    required: true,
                    minlength: 6,
                    maxlength:10
                },
                email: {
                    required: true,
                    email:true,
                },
                
                mobile: {
                    required: true,
                    minlength: 10,
                    maxlength:10
                },
               
    }, messages: {
                firstName: "Please enter your name",
                lastName: "Please enter your last name",
                country : 'Please enter your country',
                address : 'Please enter your  address',
                town : 'Please enter your town ',
                state : 'Please enter your town ',
                email: {
                    required: "Please enter email",
                    Email: "Please enter valid email",
                },
         
                mobile: {
                    required: "Please enter your Mobile number",
                    minlength: "Mobile must be 10 digit",
                    maxlength:"Mobile must be 10 digit"
                },
                
                },
                    submitHandler: function (form) {
                        form.submit();
                    }
    }); 


    jQuery('#edit-order-form').validate({
            rules: {
                        firstName: "required",
                        lastName : "required",
                        country : 'required',
                        address : 'required',
                        town : 'required',
                        state : 'required',
                        pinCode : {
                            required: true,
                            minlength: 6,
                            maxlength:10
                        },
                        email: {
                            required: true,
                            email:true,
                        },
                        
                        mobile: {
                            required: true,
                            minlength: 10,
                            maxlength:10
                        },
                       
            }, messages: {
                        firstName: "Please enter your name",
                        lastName: "Please enter your last name",
                        country : 'Please enter your country',
                        address : 'Please enter your  address',
                        town : 'Please enter your town ',
                        state : 'Please enter your town ',
                        email: {
                            required: "Please enter email",
                            Email: "Please enter valid email",
                        },
                 
                        mobile: {
                            required: "Please enter your Mobile number",
                            minlength: "Mobile must be 10 digit",
                            maxlength:"Mobile must be 10 digit"
                        },
                        
                        },
                            submitHandler: function (form) {
                                form.submit();
                            }
            }); 

// banner

jQuery('#addProductform').validate({
    rules: {
            image1: "required",
            banners : "required",
            bannershead : 'required',
            bannerssub : 'required',
            bannersdes : 'required',
            
           
    }, messages: {
            files: "Please select file",
            banners : "fill the form",
            bannershead : 'fill the form',
            bannerssub : 'fill the form',
            bannersdes : 'fill the form',
            },
                submitHandler: function (form) {
                    form.submit();
            }
}); 


//category coupen

jQuery('#add-coupen').validate({
    rules: {
            category: "required",
            coupen : "required",
            
           
    }, messages: {
        category: "Please select category",
        coupen : "please enter the file",
           
            },
                submitHandler: function (form) {
                    form.submit();
            }
}); 


// normal coupen

jQuery('#coupen').validate({
    rules: {
        coupenName: "required",
        coupenOffer : "required",
        coupenminimum : "required", 
        coupenmaximum : 'required',
        coupenstart : "required",
        coupenexpire : "required",

            
           
    }, messages: {
        coupenName: "Please enter coupon name",
        coupenOffer : "Please enter coupon price",
        coupenminimum : "Please enter coupon minimum price", 
        coupenmaximum : 'Please enter coupon maximum price'
      
           
            },
                submitHandler: function (form) {
                    form.submit();
            }
}); 

// add item


jQuery('#additem').validate({
    rules: {
        id_image2: "required",
        id_image3 : "required",
        id_image1 : "required", 
        productName : "required",
        description : "required",
        categories : 'required',
        quantity : 'required',
        brand : 'required',
        price : "required",
        product_offer: { lessThan: "#product_price" } 

            
    }, messages: {
        id_image2: "choose file",
        id_image3 : "choose file",
        id_image1 : "choose file", 
        productName : "please enter the name",
        description : "please enter the description",
        categories : 'please select the category',
        quantity : 'please enter the quantity',
        brand : 'please enter the brand',
        price : "please enter the price",
        offerprice : "offer price should be less than price",
        
            },
                submitHandler: function (form) {
                    form.submit();
            }
}); 