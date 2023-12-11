import mongoose from "mongoose";

try {
  mongoose.connect(
    "mongodb+srv://afrizaldwiariz:rajimo567@javastore.or5fcj3.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Connect successfully!!!");
} catch (error) {
  console.log("Connect failed: " + error);
}
