import express from 'express';
import user from './user';
import event from './events';
const route = express.Router();

route.use('/users', user);
route.use('/events', event);

export default route;

