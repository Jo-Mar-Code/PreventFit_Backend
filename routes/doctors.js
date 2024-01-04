var express = require("express");
var router = express.Router();
require("../models/connection");
const Doctor = require("../models/doctor");

// route get all the doctors
router.get("/", (req, res) => {
  Doctor.find({})
    .then((data) => {
      if (data && data.length > 0) {
        res.json({ result: true, data });
      } else {
        res.json({ result: false, message: "Aucun médecin trouvé." });
      }
    })
    .catch((error) => {
      res.status(500).json({ result: false, error: error.message });
    });
});

// route get by profession

router.get("/byProfession/:Profession", (req, res) => {
  Doctor.find({ Profession: req.params.Profession }).then((data) => {
    if (data) {
      res.json({ result: true, data });
    } else {
      res.json({ result: false });
    }
  });
});

// route get by city

router.get("/byCity/:City", (req, res) => {
  Doctor.find({ City: req.params.City }).then((data) => {
    if (data) {
      res.json({ result: true, data });
    } else {
      res.json({ result: false });
    }
  });
});

// route get by  profession/city
router.get("/byCityOrPro/:City/:Profession", (req, res) => {
  const { City, Profession } = req.params;
  Doctor.find({ City, Profession }).then((data) => {
    if (data) {
      res.json({ result: true, data });
    } else {
      res.json({ result: false });
    }
  });
});
// route get by id

module.exports = router;
