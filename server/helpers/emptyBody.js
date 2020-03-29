import serverResponse from './serverResponse';

const emptyBody = (request, response, next) => {
  const { body } = request;
  if (Object.keys(body).length === 0) {
    serverResponse(response, 400, { message: 'empty request body' });
  } else {
    next();
  }
};

export default emptyBody;
