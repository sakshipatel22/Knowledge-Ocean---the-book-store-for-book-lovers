const mongoose = require("mongoose");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,  // 10 seconds
    socketTimeoutMS: 45000,  // 45 seconds
    bufferCommands: false,  // Disable Mongoose buffering
  };

const conn = async()=>{
    try{
        await mongoose.connect(`${process.env.URI}`);
        console.log("successfully connected");
    }
    catch(error){
        console.log(error);
    }
}
conn();
// module.exports = conn;
