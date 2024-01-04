var express = require("express");
var router = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const { checkBody } = require("../modules/checkBody");

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "password", "email"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email.toLowerCase() }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email.toLowerCase(),
        password: hash,
        token: uid2(32),
      });

      newUser.save().then((newDoc) => {
        res.json({
          result: true,
          token: newDoc.token,
          username: newDoc.username,
        });
      });
    } else {
      res.json({ result: false, error: "User already exists" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email.toLowerCase() }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token, username: data.username });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

router.post("/favRecipe", (req, res) => {
  User.findOne({ token: req.body.token }).then((data) => {
    if (data) {
      res.json({ result: true, fav: data.FavRecipe_id });
    } else {
      res.json({ result: false });
    }
  });
});

router.post("/addFavRecipe", (req, res) => {
  User.updateOne(
    { token: req.body.token },
    { FavRecipe_id: req.body.recipeId }
  ).then((data) => {
    res.json({ result: true, fav: data.FavRecipe_id });
  });
});

router.put("/newmail/:token", (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() }).then((data) => {
    if (
      data &&
      bcrypt.compareSync(req.body.password, data.password) &&
      req.body.newemail
    ) {
      User.find({ email: req.body.newemail.toLowerCase() }).then(
        (newEmailData) => {
          if (newEmailData.length > 0) {
            // Si la nouvelle adresse e-mail existe déjà, renvoyer une erreur
            res.json({
              result: false,
              message: "Cette adresse e-mail est déjà utilisée.",
            });
          } else {
            User.updateOne(
              { token: req.params.token, email: req.body.email.toLowerCase() },
              { email: req.body.newemail.toLowerCase() }
            ).then((data) => {
              res.json({ result: data });
            });
          }
        }
      );
    } else {
      res.json({ result: false });
    }
  });
});

router.put("/newpassword/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      const newPasswordHach = bcrypt.hashSync(req.body.newpassword, 10);
      User.updateOne(
        { token: req.params.token },
        { password: newPasswordHach }
      ).then((data) => {
        console.log(data);
        res.json({ result: data });
      });
    } else {
      res.json({
        result: false,
        message: "Informations d'identification incorrectes.",
      });
    }
  });
});

router.put("/newpassword/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
      User.updateOne(
        { token: req.params.token },
        { password: newPassword }
      ).then(() => {
        res.json({ result: true });
      });
    } else {
      res.json({ result: false, message: "Mot de passe incorrect" });
    }
  });
});

module.exports = router;

module.exports = router;
