const mongoose=require('mongoose');
const saleSchema=new mongoose.Schema({
        payment:{
            type:String,
            required:true,
            trim:true
        },
        quantity:{
            type:Number,
            required:true,
            trim:true
        },
        
        datePuchased:{
            type:Date,
            required:true,
            trim:true
        },
        price:{
            type:Number,
            required:true,
            trim:true
        },
        status:{
            type:String,
            required:true,
            trim:true
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Sale',saleSchema)