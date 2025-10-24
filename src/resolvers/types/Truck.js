import Driver from "../../models/Driver.js";
import Package from "../../models/Package.js";
export default {
    id: (t) => t._id,
    driver: async (t) => (t.driver ? await Driver.findById(t.driver).lean() : null),
    packages: async (t) => await Package.find({ truck: t._id }).lean()
};