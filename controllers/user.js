const User = require("../model/User");

exports.register = async (req,res) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'already a user'});
        }
        console.log("controller ke andar");
        const newUser = new User({
            name,
            email,
            password
        })

        await newUser.save();

        res.status(201).json({
            message: 'user created successfully',
            newUser
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.login = async (req,res) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email});
        console.log("Login controller me aa gye")

        if(!user){
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // const isPasswordMatch = await user.findOne({password});
        // console.log(isPasswordMatch)
        if (password !== user.password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({
            message:"Login Successfully"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.getAll = async (req,res) => {
    try {
        const user = await User.find({});
        
        if(user){
            res.send(user);
        }
    } catch (error) {
        res.status(400).json({
            message: "No User found"
        });
    }
}

exports.updateProfile = async (req,res) => {
    try {
        const {name,email} = req.body;
        const user = await User.findOne({email});

        console.log("update controller ke andar")

        if(!user){
            res.status(400).json({
                message: "User not found"
            });
        }   
        user.name = name;
        user.email = email;

        await user.save();
        res.status(200).json({
            message: "User updated successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            message: "Profile updation failed"
        });
    }
}

exports.deleteProfile = async (req,res,next) =>{
    try {
        
        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user){
            res.status(400).json({
                message:"user not found"
            });
        }

        await User.findOneAndDelete({email});
        res.status(400).json({
            message:"user deleted successfully"
        })

    } catch (error) {
        res.status(400).json({
            message:"error aa gye",
            
        });
    }
}