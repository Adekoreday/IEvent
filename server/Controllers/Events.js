
import models from '../models';

import { 
     serverResponse,
     serverError,
     sendMail } 
     from '../helpers';

const { Events, User } = models;
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
   * Method for handling read event route(get api/v1/events/read)
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

       /**
   * Method for handling read event route(get api/v1/events/read)
   * @param {object} request - the request object
   * @param {object} response  - object
   * @return { json }  - the response json
   */
  static async subscribe(request, response) {
    try {
        const id = request.params.id;
        const event = await Events.findById(id);
        if(event === null) return serverResponse(response, 404, { message: 'event not found'});
        const user = request.user;
        if(event.isPremium === true && user.isPremium === false) return  serverResponse(response, 401, { message: 'upgrade to premium plan to subscribe to event'});
        await user.addEvents(event.id, {through: {isConfirmed: false}});

        const message = {
            html: `$            
                    <p>Dear <span style='text-transform: capitalize;'>${user.firstname}</span>,</p>
                    <p>We are happy to have you with us, you are receiving this mail as a confirmation that your signUp is successful.
                    for the event ${event.name} at ${event.location} please come as scheduled</p>
                 </p>
                    `,
          };

        await sendMail(process.env.ADMIN_MAIL, user.email, message);
        const result = await User.findOne({
            where: {id : user.id},
            include: [
                {model: Events, as: 'events'} ]
            }
        );
      return serverResponse(response, 200, {
        data: { ...result.dataValues }
      });
    } catch (error) {
        console.log('this is the error', error);
      return serverError(response);
    }
  }

         /**
   * Method for handling read event route(get api/v1/events/read)
   * @param {object} request - the request object
   * @param {object} response  - object
   * @return { json }  - the response json
   */
  static async subscribedEvents(request, response) {
    try {
        const id = request.params.id;
        const event = await Events.findById(id);
        if(event === null) return serverResponse(response, 404, { message: 'event not found'});
        const user = request.user;
        const result = await User.findOne({
            where: {id : user.id},
            include: [
                {model: Events, as: 'events'} ]
            }
        );
      return serverResponse(response, 200, {
        data: { ...result.dataValues }
      });
    } catch (error) {
      return serverError(response);
    }
  }
}

export default Event;