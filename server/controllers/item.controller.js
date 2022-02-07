const automatic = require("../index.js");
var User = require("../database-mongo/Item.model.js");
const nodemailer = require("nodemailer")
var signUp = function (req, res) {
  var userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    image: req.body.image,
  };
  sendConfirmation(userData.email, userData.firstName, userData.lastName);
  User.create(userData, (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.send(data);
    }
  });
};
var login = function (req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) res.send("user not found");
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        res.send(user);
      } else {
        res.send("bad password");
      }
    });
  });
};
var update = function (req, res) {
  var filter = req.params.email;
  var data = req.body;
  console.log("this is data  " + data.search[data.search.length - 1].budget);
  
  automatic.automatic(
    filter,
    data,
    data.search[data.search.length - 1].iata,
    data.search[data.search.length - 1].budget
  );
  sendNewFlights(filter)

  User.findOneAndUpdate(filter, data)
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const transporter = nodemailer.createTransport({
  service: "Outlook365",
  host: "smtp.office365.com",
  port: "587",
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: "turnt_app@outlook.com",
    pass: "Turnt123456",
  },
});
const sendConfirmation = async (email, firstname, lastname) => {
  const mailOptions = {
    from: "turnt_app@outlook.com",
    to: email,
    subject: "Hello : Account",
    text: "Hello" + " " + firstname + " " + lastname + " " + "Welcome to TRUNT"
  };

  try {
    await transporter.sendMail(mailOptions, function (err, info) {
      console.log(err);
      if (err) {
        throw new Error(err);
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};
const sendNewFlights = async (email) => {
  const mailOptions = {
    from: "turnt_app@outlook.com",
    to: email,
    subject: "Alert : New flight",
    text: "You have got new flights suggestion. Please check your account TURNT"
  };

  try {
    await transporter.sendMail(mailOptions, function (err, info) {
      console.log(err);
      if (err) {
        throw new Error(err);
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};


module.exports = { update, signUp, login,sendNewFlights };
