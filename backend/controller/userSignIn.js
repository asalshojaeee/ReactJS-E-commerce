const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body
        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error("User not found")
        }

        const checkPassword = await bcrypt.compare(password, user.password)


        if (checkPassword) {



            const tokenData = {
                _id: user._id,
                email: user.email
            }


            const token = await jwt.sign(tokenData, "asal@@");
            const tokenOption = {
                httpOnly: true,
                secure: false,
                sameSite: "lax" // یا "strict" اگر "lax" جواب نداد


            }
            console.log("Token to be set:", token);

            res.cookie("token", token, tokenOption).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })


        } else {
            throw new Error("Please checke password")

        }





    }

    catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,

        })

    }

}

module.exports = userSignInController