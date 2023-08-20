import mongoose from "mongoose";

const ConnectionDB = async (userName, userPassword, dataBaseName) => {
    const dbURL = `mongodb+srv://${userName}:${userPassword}@cluster0.fvmimgv.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(dbURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("DataBase Connected Successfully...");
    } catch (error) {
        console.log(`Error occuring while connecting DataBase to MongoDB ${error}`);
    }
}

export default ConnectionDB;