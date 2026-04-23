export function validate(schema, source = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        data: error.details.map((d) => ({ path: d.path.join('.'), message: d.message }))
      });
    }

    req[source] = value;
    return next();
  };
}
