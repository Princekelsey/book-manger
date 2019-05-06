const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const keys = require("../../config/keys");
const passport = require("passport");

// load input validaton
const validateSignUpInput = require("../../validation/signUp");
const validateSignInInput = require("../../validation/signIn");

// load user model
const User = require("../../models/User");

// @route GET api/users/test
// @desc  Test users route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "User works" }));

// @route Post api/users/register
// @desc  register new users
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);
  // validate inputs
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc  user login and JWT Token generating
// @access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateSignInInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email }).then(user => {
    // check for the user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payLoad = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payLoad,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = "password incorect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc  get current(registered) user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;
