import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // slug: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//The convention is Document(Schema) name, schma object and then remote colection name
//It is better to have Document name here as default convention and allow moongoose to create pural of document name remote by default
//This is to keep the DB clean
// The reposnsbility of creating and naming collection should be done by moongose in plural is better

//export default mongoose.model("Product", productSchema);
export default mongoose.model("Product", productSchema, "Products");

// E11000 duplicate key error collection: Books.Products index: slug_1 dup key: { slug: null }
// happens when the schema is fixed on mongoDB side and can only be fixed by deleting the DB altogether.
// As imlciitly the value is fixed
