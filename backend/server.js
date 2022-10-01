const app = require("./app.js");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv")

//Setting up Config files
dotenv.config({path: "backend/config/config.env"})


//Connecting to database
connectDatabase()

app.listen(process.env.PORT, ()=>{
    console.log(`Server has started om PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
