import { GraphQLError } from "graphql";
import Truck from "../models/Truck.js";

export default {
   async updateTruckStatus(_, { id, status }) {
        const updatedTruck = await Truck.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, lean: true }
        );
        if (!updatedTruck) {
            throw new GraphQLError(`Truck ${id} not found`, {
                extensions: "BAD_USER_INPUT"
            })
        }
        return updatedTruck;
   }
};