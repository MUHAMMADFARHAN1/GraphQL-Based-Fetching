import Product from "../../models/Product.js";

// export const getProducts = async (request, response) => {
//   try {
//     // limit = items per page
//     let { page = 1, limit = 10 } = request.query;
//     // Page 1 Skip 0
//     // Page 2 Skip 10
//     // Page 3 Skip 20
//     // For page skip (page - 1) * itemsPerPage
//     let products = await Product.find()
//       .limit(limit)
//       .skip((page - 1) * limit)
//       // Sorting by createdAt in descendant order
//       .sort({ createdAt: -1 });
//     return response.send(products);
//   } catch (error) {
//     return response.status(500).send("Server Error");
//   }
// };

//Basic fetching
export const getProducts = async (request, response) => {
  try {
    let products = await Product.find();
    return response.send(products);
  } catch (error) {
    return response.status(500).send("Server Error");
  }
};

export const getProduct = async (request, response) => {
  let { id } = request.params;
  // In case you are fetching with id
  // let product = await Product.findById(id)

  // In case you are fetching with another field like slug for example
  //This is find one
  //let product = await Product.findOne({ id });
  //The alternative is, this is more performant as well
  let product = await Product.findById(id);
  if (!product) return response.status(404).send("Product not found");
  return response.send(product);
};

export const createProduct = async (request, response) => {
  try {
    let { name, description, price, quantity, createdAt } = request.body;
    let userId = request.headers.authorization;
    // I check if user is authorized
    if (!userId) return response.status(401).send("Unauthorized");
    // I generate slug from title
    // let slug =  name.replaceAll(" ", "-").toLowerCase() + "-" + new Date().getTime();
    // I create the product
    await Product.create({
      name,
      description,
      price,
      // slug,
      quantity,
      createdAt,
    });
    response.status(201).send(`Product created successfully`);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
};

// https://mongoosejs.com/docs/tutorials/findoneandupdate.html
//https://kb.objectrocket.com/mongo-db/how-to-use-the-mongoose-findoneandupdate-method-925
export const updateProduct = async (request, response) => {
  let { id } = request.params;
  let { name, description, price, quantity, createdAt } = request.body;

  let body = request.body;
  await Product.findOneAndUpdate(
    { _id: id },
    { name, description, price, quantity, createdAt }
  );

  response
    .status(202)
    .send(`Updating a product of id: ${id} with data: ${body}`);
};

//https://stackoverflow.com/questions/76980190/how-do-i-delete-a-document-in-mongodb-using-mongoose-in-node-js
export const deleteProduct = async (request, response) => {
  let { id } = request.params;

  let product = await Product.findByIdAndDelete(id);
  if (!product) return response.status(404).send("Product not found");

  //  const result = await User.findByIdAndDelete(id);
  response.status(202).send(`Product deleted: ${id}`);
};
