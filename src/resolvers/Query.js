import Truck from "../models/Truck.js";
import Warehouse from "../models/Warehouse.js";
import Route from "../models/Route.js";
import Package from "../models/Package.js";

export default {
    async trucks(_, { filter = {} }) {
        const q = {};
        if (filter.status) q.status = filter.status;
        if (filter.driverId) q.driver = filter.driverId;
        if (filter.plate) q.plate = filter.plate;

        // Obtener todos los trucks que cumplen los filtros iniciales
        let trucks = await Truck.find(q).lean();

        if (filter.zone) {
            // Buscar warehouses en la zona
            const whs = await Warehouse.find({ "location.zone": filter.zone }).select("_id").lean();
            if (!whs.length) return [];

            const whIds = whs.map(w => w._id);

            // Buscar rutas asociadas a esos warehouses
            const routes = await Route.find({ warehouse: { $in: whIds } }).select("_id").lean();
            if (!routes.length) return [];

            const routeIds = routes.map(r => r._id);

            // Buscar paquetes asignados a esas rutas
            const pkgs = await Package.find({ route: { $in: routeIds } }).select("truck").lean();
            if (!pkgs.length) return [];

            const truckIds = [...new Set(pkgs.map(p => p.truck.toString()))];

            // Filtrar solo los trucks que tengan paquetes en esas rutas
            trucks = trucks.filter(t => truckIds.includes(t._id.toString()));
        }

        return trucks;
    },

    async truck(_, { id }) {
        return Truck.findById(id).lean();
    }
};
