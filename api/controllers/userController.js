// Controller to handle the User Services.

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')

const User = require(userModel)

// Register New User and Add New Account to Mongo DB

// const registerUser = (User) => ({ fullName, email,  hash_password,  billingID, plan, endDate }) => {
//   if (!fullName || !email || !hash_password || !billingID || !plan) { 
//     throw new Error('There is some Missing Data. Please provide values for your fullname, email, password, billingID or plan') 
//   }

//   const user = new User({ fullName, email, hash_password, billingID, plan, endDate })
//   user.hash_password = bcrypt.hashSync(User.password, 10)
//   return user.save()
// }

// Add User
exports.register = function (req, res) {
  const addUser = new User(req.body);

  addUser.hash_password = bcrypt.hashSync(rec.body.password, 10)

  addUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      })
    } else {
      user.hash_password = undefined
      return res.json(user);
    }
  })
}

// Login User and Generate JWT Token
exports.login = function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
  });
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};

exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  }
  else {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const getUsers = (User) => () => {
  return User.find({})
}

// Current User
const getUserByEmail = (User) => async (email) => {
  return await User.findOne({ email })
}


const getUserByBillingID = (User) => async (billingID) => {
  return await User.findOne({ billingID })
}

const updatePlan = (User) => (email, plan) => {
  return User.findOneAndUpdate({ email, plan })
}

module.exports = (User) => {
  return {
    getUsers: getUsers(User),
    getUserByEmail: getUserByEmail(User),
    updatePlan: updatePlan(User),
    getUserByBillingID: getUserByBillingID(User)
  }
}