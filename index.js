const express = require("express")
const cors = require("cors")
const conectDB = require("./db/config")
const authRouter = require("./routes/auth")
const taskRouter = require("./routes/task")

const app = express()
require("dotenv").config()
conectDB()

app.use(express.json())
app.use( cors() )

app.use("/", express.static(__dirname + "/public") )

app.use("/auth", authRouter)

app.use("/task", taskRouter)


app.listen( process.env.PORT, () => {
    console.log(`Aplicacion corriendo en el puerto ${process.env.PORT}`);
})