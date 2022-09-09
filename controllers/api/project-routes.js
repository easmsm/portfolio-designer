const router = require("express").Router();
const { response } = require("express");
const sequelize = require("../../config/connection");
const { Project, User } = require("../../models");
const Axios = require('axios');
const { update } = require("../../models/project");
const { data } = require("connect-session-sequelize/lib/model");

// Check if user exists in database and display projects
router.get("/:username", (req, res) => {
  User.findOne({
    where: {
      username: req.params.username,
    },
    include: [{ model: Project }],
  })
    .then((data) => {
      if (!data) {
        Axios.get(`https://gh-pinned-repos.egoist.sh/?username=${req.params.username}`)
        .then(r => {
            res.send(r.data)
        })
      }
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json(err);
    });
});
// FOR A GIVEN USERNAME, fetch the data from the API, Update db data.
router.post('/update', async (req,res) => {
  const axiosResponse = await Axios.get(`https://gh-pinned-repos.egoist.sh/?username=danielcnow`)
  const projectdata = axiosResponse.data
  const recordsToUpdate = projectdata.map((data) => {
    return {
      owner: data.owner,
      link: data.link,
      language: data.language,
      languageColor: data.languageColor,
      stars: data.stars, }
  })
const updateRes= await Project.bulkCreate(recordsToUpdate, {where :{
  repo: data.repo
}})
console.log(updateRes)
return res.send(200)
  // const updateRes = await Project.update({
  //                   owner: projectdata.owner,
  //                   link: projectdata.link,
  //                   language: projectdata.language,
  //                   languageColor: projectdata.languageColor,
  //                   stars: projectdata.stars, 
  //                 }, {where: {
  //                   repo: projectdata.repo,
  //                 }}
  //                 )
  //                 console.log (updateRes)
  //                 return res.send(200)
//         .then(async r => {
//             console.log(r)
//             projectsUpdate = r.data
//             for (let i = 0; i < projectsUpdate.length; i++) {
//               const projectdata = projectsUpdate[i]
//              await Project.update({
//                 owner: projectdata.owner,
//                 link: projectdata.link,
//                 language: projectdata.language,
//                 languageColor: projectdata.languageColor,
//                 stars: projectdata.stars, 
//               }, {where: {
//                 repo: projectdata.repo,
//               }}
//               )
//         }}
// ).catch(err => {
//   console.log(err);
//   res.status(500).json(err);
// })
});

router.post('/', (req, res) => {
  Project.create({
    owner: req.body.owner,
    repo: req.body.repo,
    link: req.body.link,
    language: req.body.language,
    languageColor: req.body.languageColor,
    stars: req.body.stars,
  })
  .then(dbProjectData => res.json(dbProjectData))
  .catch(err => {
    // console.log(err);
    res.status(500).json(err);
  })
})

module.exports = router;