import mongoose from "mongoose";

 const AddressSchema = new mongoose.Schema({
   line1: { type: String, required: true },
   city: { type: String, required: true },
   zone: { type: String, required: true }
}, { _id: false });

const WarehouseSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: AddressSchema, required: true },
});

export default mongoose.model("Warehouse", WarehouseSchema);