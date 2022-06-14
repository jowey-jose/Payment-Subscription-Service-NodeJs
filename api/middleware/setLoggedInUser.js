// Call the function to find user by email address to set Current User.

// Todo: Ensure current User has generated JWT in the Session for security.

const UserService = require('../user')

module.exports = async function setCurrentUser(req, res, next) {
    const { email } = req.session

    if (email) {
        user = await UserService.getUserByEmail(email)

        req.user = user
        next()
    } else {
        res.redirect('/')
    }
}