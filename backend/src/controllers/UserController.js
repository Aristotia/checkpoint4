/* eslint-disable no-useless-escape */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const models = require("../models");

class UserController {
  static register = async (req, res) => {
    const { email, password, pseudo } = req.body;

    const schema = Joi.object({
      pseudo: Joi.string().required(),
      email: Joi.string()
        .email()
        .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      password: Joi.string().required(),
    });
    // eslint-disable-next-line no-unused-vars
    const { error } = await schema.validate({
      pseudo,
      email,
      password,
    });

    if (!email || !password) {
      res.status(400).send({ error: "Please specify both email and password" });
      return;
    }

    try {
      const hash = await argon2.hash(password);

      models.user
        .insert({ email, password: hash, pseudo })
        .then(([result]) => {
          res.status(201).send({ id: result.insertId, email, pseudo });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({
            error: err.message,
          });
        });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: err.message,
      });
    }
  };

  static login = (req, res) => {
    const { pseudo, password } = req.body;

    if (!pseudo || !password) {
      res.status(400).send({ error: "Please specify both email and password" });
    }

    models.user
      .findByPseudo(pseudo)
      .then(async ([rows]) => {
        if (rows[0] == null) {
          res.status(401).send({
            error: "Invalid credentials 1",
          });
        } else {
          const { id, password: hash } = rows[0];

          if (await argon2.verify(hash, password)) {
            const token = jwt.sign({ id }, process.env.JWT_AUTH_SECRET, {
              expiresIn: "1h",
            });

            res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .status(200)
              .send({
                id,
                pseudo,
              });
          } else {
            res.status(401).send({
              error: "Invalid credentials 2",
            });
          }
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          error: err.message,
        });
      });
  };

  static authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      const data = jwt.verify(token, process.env.JWT_AUTH_SECRET);
      req.userId = data.id;
      return next();
    } catch {
      return res.sendStatus(401);
    }
  };

  static browse = (req, res) => {
    models.user
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.user
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const item = req.body;

    // TODO validations (length, format...)

    item.id = parseInt(req.params.id, 10);

    models.user
      .update(item)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const item = req.body;

    // TODO validations (length, format...)

    models.user
      .insert(item)
      .then(([result]) => {
        res.status(201).send({ ...item, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.user
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = UserController;
