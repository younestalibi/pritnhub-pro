const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; 

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
 
    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId; 
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
