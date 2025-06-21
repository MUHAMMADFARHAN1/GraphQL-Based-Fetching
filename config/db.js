import mongoose from "mongoose";
import { MONGO_URL } from "./variables.js";

// mongodb+srv://<db_username>:<db_password>@cluster0.uwlpa.mongodb.net/<db_name>

export const startDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to database", error.message);
  }
};
