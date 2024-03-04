import mongoose from "mongoose"

const connect=()=>{
    try{
        mongoose.connect("mongodb+srv://Eyepatch:gamers123@cluster0.d1jhb3w.mongodb.net/")
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log("MongoDB connected successfully")
        })
        connection.on('error',(err)=>{
            console.log(`Error occurred while connecting to MongoDB: ${err}`)
            process.exit(1)
        })
    }
    catch(e){
        console.log(e)
    }
}

export default connect;