const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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"
    }
  })
);
module.exports.getSignUp = (req, res, next) => {
  res.render("Sign-Up.ejs", {
    title: "Sign Up",
    csrfToken: req.csrfToken()
  });
};

module.exports.postSignUp = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  bcrypt
    .hash(password, 12)
    .then(hash => {
      const user = new User({
        name: name,
        email: email,
        password: hash,
        notes: []
      });
      req.session.IsDone = true;
      return user.save();
    })
    .then(() => {
      transporter.sendMail({
        to: email,
        from: "madhav@notepad.com",
        subject: "Sign Up succeeded",
        html: "<h1>You signed up successfully</h1>"
      });
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getLogIn = (req, res, next) => {
  let message = req.flash("error");
  message.length > 0 ? (message = message[0]) : (message = null);
  res.render("Log-In", {
    title: "Log In",
    csrfToken: req.csrfToken(),
    errorMessage: message
  });
};

module.exports.postLogIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      req.flash("error", "invalid username or password");
      return res.redirect("/log-in");
    }
    bcrypt
      .compare(password, user.password)
      .then(result => {
        if (!result) {
          return res.redirect("/log-in");
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        console.log(req.session.user);
        res.redirect("/");
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports.getLogOut = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

module.exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  message.length > 0 ? (message = message[0]) : (message = null);
  res.render("Reset.ejs", {
    title: "Reset Password",
    csrfToken: req.csrfToken(),
    errorMessage: message
  });
};

module.exports.postReset = (req, res, next) => {
  const email = req.body.email;
  const token = crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/");
    }
    const resetToken = buffer.toString("hex");
    User.findOne({ email: email })
      .then(user => {
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 36000000;
        user.save();
      })
      .catch(err => {
        console.log(err);
      });
    transporter.sendMail({
      to: email,
      from: "madhav@notepad.com",
      subject: "Password Reset",
      html: `
        <h1> You made a request to reset your password.</h1>
        <p> click on this  <a href="http://boiling-plains-87481.herokuapp.com/reset/${resetToken}">link</a> </p>
        <p> The link expires in 1 hour </p>
        `
    });
    res.redirect("/");
  });
};

module.exports.getResetPassword = (req, res, next) => {
  const resetToken = req.params.token;
  User.findOne({ resetToken: resetToken })
    .then(user => {
      res.render("ResetPassword.ejs", {
        title: "Reset Password",
        csrfToken: req.csrfToken(),
        userId: user._id,
        resetToken: resetToken
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.postResetPassword = (req, res, next) => {
  const passwordToken = req.body.PasswordToken;
  const userId = req.body.userId;
  const password = req.body.Password;
  User.findOne({
    resetToken: passwordToken,
    _id: userId,
    resetTokenExpiration: { $gt: Date.now() }
  })
    .then(user => {
      bcrypt
        .hash(password, 12)
        .then(hash => {
          user.password = hash;
          return user.save();
        })
        .then(result => {
          res.redirect("/");
        });
    })
    .catch(err => {
      console.log(err);
    });
};
