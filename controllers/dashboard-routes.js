const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User } = require('../models');
const Axios = require('axios');

router.get("/", (req, res) => {
    // console.log(req.session);
    Project.findAll({
        where: {
            owner: 'eclevela-1234'
        },
    //   //Query configuration
    //   attributes: [
    //     "id",
    //     "post_url",
    //     "title",
    //     "created_at",
    //     [
    //       sequelize.literal(
    //         "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
    //       ),
    //       "vote_count",
    //     ],
    //   ],
    //   order: [["created_at", "DESC"]],
    //   include: [
    //     {
    //       model: Comment,
    //       attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
    //       include: {
    //         model: User,
    //         attributes: ["username"],
    //       },
    //     },
    //     {
    //       model: User,
    //       attributes: ["username"],
    //     },
    //   ],
    })
      .then((dbPostData) => {
        const projects = dbPostData.map((post) => post.get({ plain: true }));
        res.render("dashboard", { projects, loggedIn: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;