import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import accountRoutes from "./routes/accountRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import { typeDefs, resolvers } from "./graphql/schema.js";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const startServer = async () => {
  await server.start();

  app.use("/api/accounts", accountRoutes);
  app.use("/api/loans", loanRoutes);

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        authMiddleware(req, res, () => {});
        return { user: req.user };
      },
    })
  );
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Mongo DB connected successfully`);
      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/graphql`);
      });
    })
    .catch((err) => console.log(err));
};
startServer();
