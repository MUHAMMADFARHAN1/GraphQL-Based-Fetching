import express from "express";
//import authRouter from "./routers/auth.router.js";
import productRouter from "./routers/product.router.js";
import orderRouter from "./routers/order.router.js";
import { startDatabase } from "./config/db.js";

//GraphQl libraries added
import { graphqlHTTP } from "express-graphql";
import graphql from "graphql";
import { SCHEMA } from "./graphql/schemas.js";
import { getProducts, getProduct } from "./graphql/actions/product.js";
import { getOrder, getOrders } from "./graphql/actions/order.js";

const { buildSchema } = graphql;

const schema = buildSchema(SCHEMA);

const root = {
  getProducts,
  getProduct,
  getOrder,
  getOrders,
};

const app = express();

app.use(express.json());

//app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(5001, async () => {
  await startDatabase();
  console.log("Server is running");
});
