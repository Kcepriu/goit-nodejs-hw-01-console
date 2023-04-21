const ctrlWrapper = (ctrl) => {
  const func = async (req, resr, next) => {
    try {
      await ctrl(req, resr, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
