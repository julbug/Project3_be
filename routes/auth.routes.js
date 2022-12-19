const express = require('express');
const router = express.Router();
const User = require("../models/User.model")
const bcryptjs = require('bcryptjs');

//================SIGN-UP

router.post('/signup', (req, res, next)=>{
    const saltRounds = 12;
    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(req.body.password, salt))
    .then(hashedPassword => {
      // console.log(`Password hash: ${hashedPassword}`);
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })
      res.redirect('/')
    })
    .catch(error => next(error));
});


function serializeTheUserObject(userObj){
  let result = {};
  if(userObj.username) result.username = userObj.username;
  if(userObj.email) result.email = userObj.email;
  return result;
}


router.get('/serializeuser', (req, res, next)=>{
  console.log("Serialize-auth.js")
  console.log(req.session);
  // console.log(req.session.currentlyLoggedIn);

  if(!req.session.currentlyLoggedIn) res.json(null);

  User.findById(req.session.currentlyLoggedIn._id)
  .then((theUser)=>{
    res.json(serializeTheUserObject(theUser))
  })
  .catch((err)=>{
    (err)
  })
})

//=======================LOGIN
router.post('/login', (req, res, next) => {
  if (req.body.username === '' || req.body.email === '' || req.body.password === '') {
    req.flash('error', 'Please make sure to fill in all fields');
    res.redirect('/login');
    return;
  }
 
  User.findOne({ username: req.body.username })
    .then(resultFromDB => {
      if (!resultFromDB) {
        res.json('error')
        return;
      } else if (bcryptjs.compareSync(req.body.password, resultFromDB.password)) {
        // console.log("found user", resultFromDB);
        req.session.currentlyLoggedIn = resultFromDB;
        req.session.save();
        console.log("Login-auth.js")
        console.log(req.session);
        res.json(resultFromDB);
        return;
      } else {
        res.json('error');
      }
    })
    .catch(error => console.log(error));
});

//================ LOGOUT

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.json({ message: "successfully logged out" });
  });
});


//================ CHANGE PASSWORD

router.post('/new-password', (req, res, next)=>{

  if(req.body.newpass !== req.body.confirmnewpass){
  }

  User.findById(req.session.currentlyLoggedIn._id)
  .then(resultFromDB => {
     if (bcryptjs.compareSync(req.body.oldpass, resultFromDB.password)) {
      const saltRounds = 12;
      bcryptjs
      .genSalt(saltRounds)
      .then(salt => bcryptjs.hash(req.body.newpass, salt))
      .then(hashedPassword => {
        
        User.findByIdAndUpdate(req.session.currentlyLoggedIn._id, {
          password: hashedPassword
        })
        .then(()=>{

        })
      })
        .catch((err)=>{
          next(err);
        })
  }
})
})

module.exports = router;
