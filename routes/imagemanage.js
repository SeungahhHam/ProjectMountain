const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require("aws-sdk");
const s3 = require('../config/s3');

const storage = multerS3({ 
    s3: s3,
    bucket: 'project-mountain-bucket',
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    acl: 'public-read', 
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname }) 
    },
    key: function (req, file, cb) { 
        if(file.fieldname  == 'u_img') //유저 프로필 이미지
            cb(null, `uImage/${Date.now()}_${file.originalname}`)
        if(file.fieldname  == 'b_img') //인증 게시판 이미지
            cb(null, `bImage/${Date.now()}_${file.originalname}`)
    },
})

upload = multer({ storage: storage });



router.post('/uploadUser', upload.single('u_img'), (req, res) => {
    try {
        res.status(200).send(req.file.location);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }   
})

router.post('/uploadBoard', upload.single('b_img'), (req, res) => {
    try {
        res.status(200).send(req.file.location);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }  
})

module.exports = router
