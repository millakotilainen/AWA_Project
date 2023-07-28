const User = require('../models/User');

module.exports = async (req, res, next) => {
  if(!req.userId){
    return res.sendStatus(401);
  } else {
    next();
  }
};
