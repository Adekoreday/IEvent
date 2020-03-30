import jwt from 'jsonwebtoken';
import models from '../models';
import { serverResponse } from '../helpers';

const { User } = models;

/**
 * @name verifyToken
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @return {string} object
 */
const verifyToken = async (request, response, next) => {
  try {
    const token = request.headers.authorization || request.params.token;
    if (!token) {
      return serverResponse(response, 401, { message: 'no token provided' });
    }
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return serverResponse(response, 404, {
        message: 'user does not exist'
      });
    }
    request.user = user;
    response.locals.token = token;
    next();
  } catch (err) {
    return serverResponse(response, 401, { message: err.name });
  }
};

export default verifyToken;