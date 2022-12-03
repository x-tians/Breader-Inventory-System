const mongoose=require('mongoose');
const paymentSchema=new mongoose.Schema({
    payment:{
        type:String,
        required:true,
        trim:true
    },
    value:{
        type:Number,
        required:true,
        trim:true
    }
},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Payment',paymentSchema)