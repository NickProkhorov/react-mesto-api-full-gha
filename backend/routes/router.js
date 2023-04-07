const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const NotFoundError = require('../errors/not-found-err');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { createUser, login } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(https?:\/\/)?(w{3}\.)?[a-zA-Z0-9@:%._+~#=-]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
  }),
}), login);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use(() => {
  throw new NotFoundError('страница не существует');
});

module.exports = router;
