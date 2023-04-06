const http2 = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;
const NotFoundError = require('../errors/not-found-err');
const StatusConflictError = require('../errors/status-conflict-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(http2.constants.HTTP_STATUS_OK).send({ data: users }))
  .catch(next);

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным id не найден');
      }
      return res.status(http2.constants.HTTP_STATUS_OK)
        .send({
          name: user.name, about: user.about, avatar: user.avatar, email: user.email,
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные профиля'));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(http2.constants.HTTP_STATUS_CREATED)
      .send({
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new StatusConflictError('Пользователь с такими данными уже существует'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'extra-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Пользователь c указанным id не найден'); })
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
        return;
      }
      next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным id не найден');
      }
      return res.status(http2.constants.HTTP_STATUS_OK)
        .send({
          name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user._id,
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
        return;
      }
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      return res.status(http2.constants.HTTP_STATUS_OK)
        .send({
          name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user._id,
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
        return;
      }
      next(err);
    });
};
