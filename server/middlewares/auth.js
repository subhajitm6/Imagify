import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const {token} = req.headers;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRECT);
        if(decoded.id){
            req.body.userId = decoded.id;
        }else{
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Login Again"
            });
        }
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export default auth;
