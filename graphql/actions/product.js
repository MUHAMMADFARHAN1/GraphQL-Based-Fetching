import Product from "../../models/Product.js";

export const getProducts = async (request, response) => {
  try {
    let products = await Product.find();
    //return response.send(products);
    return products;
  } catch (error) {
    return response.status(500).send("Server Error");
  }
};
