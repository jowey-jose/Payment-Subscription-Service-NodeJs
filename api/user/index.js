const User = require('../models/userModel')
const UserService = require('../controllers/userController')

module.exports = UserService(User)