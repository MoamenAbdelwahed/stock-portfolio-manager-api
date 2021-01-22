let db = require('../models/index')
const bcrypt = require('bcrypt')

exports.login = (req, res) => {
  let params = []
  if(!req.body.email) {
    return res.status(400).send({
      message: "Email can not be empty"
    })
  }
  if(!req.body.password) {
    return res.status(400).send({
      message: "password can not be empty"
    })
  }
  params.push({
    email: req.body.email,
  })
  db.User.findAll({
    where: params
  }).then(users => {
    let selectedUser;
    users.forEach(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        selectedUser = user
      }
    })
    res.send(selectedUser);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users."
    })
  })
}
