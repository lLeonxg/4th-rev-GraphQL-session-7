import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    license: { type: String, required: true },
    assignedTruck: { type: String, ref: "Truck" },
});

export default mongoose.model("Driver", DriverSchema);
