const express=require('express');
const router=express.Router();
const Product=require('../models/Product');
const User=require('../models/User');

//save the products
router.post('/',(request,response)=>{
    const tokenz=request.body.token;
    if(tokenz){
        //find and match the token from cookies 
        User.findOne({token:tokenz}).then(result=>{
            if(result!==null){
                //if the token is match save the product
                let newProduct = new Product( request.body.products );
                newProduct.addedBy=result._id;
                newProduct.save().then( result => {
                    response.send({ status: "Product Added Successfully!" });
                });
            }else{
                response.send({ status: "Intruder Detected!" });
            }
        });
    }else{
        response.send({ status: "Intruder Detected!" });
    }
})

//update the products
router.put('/',(request,response)=>{
    let product=request.body.product;
    Product.updateOne(
        { _id: request.body.updateProductId }, 
        { $set: { ...product } })
    .then( result => {
        response.send({ status: 'Product Updated Successfully!' });
    });
});

//gets all the products
router.get('/',(request,response)=>{
    Product.find({category:'bread'},{
        createdAt:0,
        updatedAt:0,
        __v:0
    }).then(result=>{
        if(result!==null){
            response.send(result);
        }else{
            response.send(false);
        }
        
    });
})

//delete the products
router.delete('/:id', ( request, response ) => {

    Product.deleteOne({ _id: request.params.id })
    .then( result => {
        if( result.deletedCount === 1 ){
            response.send({
                status: "Product Deleted Successfully."
            });
        }
    });
    
});

module.exports=router;