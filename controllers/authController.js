const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/User")

const PostUser = async (req, res) => {

    const {email, password, username} = req.body;
    try {
        let user = await userModel.findOne({ email })
        if(user){
            return res.status(501).json({
                ok: false,
                msg: 'Email already taken'
            })
        }
        const newUser = new userModel({ email, password, username });

        const salt = bcryptjs.genSaltSync(12)

        newUser.password = bcryptjs.hashSync(password, salt)

        await newUser.save()

        const payload = {
            id: newUser.id
        }
        jwt.sign(payload, process.env.SECRET, {expiresIn: 86400},(error, token) => {
            res.json({
                ok: true,
                id: newUser.id, 
                username,
                msg: 'User succesfully created',
                token
            })
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error on register'
        })
    }
};

const loginUser = async (req, res) => {

    const {email, password} = req.body;
    
    try {
        let user = await userModel.findOne({ email })
        if(!user){
            return res.status(401).json({
                ok: false,
                msg: 'Invalid Email or Password'
            })
        }
        const validPassword = bcryptjs.compareSync(password, user.password)

        if(!validPassword){
            return res.status(401).json({
                ok: false,
                msg: 'Invalid Email or Password'
            })
        }

        const payload = {
            id: user.id
        }
        jwt.sign(payload, process.env.SECRET, {expiresIn: 86400},(error, token) => {
            res.json({
                ok: true,
                id: user.id, 
                username: user.username,
                msg: 'Login succesfully',
                token
            })
        })


    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error on Login'
        })
    }
};

module.exports = {
    loginUser,
    PostUser
}