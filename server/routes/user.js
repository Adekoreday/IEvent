import express from 'express';
import Users from '../Controllers/User';
import  {UserValidator} from '../middlewares'

const route = express.Router();

route.post('/signup', UserValidator.signUpValidation(),  Users.create);
route.post('/signin',UserValidator.loginValidation(), Users.login);

export default route;