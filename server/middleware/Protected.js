const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Check if 'userId' property exists in the 'req' object
  if(!req.userId){
    return res.sendStatus(401);
  } else {
    next();
  }
};
