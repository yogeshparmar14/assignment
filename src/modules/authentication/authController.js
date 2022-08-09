const userModel = require("../../db/models/registerSchema.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registration = async (req, res) => {
    const { name, city, email, password, userType } = req.body
    const user = await userModel.findOne({ email })
    if (user) return res.status(403).send({
        data: {},
        error: {
            email: "Email is already registered email"
        }
    })
    if (!name || !city || !email || !password)
        return res.status(403).send({
            data: {},
            error: {
                email: "Email is required",
                phone: "Phone is required",
                password: "Password is required",
                termCondition: "TermCondition is required"

            }
        })
    try {

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        console.log(hashPassword)
        const doc = new userModel({
            name: name,
            email: email,
            city: city,
            password: hashPassword,
            userType: userType
        })
        await doc.save()
        const savedUser = await userModel.findOne({ email })
        // console.log(savedUser)
        //Generating JWT TOKEN
        let params = {
            userID: savedUser._id,
            userType: savedUser.userType
        }
        const token = await jwt.sign(params, process.env.JWT_SECRET_KEY, { expiresIn: '5D' })
        res.send({
            "message": "Signup successfully!", "status": 200,
            "data": {
                "_id": savedUser._id,
                "name": savedUser.name,
                "email": savedUser.email,
                "accessToken": token
            }
        })
    } catch (error) {
        console.log(error)
        res.status(403).send({
            data: {},
            error: {
                message: "unable to signup"

            }
        })


    }
}

const login = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password)
        return res.status(403).send({
            data: {},
            error: {
                email: "Email is required",
                password: "Password is required",

            }
        })
    const user = await userModel.findOne({ email: email })
    if (user == null)
        return res.status(403).send({
            data: {},
            error: {
                email: "please enter registered email",
                password: "please enter register password",

            }
        })
    console.log(user.password)
    const isMatch = await bcrypt.compare(password, user.password)
    if ((user.email != email) || !isMatch) {
        return res.status(403).send({
            data: {},
            error: {
                email: "please enter registered email",
                password: "please enter register password",

            }
        })
    }
    try {
        //Generating JWT token
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5D' })
        res.status(200).send({
            "message": "Login sucess", "status": 200,
            "data": {
                "_id": user._id,
                "name": user.name,
                "email": user.email,
                "accessToken": token
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const userData = async (req, res) => {

    try {

        const perPage = req.query.limit;
        const city1 = req.query.city1
        const city2 = req.query.city2
        const desc = req.query.desc || 1
        const page = 1
        const skip = (req.query.page - page) * perPage

        const mysort = { createdAt: desc }

        if (!city1 || !city2) {
            const data = await userModel.find({
                _id: { $ne: req.user.id }
            }).skip(skip).limit(perPage).sort(mysort)
            res.json(data)
        } else {
            const data = await userModel.find({
                _id: { $ne: req.user.id },
                city: { "$in": [city1, city2] }
            }).skip(skip).limit(perPage).sort(mysort)
            res.json(data)
        }


    }
    catch (error) {
        res.status(403).json({ "message": "Unable to fatch users" })
    }
}

 

module.exports = { registration, login, userData };
