
import models from '../models';

import { 
     serverResponse,
     serverError } 
     from '../helpers';

const { Events } = models;
/**
 * @export
 * @class Events
 */
class Event {
    /**
     * @name create
     * @async
     * @static
     * @memberof Events
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new user
     */
    static async create(req, res) {
      try {
        if(Object.entries(req.body).length === 0) return serverResponse(res, 400, { message: "bad request empty inputs"});
        const event = await Events.create({
            ...req.body
          });
        return serverResponse(res, 201, { ...event.dataValues});
      } catch (error) {
        return res.status(500).json({error});
      }
    }

    /**
   * Method for handling signin route(POST api/v1/auth/login)
   * @param {object} request - the request object
   * @param {object} response  - object
   * @return { json }  - the response json
   */
  static async readAll(request, response) {
    try {
    let allEvents;
     const {category } = request.query;
     if(category !== undefined) {
        allEvents = await Events.findByCategory(category)
     }else{
        allEvents = await Events.findAll();
     }
     if(allEvents === null) return serverResponse(response, 200, {message: "no event at this moment" });
   let allevents = allEvents.map(async (item) => item.dataValues);
   allevents = await Promise.all(allevents);
      return serverResponse(response, 200, {
        data: { ...allevents }
      });
    } catch (error) {
      return serverError(response);
    }
  }

     /**
   * Method for handling signin route(POST api/v1/auth/login)
   * @param {object} request - the request object
   * @param {object} response  - object
   * @return { json }  - the response json
   */
  static async read(request, response) {
    try {
        const id = request.params.id;
       const event = await Events.findById(id);
       if(event === null) return serverResponse(response, 200, {message: "no event at this moment" });
      return serverResponse(response, 200, {
        data: { ...event }
      });
    } catch (error) {
      return serverError(response);
    }
  }
}

export default Event;