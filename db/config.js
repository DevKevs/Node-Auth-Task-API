const mongoose = require("mongoose")
const { loginUsuario } = require("../controllers/authController")

const conectDB = async () => {

    try {
        await mongoose.connect(process.env.DB_CONNECTION)

        console.log('DB is conected');
        
    } catch (error) {
        console.log(error);
    }
    
} 


module.exports = conectDB