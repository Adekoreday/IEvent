import express from 'express';
import Users from '../Controllers/User';
import  {UserValidator, verifyToken} from '../middlewares'

const route = express.Router();

route.post('/signup', UserValidator.signUpValidation(),  Users.create);
route.post('/signin',UserValidator.loginValidation(), Users.login);
route.get('/details', verifyToken, Users.getUser);

export default route;