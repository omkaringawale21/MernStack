import mongoose from "mongoose";

export const Connection = async (username, password) => {
  const URL = `mongodb://${username}:${password}@ac-5beewua-shard-00-00.uacgfg3.mongodb.net:27017,ac-5beewua-shard-00-01.uacgfg3.mongodb.net:27017,ac-5beewua-shard-00-02.uacgfg3.mongodb.net:27017/CRUB_DB?ssl=true&replicaSet=atlas-12ynct-shard-0&authSource=admin&retryWrites=true&w=majority`;
  
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Successfully...");
  } catch (error) {
    console.log(`Error while connecting Database ${error}`);
  }
};
