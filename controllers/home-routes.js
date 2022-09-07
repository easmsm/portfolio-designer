const router = require("express").Router();
const sequelize = require("../config/connection");
const { Project, User } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
  console.log("======================");
  User.findAll({
    attributes: [
      "username",
      "email",]
    //   { exclude: ['password'] }],
    // include: [{ model: Project }],
  })
    .then((dbUserData) => {
      const users = dbUserData.map((user) => user.get({ plain: true }));

      res.render("homepage", {
        users,
        // loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
    res.render("login");
}
)

router.get("/:username", (req, res) => {
  Project.findAll({
    where: {
      owner: req.params.username,
    }
    // include: [{ model: Project }],
  })
    .then((data) => {
      if (!data) {
        res.redirect("/login");
      }

      const projects = data.map((project) => project.get({plain: true}));
    //   res.send(projects);
      res.render("portfolio", {projects});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
