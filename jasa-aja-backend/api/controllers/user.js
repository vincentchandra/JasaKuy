const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Service = require("../models/service");

exports.provider_user_signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const filter = { email: req.body.email };
    const update = {
      whatsappNumber: req.body.whatsappNumber,
      ktpNumber: req.body.ktpNumber,
      profilePicture: req.file.path,
      dob: req.body.dob,
      role: "penawar",
    };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`

    let user = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(user);
    res.status(200).json({ message: "User updated", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.user_signup = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length > 1) {
      return res.status(409).json({ message: "Email exists" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            password: hash,
            fullname: req.body.fullname,
          });
          user
            .save()
            .then((result) => {
              console.log(result);
              res.status(200).json({ message: "User created", user: result });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({ error: error });
            });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.user_login = async (req, res, next) => {
  try {
    user = await User.find({ email: req.body.email });
    if (user.length < 1) {
      return res.status(401).json({ message: "Auth failed" });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Auth failed" });
      }
      if (result) {
        return res
          .status(200)
          .json({ message: "Auth successful", user: user[0] });
      }
      res.status(401).json({ message: "Auth failed" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.get_user_profile = async (req, res, next) => {
  const username = req.params.username;
  try {
    user = await User.find({ username: username }).exec();
    res.status(200).json({ user: user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

exports.get_user_services = async (req, res, next) => {
  const username = req.params.username;
  try {
    const services = await Service.find({ username: username }).exec();
    res.status(200).json({ services: services });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};
