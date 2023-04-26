const { RequestError } = require("../helpers");

const validateFile = () => {
  const func = (req, res, next) => {
    if (!req.file) {
      next(RequestError(400, "No attach file"));
    }

    // Навряд треба перевіряти схему, фронт ніяк не зможе на це вплинути.
    // А далі випаде 500 помилка, що правильно.

    // const { error } = schema.validate(req.file);

    // if (error) {
    //   next(RequestError(400, error.message));
    // }
    next();
  };

  return func;
};

module.exports = validateFile;
