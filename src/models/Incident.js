import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  type: {type: String, enum:["DELAY", "BREAKDOWN", "ACCIDENT","TRAFFIC"], required: true},
  severity: {type: String, enum:["LOW", "MEDIUM", "HIGH","CRITICAL"], required: true},
  message: {type: String, required: true},
  timestamp: {type: Date, default: Date.now, required: true,default: () => new Date()},
  status: {type: String, enum:["OPEN", "IN_PROGRESS", "RESOLVED"], required: true, default: "OPEN"},
  driver: {type: String, ref: 'Driver', required: true},
  truck: {type: String, ref: 'Truck', required: true}
}, { timestamps: true }
);

export default mongoose.model('Incident', incidentSchema);
