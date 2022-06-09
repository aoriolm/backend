
//const rutasProtegidas = express.Router(); 
const jwt = require('jsonwebtoken');
exports.isLoggedIn = function(req, res, next) {
    const token = req.headers["x-access-token"];
    if (token) {
        
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 };