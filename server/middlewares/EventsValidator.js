import expressValidator from 'express-validator/check';
import checkForErrors from './checkForErrors';
import UserValidator from './UserValidator';


/**
 * @class UserValidator
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class EventsValidator {

  /**
   * Premium validator
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
  * Date validator
  * @param {string} name
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
 static checkDate(name) {
    return UserValidator.genericCheck(`${name}`)
      .trim()
      .matches(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/, 'g')
      .withMessage(`invalid date input for ${name}`)
  }  

  /**
  * Event validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static EventAddValidation() {
    return [
      UserValidator.checkName('name'),
      UserValidator.checkName('category'),
      UserValidator.genericCheck('imageUrl'),
      UserValidator.genericCheck('date'),
      UserValidator.genericCheck('deadline'),
      EventsValidator.checkPremium(),
      checkForErrors
    ];
  }

}