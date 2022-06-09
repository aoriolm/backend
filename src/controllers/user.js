const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require('../roles');

async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
 try {
  const { email, password, nombre, apellido1, apellido2, nacimiento, tel1, tel2, genero, rol } = req.body
  const hashedPassword = await hashPassword(password);
  const newUser = new userSchema({ email, password: hashedPassword, rol: rol, nombre, apellido1, apellido2, nacimiento, tel1, tel2, genero });
  const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
   expiresIn: "1d"
  });
  newUser.accessToken = accessToken;
  await newUser.save();
  res.json({
   data: newUser,
   accessToken
  })
 } catch (error) {
  next(error)
 }
}

exports.login = async (req, res, next) => {
    try {
     const { email, password } = req.body;
     const user = await userSchema.findOne({ email });
     if (!user) return next(new Error('Email does not exist'));
     const validPassword = await validatePassword(password, user.password);
     if (!validPassword) return next(new Error('Password is not correct'))
     const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
     });
     
     await userSchema.findByIdAndUpdate(user._id, { accessToken })
     res.status(200).json({
      id: user._id,
      accessToken,
     })
     } catch (error) {
     next(error);
    }
   }

   exports.getUsers = async (req, res, next) => {
    const users = await userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
   }

   
   exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { email, password, nombre, apellido1, apellido2, nacimiento, tel1, tel2, genero, rol } = req.body;
    const hashedPassword = await hashPassword(password);
    userSchema
    .updateOne({ _id: id }, { $set: { email, password: hashedPassword, nombre, apellido1, apellido2, nacimiento, tel1, tel2, genero, rol } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));

   }
    
   exports.deleteUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     await userSchema.findByIdAndDelete(userId);
     res.status(200).json({
      data: null,
      message: 'User has been deleted'
     });
    } catch (error) {
     next(error)
    }
   }

 
exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.rol)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}
 


