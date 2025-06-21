import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      required: true,
    },
    // slug: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    totalPrice: {
      type: Number,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Quantity Adjustment is needed here, refresh the MongoDB to get the new schema as well!
// products: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       quantity: { type: Number, default: 1, min: 1 }
//     }
//   ],

//export default mongoose.model("Order", orderSchema);
export default mongoose.model("Order", orderSchema);
