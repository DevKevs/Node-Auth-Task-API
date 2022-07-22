const { validationResult } = require("express-validator")

const validationErros = (req, res, next) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(501).json({
            ok: false, 
            errors: errors.mapped()
        })
    }
    next();
}

module.exports = validationErros;