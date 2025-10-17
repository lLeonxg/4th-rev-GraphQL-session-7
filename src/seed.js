import dotenv from "dotenv";
import mongoose from "mongoose";
import Driver from "./models/Driver.js";
import Truck from "./models/Truck.js";
import Warehouse from "./models/Warehouse.js";
import Route from "./models/Route.js";
import Package from "./models/Package.js";

dotenv.config();
const { MONGODB_URI } = process.env;

async function seed() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Clear previous data
  await Promise.all([
    Driver.deleteMany({}),
    Truck.deleteMany({}),
    Warehouse.deleteMany({}),
    Route.deleteMany({}),
    Package.deleteMany({}),
  ]);

  // Warehouses
  const wh1 = await Warehouse.create({
    _id: "WH1",
    name: "North Hub",
    location: { line1: "Av. Norte 100", city: "Monterrey", zone: "NORTH" },
  });
  const wh2 = await Warehouse.create({
    _id: "WH2",
    name: "South Hub",
    location: { line1: "Calle Sur 200", city: "Monterrey", zone: "SOUTH" },
  });

  // Routes
  const r1 = await Route.create({ _id: "ROUTE1", name: "North Express", distanceKm: 120, etaMinutes: 90, warehouse: wh1._id });
  const r2 = await Route.create({ _id: "ROUTE2", name: "South Connector", distanceKm: 80, etaMinutes: 60, warehouse: wh2._id });

  // Drivers
  const d1 = await Driver.create({ _id: "DRIVER1", name: "Juan Pérez", license: "LIC123" });
  const d2 = await Driver.create({ _id: "DRIVER2", name: "Ana López", license: "LIC456" });

  // Trucks (now include route)
  const t1 = await Truck.create({
    _id: "TRUCK1",
    plate: "ABC-123",
    status: "IN_ROUTE",
    capacityKg: 10000,
    driver: d1._id,
  });
  const t2 = await Truck.create({
    _id: "TRUCK2",
    plate: "XYZ-789",
    status: "AVAILABLE",
    capacityKg: 8000,
    driver: d2._id,
  });

  // Back-reference on drivers (optional)
  await Driver.findByIdAndUpdate(d1._id, { assignedTruck: t1._id });
  await Driver.findByIdAndUpdate(d2._id, { assignedTruck: t2._id });

  // Packages (hook them to trucks and routes)
  const pkgs = [
    {
      _id: "PKG1",
      trackingId: "PKG1",
      weightKg: 5,
      status: "IN_TRANSIT",
      destination: { line1: "Calle A 1", city: "Monterrey", zone: "NORTH" },
      truck: t1._id,
      route: r1._id,
    },
    {
      _id: "PKG2",
      trackingId: "PKG2",
      weightKg: 12,
      status: "IN_TRANSIT",
      destination: { line1: "Calle B 2", city: "Monterrey", zone: "NORTH" },
      truck: t1._id,
      route: r1._id,
    },
    {
      _id: "PKG3",
      trackingId: "PKG3",
      weightKg: 20,
      status: "PENDING",
      destination: { line1: "Calle C 3", city: "Monterrey", zone: "SOUTH" },
      truck: t2._id,
      route: r2._id,
    },
  ];
  await Package.insertMany(pkgs);

  console.log("Extended seed complete");
  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
});

