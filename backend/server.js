const app = require("./app.js");

const dotenv = require("dotenv")

//Setting up Config files
dotenv.config({path: "backend/config/config.env"})


app.listen(process.env.PORT, ()=>{
    console.log(`Server has started om PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
