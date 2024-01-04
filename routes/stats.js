var express = require("express");
var router = express.Router();
const User = require("../models/user");
const moment = require("moment");

router.post("/sendFeedback/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((user) => {
    user.Statistiques.push({
      Date: req.body.Date,
      Hydratation_quantity: req.body.Hydratation_quantity,
      Thirsty_feel: req.body.isThirsty,
      Energy_level: req.body.EnergyValue,
      Sleep_quality: req.body.SleepValue,
      Night_wakeup: req.body.NightWakeUp,
      No_sleep: req.body.insomnie,
      Morning_fatigue: req.body.morningFatigue,
      Motivation: req.body.MotivationValue,
      Training_feel: req.body.PhysicalValue,
      Training_injury: req.body.trainingInjury,
      Training_fatigue: req.body.muscleFatigue,
      Muscle_pain: req.body.musclePain,
      Bloating: req.body.bloating,
      Appetit_lack: req.body.appetiteLack,
      Hungry_feel: req.body.hungryFeel,
      Intestin_Pain: req.body.intestinPain,
    });

    user.save().then((data) => {
      res.json({ result: true, data });
    });
  });
});

router.get("/getFeedback/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((user) => {
    res.json({ result: true, data: user.Statistiques });
  });
});

module.exports = router;
