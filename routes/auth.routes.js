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
      console.log(`Password hash: ${hashedPassword}`);
      User.create({
        username: req.body.username,
        password: hashedPassword,
    })
      res.redirect('/')
    })
    .catch(error => next(error));
});

//=======================LOGIN
router.post('/login', (req, res, next) => {
  if (req.body.username === '' || req.body.password === '') {
    //line 36 new
    req.flash('error', 'Please make sure to fill in both fields');
    res.redirect('/login');
    return;
  }
 
  User.findOne({ username: req.body.username })
    .then(resultFromDB => {
      if (!resultFromDB) {
        //line 45 new 
        req.flash('error', 'could not find that username')
        res.redirect('/login');
        return;
      } else if (bcryptjs.compareSync(req.body.password, resultFromDB.password)) {
        console.log("found user", resultFromDB);
        req.session.currentlyLoggedIn = resultFromDB;
        console.log(req.session);
        // line 53 new
        req.flash('success', 'Successfully Logged In as ' + resultFromDB.username);
        res.redirect('/profile');
        return;
      } else {
        //line 58 new
        req.flash('error', 'this username/password combination could not be authenticated. please try again');
        res.redirect('/login');
      }
    })
    .catch(error => console.log(error));
});


//================ CHANGE PASSWORD

router.post('/new-password', (req, res, next)=>{

  if(req.body.newpass !== req.body.confirmnewpass){
    res.redirect("/profile")
    // need to show an error message here but cant yet
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
          res.redirect('/profile');

        })
      })
        .catch((err)=>{
          next(err);
        })
  }
})
})

module.exports = router;