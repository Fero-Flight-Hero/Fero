const mongoose = require("mongoose");
const db = require("./index.js");
const bcrypt = require("bcrypt")
const Salt = 10
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)



const UserSchema = new mongoose.Schema({

  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dob: Date,
  country: String,
  image: String,
  search: [{
    iata: String,
    departure: String,
    from: Date,
    to: Date,
    budget:Number,
    result:[{
      departureDate:String,
      destination:String,
      origin:String,
      price:String,
      returnDate:String,
    }]
  }]
});
UserSchema.pre("save", function (next) {
  var user = this
  bcrypt.genSalt(Salt, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      } else {
        user.password = hash
        next()
      }
    })
  })

})
UserSchema.methods.comparePassword = function (inputPass, callback) {
  bcrypt.compare(inputPass, this.password, function (err, isMatch) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, isMatch)
    }
  })
}

const User = mongoose.model("User", UserSchema);

module.exports = User;