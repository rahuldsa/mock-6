const express = require("express");
const { flightModel } = require("../models/flightModel")

const flightRouter = express.Router();

// Get all Flights
flightRouter.get("/", async (req, res) => {
    try {
        const flights = await flightModel.find();
        res.status(200).send({ msg: "All Flights", flights });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Get Flights by flight id
flightRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const flight = await flightModel.findOne({ _id: id });
        res.status(200).send({ msg: "Flight Details ID", flight });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Register Flight
flightRouter.post("/", async (req, res) => {
    try {
        const payload = req.body;
        const flight = new flightModel(payload);
        await flight.save();
        res.status(201).send({ msg: "Flight Registered Successfully", flight });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Update Flight
flightRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const flight = await flightModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(204).send({ msg: "Flight Data Updated", flight });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Delete Flight
flightRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const flight = await flightModel.findByIdAndDelete({ _id: id });
        res.status(202).send({ msg: "Flight Deleted", flight });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

module.exports = { flightRouter };
