const express = require("express");
const router = express.Router();
const Bus = require("../models/bus");

// Test route
router.get("/test", (req, res) => res.send("Bus routes working"));

// Add a new bus
router.post("/", (req, res) => {
    Bus.create(req.body)
        .then(() => res.json({ msg: "Bus added successfully" }))
        .catch(() => res.status(400).json({ msg: "Failed to add bus" }));
});

// Get all buses
router.get("/", (req, res) => {
    Bus.find()
        .then((buses) => res.json(buses))
        .catch((err) => res.status(400).json({ msg: "No buses found" }));
});

// Get a single bus by ID
router.get("/:id", (req, res) => {
    Bus.findById(req.params.id)
        .then((bus) => res.json(bus))
        .catch(() => res.status(400).json({ msg: "Bus not found" }));
});

// Update a bus by ID
router.put("/:id", (req, res) => {
    Bus.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ msg: "Bus updated successfully" }))
        .catch(() => res.status(400).json({ msg: "Failed to update bus" }));
});

// Delete a bus by ID
router.delete("/:id", (req, res) => {
    Bus.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Bus deleted successfully" }))
        .catch(() => res.status(400).json({ msg: "Failed to delete bus" }));
});

module.exports = router;
