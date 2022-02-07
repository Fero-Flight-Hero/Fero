const express = require("express");
const itemRoutes = require("./routes/item.routes");
const cron = require("node-cron");
var Amadeus = require("amadeus");
var sendNewFlights=require('./controllers/item.controller.js')

var User = require("./database-mongo/Item.model.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/public"));

app.use("/api/user", itemRoutes);

app.listen(PORT, function () {
  console.log("listening on port 3000!");
});

var amadeus = new Amadeus({
  clientId: "uudAgmNB2N4XzrXGKtraGSwCyxvy9BCs",
  clientSecret: "z7ElNJADQoAKkf7r",
});
var iata;
var maxPrice;
app.post("/api/user/iata", (req, res) => {
  iata = req.body.iata;
  maxPrice = req.body.maxPrice;
  console.log(iata);

  amadeus.client
    .get("/v1/shopping/flight-destinations", {
      origin: iata,
      maxPrice: maxPrice,
    }) //to get all possible flights from departure place X
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (responseError) {
      console.log(responseError.code);
      res.send(responseError.code);
    });
});

var automatic = function (filter, data, iata, maxPrice) {
  cron.schedule('0 10 * * *', function () {
    console.log("running a Job every morning at 10 !");
    amadeus.client
      .get("/v1/shopping/flight-destinations", {
        origin: iata,
        maxPrice: maxPrice,
      }) //to get all possible flights from departure place X
      .then(function (response) {
        console.log("this is amadeus" + response.data[0].origin);
        var newData = [];
        for (var i = 0; i < response.data.length; i++) {
          var lucky = {
            origin: response.data[i].origin,
            destination: response.data[i].destination,
            departureDate: response.data[i].departureDate,
            returnDate: response.data[i].returnDate,
            price: response.data[i].price.total,
          };
          newData.push(lucky);
          
        }
        console.log(newData);
        var i=data.search.length-1
        data.search[i].result = newData;
        sendNewFlights.sendNewFlights(filter)

        User.findOneAndUpdate(filter, data)
        .then((items) => {
         
          console.log(5);
        });
      })

      .catch(function (responseError) {
        console.log("ALO");
      });
  });
};


module.exports.automatic = automatic;
