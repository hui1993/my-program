var express = require('express');
var router = express.Router();
var Note = require('../model/note');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data;
  if(req.session.user){
    data = {
      isLogin: true,
      user: req.session.user
    }
  }else{
    data = {
      isLogin: false
    }
  }
  console.log(data)
  res.render('index', data);
})

router.get('/api/notes', function(req, res, next) {
  var opts = {raw: true}
  if(req.session && req.session.user){
    opts.where = {uid:req.session.user.id }
  }

  Note.findAll(opts).then(function(notes) {
    console.log(notes)
    res.send({status: 0, data: notes});
  }).catch(function(){
    res.send({ status: 1,errorMsg: '数据库异常'});
  });
});

/*新增note*/
router.post('/api/notes/add', function(req, res, next){
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }

	var note = req.body.note;
  var uid = req.session.user.id;
  var username = req.session.user.username;
  console.log(username)

  Note.create({text:note, uid:uid,name:username}).then(function(note){
    console.log("添加成功");
    res.send({status: 0,id:note.id});
  }).catch(function(){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

/*修改note*/
router.post('/api/notes/edit', function(req, res, next){
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var noteId = req.body.id;
  var note = req.body.note;
  var uid = req.session.user.id;
  console.log(note);

  Note.update({text: note}, {where:{id: noteId, uid: uid}}).then(function(lists){
    if(lists[0] === 0){
      return res.send({ status: 1,errorMsg: '你没有权限'});
    }
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

/*删除note*/
router.post('/api/notes/delete', function(req, res, next){
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  
  var noteId = req.body.id;
  var uid = req.session.user.id;
  Note.destroy({where:{id:noteId,uid:uid}}).then(function(deleteLen){
    if(deleteLen === 0){
      return res.send({ status: 1,errorMsg: '你没有权限'});
    }
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})


/* giehub登录 与注销*/
passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: 'c3ea52efe4165b023c60',
    clientSecret: '041cebcca27921e7c7c57ab0161018144966c3d6',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));

router.get('/auth/github',
  passport.authenticate('github'));
 
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });

router.get('/auth/logout',function(req, res){
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
                                                                                                                                                                                                                                                                                                                                                               