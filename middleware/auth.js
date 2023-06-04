const User = require("../model/User");

exports.auth = async (req,res,next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        console.log("Auth middleware ke andar")
        if(user.email === email && user.password === password) {
            next();
        }
        else{
            return res.status(400).json({
                message:"invalid credentials "
            })
        }
    } catch (error) {
        res.status(400).json({
            message:"you are not authorised to edit the profile"
        });
    }
}