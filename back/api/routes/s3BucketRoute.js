var aws = require('aws-sdk');
require('dotenv').config({
  path: `${__dirname}/.env`
}); // loads .env file in current dir

aws.config.update({
  region: 'eu-west-3',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

const S3_BUCKET = process.env.bucket

module.exports = function(router) {
  router.post("/api/sign_s3", (req, res) => {
    const s3 = new aws.S3();  // Create a new instance of S3
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;// Set up the payload of what we are sending to the S3 api
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 500,
      ContentType: fileType,
      ACL: 'public-read'
    }
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        res.json({success: false, error: err})
      }   
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      // Send it all back    
      res.json({success:true, data:{returnData}});
    });
  })
}
