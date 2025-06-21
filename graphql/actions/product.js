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

//export const getProduct = async (request, response) => {
export const getProduct = async (data) => {
  //  let { id } = request.params;
  let id = data.id;
  // In case you are fetching with id
  // let product = await Product.findById(id)

  // In case you are fetching with another field like slug for example
  //This is find one
  //let product = await Product.findOne({ id });
  //The alternative is, this is more performant as well
  let product = await Product.findById(id);
  if (!product) return response.status(404).send("Product not found");
  //return response.send(product);
  return product;
};
