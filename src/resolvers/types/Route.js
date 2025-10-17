import Warehouse from "../../models/Warehouse.js";

export default {
    id: (r) => r._id,
    warehouse: async (r) => (r.warehouse ? await Warehouse.findById(r.warehouse).lean() : null),
};
