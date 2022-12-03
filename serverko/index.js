const express=require('express')
const cors=require('cors');
const mongoose=require('mongoose');
const port=8080;
const bodyParser=require('body-parser');
const userRouter=require('./routes/users');
const loginRouter=require('./routes/auths');
const uploadImage=require('./routes/uploads');
const fileUpload = require('express-fileupload');
const sales=require('./routes/sales');
const product=require('./routes/products')
var nodemailer = require('nodemailer');


//midddleware
const morgan=require('morgan');
const server=express();
server.use(fileUpload({
    limits: {
        fileSize: 10000000, // limit the uploaded image Around 10MB
    },
    abortOnLimit: true,
}));
server.use(express.static('Uploads/'))
server.use(cors());
server.use(bodyParser.json());
server.use('/api/v1/users',userRouter);
server.use('/api/v1/auths',loginRouter);
server.use('/api/v1/uploads',uploadImage);
server.use('/api/v1/products',product);
server.use('/api/v1/sales',sales);
server.use(morgan('dev'));

// Database connection
mongoose.connect('mongodb://localhost:27017/breaderdb');
const con =mongoose.connection;
con.once('open',()=>{
    console.log('database connection successful')
})


server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})



const sendEmail=()=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'iponchito898@gmail.com',
          pass: 'frexrmedfzhoyzgz'
        }
      });
      
      var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'langawancristian@gmail.com',
        subject: 'Sending Email using Node.js',
        //text: '<h1>That was easy!</h1>'
        html: '<h1>Welcome</h1><p>That was easy!</p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

//sendEmail();