const middleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      res.json({
        error: message,
        message: "missing required name field",
        status: 400,
      });
    }
  };
};
module.exports = middleware;
