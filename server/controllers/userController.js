import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({
                success: false,
                message: "Missing details."
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRECT)

        res.json({success: true, token, user: {name: user.name}})
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT);

        res.json({
            success: true,
            token,
            user: { name: user.name }
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};



const userCredits = async (req, res) => {
    try {
        // Get user ID from JWT token
        const {userId} = req.body;

        // Find user and select credits field
        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            credits: user.credits || 0,
            user :{name: user.name}
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export { registerUser, loginUser, userCredits }