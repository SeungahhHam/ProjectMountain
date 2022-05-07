const express = require('express');
const { bordC } = require('../model/community');
const router = express.Router();
const { User } = require('../model/User');
const { auth } = require('../middleware/auth');

//인증게시판 생성
router.post('/init', auth, (req, res) => {
  const bord = new bordC(req.body)
  User.updateOne({email: req.user.email}, {$push: {bord: req.body._id}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      bord.save((err) => {
        if(err) return res.json({ success: false, err })
        else {
          bordC.updateOne({_id: req.body._id}, {$set: {nickname: req.user.nickname}}, function(error, docs){
            if(error){
                console.log(error);
            }else{
              res.send({success: true})
            }
        })
        }
      })
    }
  })
})
//인증게시판 댓글 추가
router.post('/commentIn', (req, res) => {
  bordC.updateOne({_id: req.body._id}, {$push: {comment: req.body.comment}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//인증게시판 댓글 리스트
let array = new Array();
router.post('/commentList', (req, res) => {
  bordC.findOne({ _id: req.body._id }, (err, result) => { 
    if (err) return res.status(500).send({error: 'failed'});
    res.send(result.comment)
  })
  array = []
})
//인증게시판 댓글 삭제
router.post('/commentOut', (req, res) => {
  bordC.updateOne({_id: req.body._id}, {$pull: {comment: req.body.comment}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//인증게시판 수정
router.post('/update', (req, res) => {
  bordC.updateOne({_id: req.body._id}, {$set: {title: req.body.title, text: req.body.text, imagepath: req.body.imagepath}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//인증게시판 리스트
router.get('/list', (req, res) => {
  bordC.find(function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//인증게시판 삭제
router.post('/delete', (req, res) => {
  bordC.deleteOne({_id: req.body.id}, function(err, result){
    if(error){
        console.log(error);
    }else{
      res.send("delete success")
    }
  })
})
//인증게시판 검색
router.post('/search', (req, res) => {
  bordC.find({ title: new RegExp('.*' + req.body.search + '.*')}, (err, docs) => {
    if (err) return res.status(500).send({error: 'failed'});
    else res.send(docs)
  })
})

module.exports = router