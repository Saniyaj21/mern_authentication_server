import mongoose from "mongoose";

// db connection
export const connectDB = () => {

  const connectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  mongoose.connect(process.env.MONGO_URL, connectParams).then(() => {
    console.log("Connected DB")
  }).catch((e) => {
    console.log("Not connected", e)
  })

};