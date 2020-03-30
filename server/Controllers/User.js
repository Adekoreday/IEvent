import bcrypt from 'bcryptjs';
import Debug from 'debug';
import models from '../models';
const debug = Debug('dev');
import { 
     generateToken,
     serverResponse,
     serverError } 
     from '../helpers';

const { User } = models;
/**
 * @export
 * @class Users
 */
class Users {
    /**
     * @name create
     * @async
     * @static
     * @memberof Users
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new user
     */
    static async create(req, res) {
      try {
        if (await User.findByEmail(req.body.email)) {
          return serverResponse(res, 409, {
            error: 'email has already been taken'
          });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
          ...req.body,
          password: hashedPassword
        });
        const { id } = user;
        delete user.password;
        const token = generateToken({ id }, '24h');
        res.set('Authorization', token);
        return serverResponse(res, 201, {token, ...user.dataValues});
      } catch (error) {
        debug(error, 'this is the error');
        return res.status(500).json({error});
      }
    }

    /**
   * Method for handling signin route(POST api/v1/auth/login)
   * @param {object} request - the request object
   * @param {object} response  - object
   * @return { json }  - the response json
   */
  static async login(request, response) {
    const { email, password } = request.body;
    try {
      const user = await User.findOne({ where: { email } });
      let verifyPassword;
      if (user) { verifyPassword = bcrypt.compareSync(password, user.password); }
      if (!user || !verifyPassword) {
        return serverResponse(response, 401, { message: 'username or password is incorrect' });
      }
      const { id, dataValues } = user;

      const token = generateToken({ id }, '24h');
      delete dataValues.password;
      return serverResponse(response, 200, {
        user: { ...dataValues },
        token
      });
    } catch (error) {
      return serverError(response);

    }
  }
}

export default Users;