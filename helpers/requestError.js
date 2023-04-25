const messages = {
  204: "No Content",
  400: "Bad Request",
  401: "Unautorized",
  403: "Forbidden",
  404: "NotFound",
  409: "Conflict",
};

const RequestError = (status = 404, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = RequestError;
