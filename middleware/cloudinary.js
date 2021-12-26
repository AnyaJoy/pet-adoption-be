var cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(req, res, next) {
  if (req.file) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          req.body.picture = result.secure_url;
          fs.unlinkSync(req.file.path);
          next();
        }
      });
    });
  } else {
    next();
  }
}

module.exports = { uploadToCloudinary };
