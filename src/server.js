import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { connectDB } from "./db.js";
import { typeDefs } from "./schema.js";
import resolvers from "./resolvers/index.js";

dotenv.config();

const { MONGODB_URI, PORT } = process.env;

async function bootstrap() {
    // 1. Connect to MongoDB
    await connectDB(MONGODB_URI);
    
    // 2. Build the schema
    const schema = makeExecutableSchema( { typeDefs, resolvers } );

    // 3 Set up express server (app + HTTP)
    const app = express();
    const httpServer = http.createServer(app);

    // 4 Set up ApolloServer
    const apollo = new ApolloServer({
        schema,
        plugins: [ ApolloServerPluginLandingPageLocalDefault({ embed: true }) ]
    });

    await apollo.start();

    // 5 Setup app
    app.use(
        "/graphql",
        cors(),
        bodyParser.json(),
        expressMiddleware(apollo, { context: async () => ({}) })
    );

    httpServer.listen(PORT, () => {
        console.log("MongoDB connected!!!");
        console.log(`GraphQL ready at http://localhost:${PORT}/graphql`);
    });
}

bootstrap().catch( e => {
    console.error('Fatal error: ', e);
    process.exit(1);
});