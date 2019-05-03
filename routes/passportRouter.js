const express = require('express')
const passportRouter = express.Router()
// Require user model
const User = require('../models/usersSchema')
// Add bcrypt to encrypt passwords
const bcrypt = require('bcrypt')
const bcryptSalt = 10
// Add passport
const passport = require('passport')

passportRouter.get('/login', (req, res, next) => {
  console.log('inside here')
  res.render('passport/login')
})

passportRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'passport/login',
  passReqToCallback: true
}))

passportRouter.get('/signup', (req, res, next) => {
  res.render('/signup')
})

passportRouter.post('/signup', (req, res, next) => {
  const { username, password } = req.body

  if (username === '' || password === '') {
    res.render('/signup', { message: 'Indicate username and password' })
    return
  }

  User.findOne({ username })
    .then((user) => {
      if (user !== null) {
        res.render('/signup', { message: 'The username already exists' })
        return
      }

      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)

      const newUser = new User({ username, password: hashPass })

      newUser.save((err) => {
        if (err) res.render('/signup', { message: 'Something went wrong' })
        else res.redirect('/')
      })
    })
    .catch(error => next(error))
})

const ensureLogin = require('connect-ensure-login')

passportRouter.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('passport/private', { user: req.user })
})

module.exports = passportRouter
