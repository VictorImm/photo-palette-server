const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.sendStatus(401); 
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); 

    req.user = user;
    next();
  });
}

module.exports = authToken;