import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbName = process.env.DB_NAME || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbUsr = process.env.DB_USERNAME || "";
const dbCluster = process.env.DB_CLUSTER || "";
const cloudUrl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

const connectViaMongoose = async () => {
  try {
    await mongoose.connect(cloudUrl);
    console.log("Mongoose Connected Successfully");
  } catch (e) {
    console.log("Error connecting to database", e);
    process.exit(1);
  }
};

export default connectViaMongoose;
