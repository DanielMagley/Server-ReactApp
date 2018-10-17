const router = require("express").Router();
const sequelize = require("../db");
const AnytimeModel = sequelize.import("../models/conditionals");
const ConsequenceModel = sequelize.import("../models/consequence");
const ValidateSession = require("../middleware/validate-session");

router.post("/one", (req, res) => {
  res.send("Hey.");
});

//-----Table for "Conditional - Anytime you...."
router.post("/conditional", ValidateSession, (req, res) => {
  var anytimeData = req.body.anytimedata.conditional;
  var userId = req.user.id;

  AnytimeModel.create({
    anytimedata: anytimeData,
    userid: userId
  }).then(dataFromDatabase => res.send("Condition was added"));
});

router.get("/conditional", ValidateSession, (req, res) => {
  var userId = req.user.id;

  AnytimeModel.findAll({
    where: { userid: userId }
  }).then(condition => res.json(condition));
});

router.delete("/conditional/:id", ValidateSession, (req, res) => {
  const data = req.params.id;
  // const userid = req.user.id;

  AnytimeModel.destroy({
    where: { id: data }
  }).then(
    (deleteLogSuccess = data => {
      res.send("conditonal removed");
    }),
    (deleteLogErr = err => {
      res.send(500, err.message);
    })
  );
});

router.put("/conditional/:id", ValidateSession, (req, res) => {
  const data = req.params.id;
  const anytimedata = req.body.anytimedata.conditional;

  AnytimeModel.update(
    {
      anytimedata: anytimedata
    },
    { where: { id: data } }
  ).then(
    (updateSuccess = updatedCondition => {
      res.json({
        anytimedata: anytimedata
      });
    }),
    (updateErr = err => {
      res.send(500, err.message);
    })
  );
});

//-----Table for "Consequences"
router.post("/consequence", ValidateSession, (req, res) => {
  var consequenceData = req.body.consequencedata.consequence;
  var userId = req.user.id;

  ConsequenceModel.create({
    consequencedata: consequenceData,
    userid: userId
  }).then(dataFromDatabase => res.send("Consequence was added"));
});

router.get("/consequence", ValidateSession, (req, res) => {
  var userId = req.user.id;

  ConsequenceModel.findAll({
    where: { userid: userId }
  }).then(cons => res.json(cons));
});

router.delete("/consequence/:id", ValidateSession, (req, res) => {
  const data = req.params.id;
  // const userid = req.user.id;

  ConsequenceModel.destroy({
    where: { id: data }
  }).then(
    (deleteLogSuccess = data => {
      res.send("consequence removed");
    }),
    (deleteLogErr = err => {
      res.send(500, err.message);
    })
  );
});

router.put("/consequence/:id", ValidateSession, (req, res) => {
  const data = req.params.id;
  var consequencedata = req.body.consequencedata.consequence;

  ConsequenceModel.update(
    {
      consequencedata: consequencedata
    },
    { where: { id: data } }
  ).then(
    (updateSuccess = updatedCondition => {
      res.json({
        consequencedata: consequencedata
      });
    }),
    (updateErr = err => {
      res.send(500, err.message);
    })
  );
});

//---------------------CARD FUNCTIONS--------------------------------------------
router.get("/conditional-card", (req, res) => {
  AnytimeModel.find({
    order: [sequelize.fn("RANDOM")]
  }).then(poop => res.json(poop));
});

router.get("/consequence-card", (req, res) => {
  ConsequenceModel.find({
    order: [sequelize.fn("RANDOM")]
  }).then(cons => res.json(cons));
});

module.exports = router;
