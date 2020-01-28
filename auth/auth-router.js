const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const session = require('express-session');

const Users = require("../users/user-model");
const protected = require("../auth/auth-middleware");


router.post('/register', validate, (req, res) => {
    let userData = req.body;
    const hash = bcrypt.hashSync(userData.password, 8);
    userData.password = hash;

    Users.add(userData)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Failed to create new user '})
    })
});


router.post('/login', validate, (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) { 
            req.session.user = user;
            res.status(200).json({ message: `${user.username} Logged In!` });
        } else {
            res.status(401).json({ message: 'You Shall Not Pass!' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Failed to retrieve credentials '});
    })
});

router.get('/logout', protected, (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.send('error logging out');
        } else {
          res.send('good bye');
        }
      });
    }
  });



function validate(req, res, next) {
    const data = req.body;
    if(!data) {
        res.status(400).json({ error: 'missing username and password' })
    } else if (!data.username){
        res.status(400).json({ error: 'missing required username' })
    } else if (!data.password) {
        res.status(400).json({error: 'missing required password'})
    } else {
        next()
    }
}

module.exports = router; 