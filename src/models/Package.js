import mongoose from "mongoose";

 const AddressSchema = new mongoose.Schema({
   line1: { type: String, required: true },
   city: { type: String, required: true },
   zone: { type: String, required: true }
}, { _id: false });

const PackageSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    trackingId: { type: String, required: true, unique: true },
    weightKg: { type: Number, required: true },
    status: { type: String, required: true, enum: ["PENDING", "IN_TRANSIT", "DELIVERED"] ,default: "PENDING"},
    destination: { type: AddressSchema, required: true },
    truck: { type: String, ref: "Truck" },
    route: { type: String, ref: "Route" },
});

export default mongoose.model("Package", PackageSchema);