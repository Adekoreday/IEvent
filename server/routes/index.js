import express from 'express';
import user from './user';

const route = express.Router();

route.use('/users', user);

export default route;

