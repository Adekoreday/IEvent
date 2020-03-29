import expressValidator from 'express-validator/check';
import checkForErrors from './checkForErrors';
import { emptyBody } from '../helpers';
const { check } = expressValidator;

const makeLowerCase =  (value) => {
    if (value !== '') {
      return value.toLowerCase();
    }
    return value;
  };

/**
 * @class UserValidator
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class UserValidator {
  /**
  * Generic validator to be used by all others
  * @param {string} field
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static genericCheck(field) {
    return check(`${field}`)
      .exists().withMessage(`${field} is missing`)
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage(`${field} cannot be blank`);
  }

  /**
* input validator to be used by all others
* @param {string} field
* @returns {function} call to a Check API middleware
* @memberof Validation
*/
  static inputCheck(field) {
    return check(`${field}`)
      .optional()
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true });
  }

  /**
  * Email validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkEmail() {
    return UserValidator.genericCheck('email')
      .trim()
      .isEmail()
      .withMessage('email is not valid')
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
  * Firstname and lastname validator
  * @param {string} name
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkName(name) {
    return UserValidator.genericCheck(`${name}`)
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage(`${name} must be at least 2 characters, and maximum 20`)
      .not()
      .matches(/^[A-Za-z]+[-]{1}[A-Za-z]+([-]{1}[A-Za-z]+)+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .not()
      .matches(/^[A-Za-z]+[']+[A-Za-z]+[']+[A-Za-z]+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .matches(/^[A-Za-z]+(['-]?[A-Za-z]+)?([ -]?[A-Za-z]+)?(['-]?[A-Za-z]+)?$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
  * Password validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkPassword() {
    return UserValidator.genericCheck('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('password must be at least 6 characters')
      .not()
      .matches(/\s/, 'g')
      .withMessage('password cannot contain whitespace');
  }

  /**
   * Generic Number validator
   * @param {string} item
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkNumber(item) {
    return UserValidator.genericCheck(item)
      .trim()
      .isInt({ min: 1 })
      .withMessage(`${item} value must be at least 1 and an integer`);
  }

  /**
   * Role validator
   * @returns {function} call to a Check API middleware
   * @memberof Validation
   */
  static checkPremium() {
    return UserValidator.genericCheck('isPremium')
      .custom((value) => {
        if (value !== true && value !== false) {
          return Promise.reject(new Error('status not of the right format'));
        }
        return Promise.resolve(true);
      });
  }

  /**
  * Signup validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static signUpValidation() {
    return [
      UserValidator.checkEmail(),
      UserValidator.checkName('firstname'),
      UserValidator.checkName('lastname'),
      UserValidator.checkPassword(),
      UserValidator.checkPremium(),
      checkForErrors,
      emptyBody
    ];
  }

  /**
  * Login validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static loginValidation() {
    return [
      UserValidator.checkEmail(),
      UserValidator.checkPassword(),
      checkForErrors,
      emptyBody
    ];
  }
}