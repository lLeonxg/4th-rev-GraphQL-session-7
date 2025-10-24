import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();
export const TOPICS = {
    INCIDENT_REPORTED: "INCIDENT_REPORTED"};