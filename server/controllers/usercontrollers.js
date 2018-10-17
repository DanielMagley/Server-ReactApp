var router = require("express").Router();
var User = require("../db").import("../models/users");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const ValidateSession = require("../middleware/validate-session");

router.post("/createuser", (req, res) => {
  // var username = req.body.user.username;
  // var email = req.body.user.email;
  // var pass = req.body.user.password;

  User.create({
    username: req.body.user.username,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 12)
  }).then(
    function createSuccess(user) {
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        user: user,
        message: "created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.post("/signin", (req, res) => {
  User.findOne({
    where: { email: req.body.user.email }
  }).then(
    user => {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          (err, matches) => {
            if (matches) {
              var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
              });
              res.json({
                user: user,
                message: "Authentication Successful",
                sessionToken: token
              });
            } else {
              res
                .status(502)
                .send({ error: "Shitty Matthew McConuaghey Movie" });
            }
          }
        );
      } else {
        res.status(500).send({ error: "Failed to Authenticate" });
      }
    },
    err => res.status(501).send({ error: "Shitty Matthew McConuaghey Movie" })
  );
});

module.exports = router;
