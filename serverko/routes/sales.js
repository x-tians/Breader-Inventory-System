const express=require('express');
const router=express.Router();
const Sale=require('../models/Sale');
let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
const Product=require('../models/Product');
const Payment=require('../models/Payment');

//gets the products and sales informations
router.get('/:tid',(request,response)=>{
    Sale.find({ payment: request.params.tid,status:'pending' })
        .populate('product')
        .then( result => {
            if(result!==null){
                response.send(result);
            }
    });
})
//saving the products information
router.post('/',(request,response)=>{
    let sale=request.body.sale;
    let newSale = new Sale( sale );
    
    newSale.save().then( result => {
        
        Product.findOneAndUpdate(
            { _id: result.product }, 
            { $set: { stock: request.body.newStock} }).then(result=>{

            })
        response.send({ status:false,msg: "Product Added Successfully!",pid:result.product,transId:result.payment});
    });
})
//find and delete the added sale
router.delete('/:id/:pid/:stock', ( request, response ) => {
    const stock=Number(request.params.stock);
    //find the products and adds the products stocks and sales stocks
    Product.find({_id:request.params.pid}).then(result=>{
        const newStock= Number(result[0].stock)+stock;
        if(newStock<0){
            response.send({status:`Invalid Value ${newStock}`});
        }else{
            //find and update the current stocks from the product
            Product.findOneAndUpdate(
                { _id:request.params.pid }, 
                { $set: { stock: newStock} })
            .then( result => {
                //deleted the added sales
                Sale.deleteOne({ _id: request.params.id })
                .then( result => {
                    if( result.deletedCount === 1 ){
                        response.send({
                            status: "Record Deleted Successfully."
                        });
                    }
                });
            });
        } 
    })
});
//update all the sales status from pending to sold
router.patch('/',(request,response)=>{
    Sale.updateMany(
        { payment: request.body.payment }, 
        { $set: { status: 'sold'} })
    .then( result => {
        //save the payment after updating the sales
        let payment=request.body.paymentValue;
        let newSale = new Payment( payment );
        newSale.save().then( result => {
            response.send({ status: 'Payment Inserted Successfully!' });
        });
    });
})

module.exports=router;