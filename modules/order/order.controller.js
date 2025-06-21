import Order from "../../models/Orders.js";
import Product from "../../models/Product.js";

export const createOrder = async (request, response) => {
  try {
    let { products, totalPrice, createdAt } = request.body;
    let userId = request.headers.authorization;
    // I check if user is authorized
    if (!userId) return response.status(401).send("Unauthorized");
    // I generate slug from title
    // let slug =  name.replaceAll(" ", "-").toLowerCase() + "-" + new Date().getTime();
    // I create the product
    // https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
    //let product = await Product.find();
    //let newArray = product.map((pts) => pts["_id"]);
    //let search_Array = product.distinct("_id");
    //console.log(product);
    //console.log(newArray);

    //product_array = products.map(w => w.length);

    //if()
    //https://stackoverflow.com/questions/33399786/get-length-of-every-element-in-array-javascript
    //https://stackoverflow.com/questions/68840876/check-if-array-has-element-with-specific-length


    if (products.every((subarr) => subarr.length !== 19)) {
      // then no array with length 7 exists
      return response.status(404).send("Invalid Product Entered!");
    }

    const docs = await Product.find({
      _id: { $in: products },
    }).exec();

    console.log(docs);

    if (docs.length != products.length)
      return response.status(404).send("Invalid Product Entered!");

    //let isFound = products.some((ai) => newArray.includes(ai));
    //if (!isFound) return response.status(404).send("Invalid Product Entered!");

    await Order.create({
      products,
      totalPrice,
      createdAt,
    });
    response.status(201).send(`Product created successfully`);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
};

//Basic fetching
export const getOrders = async (request, response) => {
  try {
    let orders = await Order.find();
    return response.send(orders);
  } catch (error) {
    return response.status(500).send("Server Error");
  }
};

export const getOrder = async (request, response) => {
  let { id } = request.params;
  // In case you are fetching with id
  // let product = await Product.findById(id)

  // In case you are fetching with another field like slug for example
  //This is find one
  //let product = await Product.findOne({ id });
  //The alternative is, this is more performant as well
  let product = await Order.findById(id);
  if (!product) return response.status(404).send("Product not found");
  return response.send(product);
};

export const deleteOrder = async (request, response) => {
  let { id } = request.params;

  let product = await Order.findByIdAndDelete(id);
  if (!product) return Order.status(404).send("Product not found");

  //  const result = await User.findByIdAndDelete(id);
  response.status(202).send(`Product deleted: ${id}`);
};

export const updateOrder = async (request, response) => {
  let { id } = request.params;
  let { products, totalPrice, createdAt } = request.body;

  let body = request.body;
  await Order.findOneAndUpdate(
    { _id: id },
    { products, totalPrice, createdAt }
  );

  response
    .status(202)
    .send(`Updating a product of id: ${id} with data: ${body}`);
};
