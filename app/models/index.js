
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.url = 'mongodb://localhost:27017/Clorophyll'

db.Productos = require('./model.js')(mongoose)

db.user = require('./user.model')
db.role = require('./role.model')

db.ROLES = ['user', 'admin']

module.exports = db
