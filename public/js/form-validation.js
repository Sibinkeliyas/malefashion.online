(function ($) {
  "use strict";
  $(function () {
    // validate the comment form when it is submitted

    $("#form").validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        password: {
          required: true,
          minlength: 5,
        },
        email: {
          required: true,
          email: true,
        },
        mobile: {
          required: true,
          minlength: 10,
        },
      },
      messages: {
        name: "Please enter your firstname",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long",
        },
        phone: {
          required: "Please provide your phone number",
          minlength: "Please provide a valid phone number",
        },
        email: "Please enter a valid email address",
      },
      errorPlacement: function (label, element) {
        label.addClass("mt-2 text-danger");
        label.insertAfter(element);
      },
      highlight: function (element, errorClass) {
        $(element).parent().addClass("has-danger");
        $(element).addClass("form-control-danger");
      },
    });

    $("#commentForm").validate({
      errorPlacement: function (label, element) {
        label.addClass("mt-2 text-danger");
        label.insertAfter(element);
      },
      highlight: function (element, errorClass) {
        $(element).parent().addClass("has-danger");
        $(element).addClass("form-control-danger");
      },
    });
    // validate signup form on keyup and submit
    $("#signupForm").validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        password: {
          required: true,
          minlength: 5,
        },
        email: {
          required: true,
          email: true,
        },
        phone: {
          required: true,
          minlength: 10,
        },
      },
      messages: {
        name: "Please enter your firstname",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long",
        },
        phone: {
          required: "Please provide your phone number",
          minlength: "Please provide a valid phone number",
        },
        email: "Please enter a valid email address",
      },
      errorPlacement: function (label, element) {
        label.addClass("mt-2 text-danger");
        label.insertAfter(element);
      },
      highlight: function (element, errorClass) {
        $(element).parent().addClass("has-danger");
        $(element).addClass("form-control-danger");
      },
    });

    $("#addProductform").validate({
      rules: {
        product_image: {
          required: true,
        },
        name: {
          required: true,
          minlength: 2,
        },
        description: {
          required: true,
          minlength: 5,
        },
        category: {
          required: true,
        },
        quantity: {
          required: true,
          min: 1,
        },
        price: {
          required: true,
          min: 8,
        },
      },
      messages: {
        product_image: "Please enter a image",
        name: {
          required: "Please enter product name",
          minlength: "Product name must be at least 2 characters long",
        },
        description: {
          required: "Please provide some description",
          minlength: "Product description must be at least 2 characters long",
        },
        category: "Please select a category",
        quantity: {
          required: "Please enter product quantity",
          min: "Product quantity should be atleast 1",
        },
        price: {
          required: "Please enter product price",
          min: "Product price should be atleast 8 rupees",
        },
      },
      errorPlacement: function (label, element) {
        label.addClass("mt-2 text-danger");
        label.insertAfter(element);
      },
      highlight: function (element, errorClass) {
        $(element).parent().addClass("has-danger");
        $(element).addClass("form-control-danger");
      },
    });


    $("#loginForm").validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 5,
        },
      },
      messages: {
        email: "Please enter a valid email address",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long",
        },
      },
      errorPlacement: function (label, element) {
        label.addClass("mt-2 text-danger");
        label.insertAfter(element);
      },
      highlight: function (element, errorClass) {
        $(element).parent().addClass("has-danger");
        $(element).addClass("form-control-danger");
      },
    });
    $("#addCategoryForm").validate({
      rules: {
        category_name: {
          required: true,
        },
        category_description: {
          required: true,
        },
      },
      messages: {
        category_name: "Please provide a category name",
        category_description: "Please provide a category description",
      },
      errorPlacement: function (label, element) {
        label.addClass("mt-2 text-danger");
        label.insertAfter(element);
      },
      highlight: function (element, errorClass) {
        $(element).parent().addClass("has-danger");
        $(element).addClass("form-control-danger");
      },
    });


    $("#editProductform").validate({
      rules: {
        product_image: {
          required: true,
        },
        product_name: {
          required: true,
          minlength: 2,
        },
        product_description: {
          required: true,
          minlength: 5,
        },
        Category_id: {
          required: true,
        },
        product_quantity: {
          required: true,
          min: 1,
        },
        product_price: {
          required: true,
          min: 8,
        },
      },
      messages: {
        product_image: "Please enter a image",
        product_name: {
          required: "Please enter product name",
          minlength: "Product name must be at least 2 characters long",
        },
        product_description: {
          required: "Please provide some description",
          minlength: "Product description must be at least 2 characters long",
        },
        Category_id: "Please select a category",
        product_quantity: {
          required: "Please enter product quantity",
          min: "Product quantity should be atleast 1",
        },
        product_price: {
          required: "Please enter product price",
          min: "Product price should be atleast 8 rupees",
        },
      },
      errorPlacement: function (label, element) {
        label.addClass("mt-2 text-danger");
        label.insertAfter(element);
      },
      highlight: function (element, errorClass) {
        $(element).parent().addClass("has-danger");
        $(element).addClass("form-control-danger");
      },
    });
  });
})(jQuery);
