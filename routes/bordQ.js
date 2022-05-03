const express = require('express');
const { bordQ } = require('../model/community');
const router = express.Router();
const { User } = require('../model/User');
const { auth } = require('../middleware/auth');

//질문게시판
router.post('/init', auth, (req, res) => {
  const bord = new bordQ(req.body)
  User.updateOne({email: req.user.email}, {$push: {bord: req.body._id}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      bord.save((err) => {
        if(err) return res.json({ success: false, err })
        else {
          bordQ.updateOne({_id: req.body._id}, {$set: {nickname: req.user.nickname}}, function(error, docs){
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
//질문게시판 댓글 추가
router.post('/commentIn', (req, res) => {
  bordQ.updateOne({_id: req.body._id}, {$push: {comment: req.body.comment}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//질문게시판 댓글 삭제
router.post('/commentOut', (req, res) => {
  bordQ.updateOne({_id: req.body._id}, {$pull: {comment: req.body.comment}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//질문게시판 수정
router.post('/update', (req, res) => {
  bordQ.updateOne({_id: req.body._id}, {$set: {title: req.body.title, text: req.body.text}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//질문게시판 리스트
router.get('/list', (req, res) => {
  bordQ.find(function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//질문게시판 삭제
router.post('/delete', (req, res) => {
  bordQ.deleteOne({_id: req.body.id}, function(err, result){
    if(error){
        console.log(error);
    }else{
      res.send("delete success")
    }
  })
})
//질문게시판 검색
router.post('/serch', (req, res) => {
  bordQ.find({ title: new RegExp('.*' + req.body.search + '.*')}, (err, docs) => {
    if (err) return res.status(500).send({error: 'failed'});
    else res.send(docs)
  })
})

module.exports = router