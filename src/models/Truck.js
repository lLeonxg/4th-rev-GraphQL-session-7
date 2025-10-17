import mongoose from "mongoose";

const TruckSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    plate: { type: String, required: true, unique: true },
    status: { type: String, enum: [ "AVAILABLE", "IN_ROUTE", "MAINTENANCE" ] },
    capacityKg: { type: Number, required: true },
    driver: { type: String, ref: "Driver" },    // current driver
    packages: [{ type: String, ref: "Package" }] // current packages on the truck
});

export default mongoose.model("Truck", TruckSchema);