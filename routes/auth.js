const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

// SIGNUP ROUTE

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password"});
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password needs to have 8+ characters"});
  }

  User.findOne({ username: username })
    .then(found => {
      if (found) {
        return res.status(400).json({ message: "Username already taken "});
      }
      return bcrypt
        .genSalt()
        .then(salt => {
          return bcrypt.hash(password, salt);
        })
        .then(hash => {
          return User.create({ username: username, password: hash });
        })
        .then(newUser => { // .login() here is actually predefined passport method, logs in user automatically after signup
          req.login(newUser, err => {
            if (err) res.status(500).json(err);
            else res.json(newUser);
          });
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// LOGIN ROUTE

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => { // local argument here refers to local strategy in passport.js
    if (err) {
      return res.status(500).json({ message: "Error during authentication process "});
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials "});
    }
    req.login(user, err => { // saves user in current session
      if (err) res.status(500).json(err);
      res.json(user);
    });
  })(req, res, next);
});

// LOGOUT ROUTE

router.delete("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
});

// LOGGED IN ROUTE (checks who the user in the current session is)

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;




// CODE FROM IRONGENERATOR, CAN BE DELETED:

// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { "message": req.flash("error") });
// });

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/auth/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));

// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

// router.post("/signup", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   if (username === "" || password === "") {
//     res.render("auth/signup", { message: "Indicate username and password" });
//     return;
//   }

//   User.findOne({ username }, "username", (err, user) => {
//     if (user !== null) {
//       res.render("auth/signup", { message: "The username already exists" });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const newUser = new User({
//       username,
//       password: hashPass
//     });

//     newUser.save()
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch(err => {
//       res.render("auth/signup", { message: "Something went wrong" });
//     })
//   });
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

