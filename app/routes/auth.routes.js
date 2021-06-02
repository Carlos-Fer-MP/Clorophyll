
const verifySignUp = require('../middleware/verifySignUp')
const controller = require('../controllers/auth.controller')
const router = require('express').Router()

module.exports = function () {
  router.use((req, res, next) => {
    res.header(

      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'

    )
    next()
  })

  router.post('/api/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup)
  router.post('/api/auth/signin', controller.signin)
}
