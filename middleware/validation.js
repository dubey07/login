const Validator = require('validatorjs');

exports.validate = (req, res, next) => {
  const rules = {
    name: 'required',
    email: 'required|email',
    password:'min:6'
  };

  const validation = new Validator(req.body, rules);

  if (validation.fails()) {
    return res.status(400).json({ errors: validation.errors.all() });
  }

  next();
}