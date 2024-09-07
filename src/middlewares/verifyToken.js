import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];;
    if(!token){ 
    return res.status(403).send('A token is required for authentication');
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
    } catch(error){
        return res.status(401).send('Invalid token');
    }
    return next();
};

export default verifyToken;