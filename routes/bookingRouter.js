const express = require("express");
const { bookingModel } = require("../models/bookingModel")

const bookingRouter = express.Router();

bookingRouter.post("/", async (req, res) => {
    try {
        const payload = req.body;
        const booking = new bookingModel(payload);
        await booking.save();
        res.status(201).send({ msg: "Booking Registered", booking });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

module.exports = { bookingRouter };
