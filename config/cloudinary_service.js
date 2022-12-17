const cloudinaryPKG = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinaryPKG.config({
    cloud_name: "cloudbug"
    ,api_key: process.env.CLOUDAPI
    ,api_secret: process.env.CLOUDSECRET
  });

  var storageOBJ = new CloudinaryStorage({
    cloudinary: cloudinaryPKG,
    params: {
      folder: 'serviceImages',
      format: async (req, file) =>'jpeg' || 'png' || 'gif',
      public_id: (req, file) => file.originalname,
    },
  });
  
  const uploadCloud = multer({ storage: storageOBJ });
  
  module.exports = uploadCloud;