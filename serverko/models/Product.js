const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    product:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    productImage:{
        type:String,
        required:true,
        trim:true
    },
    stock:{
        type:Number,
        required:true,
        trim:true
    },
    expiryDate:{
        type:Date,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Product',productSchema)