const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/parkingDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const bookingSchema = new mongoose.Schema({
  slotNumber: String,
  vehicleNumber: String,
  entryTime: String,
  exitTime: String,
  fee: Number,
});

const Booking = mongoose.model("Booking", bookingSchema);

const slots = [
  { id: 1, slotNumber: "A1", status: "Available" },
  { id: 2, slotNumber: "A2", status: "Occupied" },
  { id: 3, slotNumber: "A3", status: "Available" },
  { id: 4, slotNumber: "A4", status: "Available" },
  { id: 5, slotNumber: "A5", status: "Occupied" },
  { id: 6, slotNumber: "A6", status: "Available" },
];

app.get("/", (req, res) => {
  res.send("Parking API Running");
});

app.get("/api/slots", (req, res) => {
  res.json(slots);
});

app.post("/api/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);

    await booking.save();

    res.json({
      success: true,
      message: "Booking Saved to MongoDB",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/api/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});