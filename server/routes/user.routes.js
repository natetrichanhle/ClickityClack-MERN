const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

// these are the routes that go to their respective functions in the controller
// best practice to put the routes with specific parameters (like _id) at the bottom and everything else at the top
module.exports = (app) => {
    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.get("/api/users/getloggedinuser", authenticate, UserController.getLoggedInUser);
    app.get("/api/logout", UserController.logout)
}
