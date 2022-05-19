const express = require('express');
const router = express.Router();
const { User } = require("../model/User");
const { auth } = require('../middleware/auth');
const Commu = require('../model/community');
const Commu_schema =[
  Commu.bordC,
  Commu.bordF,
  Commu.bordQ
]
const Mount = require('../model/Mountain.js');
const Mount_loc_schema = 
[   Mount.mountainSeoul, 
    Mount.mountainBusan, 
    Mount.mountainDaegu, 
    Mount.mountainIncheon, 
    Mount.mountainGwangju, 
    Mount.mountainDaejeon, 
    Mount.mountainUlsan,
    Mount.mountainGyeonggi,
    Mount.mountainGangwon,
    Mount.mountainChungcheongbuk,
    Mount.mountainChungcheongnam,
    Mount.mountainJeonbuk,
    Mount.mountainJeonnam,
    Mount.mountainGyeongbuk,
    Mount.mountainGyeongnam,
    Mount.mountainJeju
]


router.post('/register', (req, res) => {
  //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
  //그것들을  데이터 베이스에 넣어준다. 
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) {
      res.json({ success: false, err })
    }
    return res.status(200).json({
        success: true
    })
  })
})

router.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
  
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
  
        //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
  
        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, 
            token: user.token,
            nickname: user.nickname ,
            userImage: user.userImage
          })
      })
    })
  })
})

//프로필 이미지 업데이트
router.post('/updateImage', auth, (req, res) => {
  console.log(req.body.userImage)
  User.updateOne({$set: {userImage: req.body.userImage}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})

router.post('/auth', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    nickname: req.user.nickname,
    phone: req.user.phone,
    description: req.user.description,
    userImage: req.user.userImage,
    keyword: req.user.keyword,
    badge: req.user.badge,
    badgeProgress: req.user.badgeProgress,
    level: req.user.level
  })
})

router.post('/badgeInfo', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  for (let i = 0; i < req.user.badge.length; i++) {     

    //리스트에서 뽑은 id가 지역별 collection에 있는지 확인
    for(let j = 0; j < 15; j++){
        Mount_loc_schema[j].find({ mntnid: req.user.badge[i]}, (err, docs) => {
            if (err) return res.status(500).send({error: 'failed'});
            if(docs.length != 0){
              if(array.includes(docs.mntnid) != true)
                array = array.concat(docs);
            } 
        })
    }
    //마직막 지역별 collection에 있는지 확인 후 전송
    Mount_loc_schema[15].find({ mntnid: req.user.badge[i]}, (err, docs) => {
        if (err) return res.status(500).send({error: 'failed'});
        if(docs.length != 0) {
          if(array.includes(docs.mntnid) != true)
            array = array.concat(docs);
        }
        if(i == req.user.badge.length - 1) res.json(array);
    })
  }
})

let array = new Array();
router.post('/bord', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  if(req.user.bord.length == 0) res.json(array) //게시물이 없는 경우
  for (let i = 0; i < req.user.bord.length; i++) {     
    //user가 쓴 bordR가 있는지 확인
    Commu_schema[3].find({ _id: req.user.bord[i]}, (err, docs) => {
      if (err) return res.status(500).send({error: 'failed'});
      if(docs.length != 0) array = array.concat(docs);
    })
    //user가 쓴 bordF가 있는지 확인
    Commu_schema[1].find({ _id: req.user.bord[i]}, (err, docs) => {
      if (err) return res.status(500).send({error: 'failed'});
      if(docs.length != 0) array = array.concat(docs);
    })
    //user가 쓴 bordQ가 있는지 확인 후 전송
    Commu_schema[2].find({ _id: req.user.bord[i]}, (err, docs) => {
      if (err) return res.status(500).send({error: 'failed'});
      if(docs.length != 0) array = array.concat(docs);

      if(i == req.user.bord.length - 1) res.json(array);
    })
  }
  array = []
})

//인증 게시판 확인
router.post('/bordC', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  if(req.user.bord.length == 0) res.json(array) //게시물이 없는 경우
  for (let i = 0; i < req.user.bord.length; i++) {     
    //user가 쓴 bordC가 있는지 확인 후 전송
    Commu_schema[0].find({ _id: req.user.bord[i]}, (err, docs) => {
      if (err) return res.status(500).send({error: 'failed'});
      if(i == req.user.bord.length - 1) res.send(docs)
      
    })
  }
  array = []
})

router.post('/logout', auth, (req, res) => {
  //loc 삭제
  map.mapSchema.deleteOne({token: req.body.token}, (err, result) => {
    if(err) console.log(err)
    else console.log('delete')
  })
  //token 삭제
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.status(500).json({ success: false, err }); 
      return res.status(200).send({
        success: true
      })
    })
})

module.exports = router
