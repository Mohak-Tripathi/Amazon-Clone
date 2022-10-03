// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);   //err.stack to get whole error
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})


const app = require("./app.js");

const connectDatabase = require("./config/database");

const dotenv = require("dotenv")




//Setting up Config files
dotenv.config({path: "backend/config/config.env"})




//Connecting to database
connectDatabase()

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server has started om PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})


// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);   //err.stack to get complete error like where it happened  & err.message to get just error message without much hint where it happened. 
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})
