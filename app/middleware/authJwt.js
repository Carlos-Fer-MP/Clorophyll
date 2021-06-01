
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.user
const Role = db.role

verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({ message: 'token not provided' })
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'unauthorized!' })
    }
    req.userId = decoded.id
    next()
  })
}

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    Role.find({

      _id: { $in: user.roles }

    },
    (err, roles) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }
      res.status(403).send({ message: 'Require admin role' })
    }

    )
  })
}
isUser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    Role.find(
      {
        _id: { $in: user.roles }

      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'usuario') {
            next()
            return
          }
        }

        res.status(403).send({ message: 'Require User Role!' })
      }
    )
  })
}

const authJwt = {

  verifyToken,
  isAdmin,
  isUser

}
module.exports = authJwt
