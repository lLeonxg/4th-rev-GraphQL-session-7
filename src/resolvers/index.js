import Query from "./Query.js";
import Mutation from "./Mutation.js";
import TruckType from "./types/Truck.js";
import DriverType from "./types/Driver.js";
import PackageType from "./types/Package.js";
import RouteType from "./types/Route.js";
import WarehouseType from "./types/Warehouse.js";

const resolvers = {
    Query,
    Mutation,
    Truck: TruckType,
    Package: PackageType,
    Route: RouteType,
    Warehouse: WarehouseType,
    Driver: DriverType
};

export default resolvers;