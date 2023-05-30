const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const connection = require("./config/db");
const { userModel } = require("./models/userModel");
const { flightModel } = require("./models/flightModel");
const { bookingModel } = require("./models/bookingModel");
const { flightRouter } = require("./routes/flightRouter");
const { bookingRouter } = require("./routes/bookingRouter");
const { authenticator } = require("./middleware/authenticator");

const app = express();
app.use(express.json());

app.use("/api/flights", flightRouter);
app.use("/api/booking", bookingRouter);

app.get("/", (req, res) => {
    res.send("Air Ticket Booking App - Welcome To The Home page");
});

// Register Users
app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.hash(password, +process.env.salt, async function (err, hash) {
            if (err) {
                console.error(err);
                res.status(500).send({ err: "Something went wrong" });
            } else {
                const user = new userModel({ name, email, password: hash });
                await user.save();
                res.status(201).send({ msg: "User Registered Successfully", user });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Login Users
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, async function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.secret);
                    res.send({ msg: "Login Successfull", user, token });
                } else {
                    res.send({ err: "Wrong Credentials" });
                }
            });
        } else {
            res.send({ err: "User Not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Booking Create
app.post("/api/booking", async (req, res) => {
    const payload = req.body;
    try {
        const booking = new bookingModel(payload);
        await booking.save();
        res.status(201).send({ msg: "Booking Registered", booking });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Dashboard Page
app.get("/api/dashboard", async (req, res) => {
    try {
        const bookings = await bookingModel.find();
        res.status(200).send({ msg: "All Bookings", bookings });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

app.use(authenticator);

app.use("/test", (req, res) => {
    res.send(req.body);
});

app.listen(process.env.PORT, async () => {
    console.log(`Server runs at  ${process.env.PORT}`);
    try {
        await connection;
        console.log("Connected to the database");
    } catch (error) {
        console.log(error);
    }
});
