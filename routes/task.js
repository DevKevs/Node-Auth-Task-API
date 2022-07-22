const {Router} = require("express");
const { check } = require("express-validator");
const { createTask, readTask, deleteTask, updateTask } = require("../controllers/taskController");
const verifyToken = require("../middlewares/verifyToken")
const validationErros = require("../middlewares/validationErrors")

const taskRouter = new Router();

taskRouter.post("/create", [ check("taskName", "Nombre de la tarea necesario").not().isEmpty(), validationErros, verifyToken],createTask)

taskRouter.get("/list", [verifyToken], readTask)

taskRouter.put("/update/:id", [ check("taskName", "Nombre de la tarea necesario").not().isEmpty(), validationErros,verifyToken], updateTask)

taskRouter.delete("/delete/:id", [verifyToken], deleteTask)

module.exports = taskRouter;