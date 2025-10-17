import Truck from "../../models/Truck.js";

export default {
    id: (d) => d._id,
    assignedTruck: async (d) => (d.assignedTruck ? await Truck.findById(d.assignedTruck).lean() : null)
};