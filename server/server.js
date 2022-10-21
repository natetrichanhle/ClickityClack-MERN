const cookieSession = require('cookie-session');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const express = require('express');
const cors = require("cors");
const app = express();
const stripe = require('./routes/stripe.routes')

require("./config/mongoose.config")

app.use(cookieSession({
    name: "session",
    keys: ["clickityclack"],
    maxAge: 24 * 60 * 60 * 100
}));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/stripe', stripe)

const UserRoutes = require("./routes/user.routes");
UserRoutes(app);
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000");
})