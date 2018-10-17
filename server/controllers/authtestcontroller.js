var router = require("express").Router();
var sequelize = require("../db");
var User = sequelize.import("../models/users");
var AuthConsequencesModel = sequelize.import("../models/authConsequences");

router.get("/getall", (req, res) => {
  const userId = req.user.userId;

  AuthConsequencesModel.findAll({
    where: { owner: userId }
  }).then(
    (findAllSuccess = data => {
      res.json(data);
    }),
    (findAllError = err => {
      res.send(500, err.message);
    })
  );
});

router.post("/create", (req, res) => {
  const owner = req.user.userId;
  var authConsequencesData = req.body.authConsequencesdata.item;

  AuthConsequencesModel.create({
    authConsequencesdata: authConsequencesData,
    owner: owner
  }).then(
    (createSuccess = authConsequencesdata => {
      res.json({
        authConsequencesdata: authConsequencesdata
      });
    })
  );
});
