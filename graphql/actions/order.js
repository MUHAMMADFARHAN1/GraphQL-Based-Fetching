import Order from "../../models/Orders.js";

//Basic fetching
export const getOrders = async (request, response) => {
  try {
    let orders = await Order.find();
    // return response.send(orders);
    return orders;
  } catch (error) {
    return response.status(500).send("Server Error");
  }
};

export const getOrder = async (data) => {
  //let { id } = request.params;
  let id = data.id;
  // In case you are fetching with id
  // let product = await Product.findById(id)

  // In case you are fetching with another field like slug for example
  //This is find one
  //let product = await Product.findOne({ id });
  //The alternative is, this is more performant as well
  let product = await Order.findById(id);
  if (!product) return response.status(404).send("Product not found");
  return product;
};
