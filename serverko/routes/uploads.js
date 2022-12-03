const express=require('express');
const router=express.Router();
const isImage=require('is-image');

//uploads the images for the users and products
router.post('/', (request, response) => {
   if (/^image/.test(request.files.selectedFile.mimetype)){
        request.files.selectedFile.mv(`./Uploads/${request.body.status}/${request.files.selectedFile.name}`);
        response.send({msg:"Image Uploaded Successfully",name:request.files.selectedFile.name});
   }
    
});

module.exports=router;