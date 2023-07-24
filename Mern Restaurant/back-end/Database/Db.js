import mongoose from "mongoose";

const ConnectionLoginDb = async (username, password) => {
  const URL = `mongodb://${username}:${password}@ac-xw9cmia-shard-00-00.jzsq9vm.mongodb.net:27017,ac-xw9cmia-shard-00-01.jzsq9vm.mongodb.net:27017,ac-xw9cmia-shard-00-02.jzsq9vm.mongodb.net:27017/RESTAURANT_DB?ssl=true&replicaSet=atlas-3yor05-shard-0&authSource=admin&retryWrites=true&w=majority`;

  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DataBase Connected Successfully...");
  } catch (error) {
    console.log(`Error occuring while connecting DataBase to MongoDB ${error}`);
  }
};

export default ConnectionLoginDb;
