const cookieSession = require('cookie-session');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const express = require('express');
const cors = require("cors");
const app = express();

const stripe = require("stripe")('sk_test_51LrqvQIXvsVt6VeKiM3zKEkdt0S4pcxjf5ACWmYGHMXmicZvEkD6QRC9tngOUhZRObdDmVqA2dwOU2vDJyaC3UX800qyEN4cYr');

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
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

const UserRoutes = require("./routes/user.routes");
UserRoutes(app);
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000");
})