import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // const uri = process.env;
    // console.log("err", uri)
    // if (!uri) {
    //   throw new Error("MONGODB_URI environment variable not set");
    // }

    await mongoose.connect('mongodb+srv://rushiahire9567:SY6fzfR9NzZNa4jb@chatapp.t9c4m.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "chatApp"
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
  }
}