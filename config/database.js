const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(()=> console.log("DB is running fine"))
    .catch((error)=>{
        console.log(error);
        console.log("Issue in DB connection")
        process.exit(1);
    });
}

module.exports = dbConnect;