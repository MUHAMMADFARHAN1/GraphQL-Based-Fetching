import express from "express";
//import authRouter from "./routers/auth.router.js";
import productRouter from "./routers/product.router.js";
import orderRouter from "./routers/order.router.js";
import { startDatabase } from "./config/db.js";

//GraphQl libraries added
import { graphqlHTTP } from "express-graphql";
import graphql from "graphql";
import { SCHEMA } from "./graphql/schemas.js";

const { buildSchema } = graphql;

const schema = buildSchema(SCHEMA);

const root = {
  hello: () => {
    return "Hello CLA";
  },
  users: () => {
    return [
      {
        name: "User 1",
        email: "user1@gmail.com",
        password: "123456",
        products: [],
      },
      {
        name: "User 2",
        email: "user2@gmail.com",
        password: "123456",
        products: [],
      },
    ];
  },
  products: () => {
    return [
      {
        title: "Product 1",
        slug: "product-1",
        price: "100",
      },
      {
        title: "Product 2",
        slug: "product-2",
        price: "200",
      },
    ];
  },
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
