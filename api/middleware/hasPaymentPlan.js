// Middleware Function to check payment plan associated with a particular User.

module.exports = function hasPaymentPlan(plan) {
    return async (req, res, next) => {
        if (req.user && req.user.plan == plan) {
            next()
        } else {
            res.status(401).send('Unauthorized')
        }
    }
}