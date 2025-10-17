export const typeDefs = /* GraphQL */ `
    enum TruckStatus { AVAILABLE IN_ROUTE MAINTENANCE }
    enum PackageStatus { PENDING IN_TRANSIT DELIVERED }

    type Address {
        line1: String!
        city: String!
        zone: String!
    }

    type Driver {
        id: ID!
        name: String!
        license: String!
        assignedTruck: Truck
    }

    type Truck {
        id: ID!
        plate: String!
        status: TruckStatus!
        capacityKg: Int!
        driver: Driver
        packages: [Package!]!
    }

    type Package {
        id: ID!
        trackingId: String!
        weightKg: Float!
        status: PackageStatus!
        destination: Address!
        truck: Truck
        route: Route
    }

    type Warehouse {
        id: ID!
        name: String!
        location: Address!
    }
    type Route {
        id: ID!
        name: String!
        distanceKm: Float!
        etaMinutes: Int!
        warehouse: Warehouse!
    }
    input TruckFilter {
        status: TruckStatus
        driverId: ID
        plate: String
        zone: String
    }
    type Query {
        trucks(filter: TruckFilter): [Truck!]!
        truck(id: ID!): Truck
    }

    type Mutation {
        updateTruckStatus(id: ID!, status: TruckStatus): Truck!
    }
`;