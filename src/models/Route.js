import mongoose from "mongoose";
const RouteSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    distanceKm: { type: Number, required: true },
    etaMinutes: { type: Number, required: true },
    warehouse: { type: String, ref: "Warehouse", required: true }
});

export default mongoose.model("Route", RouteSchema);