// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Flat = require("../models/Flat");

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/module3-project", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let apartments = [
  {
    size: 67,
    price: "€780",
    imageURL:
      "https://pictures.immobilienscout24.de/listings/7766f8d4-901e-459b-a33c-eb73d75f5cc2-1338837751.jpg/ORIG/legacy_thumbnail/1024x768/format/jpg/quality/80",
    exposeURL:
      "https://www.immobilienscout24.de/expose/114811901?referrer=HP_LAST_SEARCH#/",
    rooms: 2
  },
  {
    size: 76,
    price: "€1349",
    imageURL:
      "https://pictures.immobilienscout24.de/listings/5219df05-94b8-4a2b-8f2d-c8961e450a7a-1334429107.jpg/ORIG/legacy_thumbnail/1024x768/format/jpg/quality/80",
    exposeURL:
      "https://www.immobilienscout24.de/expose/114129230?referrer=RESULT_LIST_LISTING&navigationServiceUrl=%2FSuche%2Fcontroller%2FexposeNavigation%2Fnavigate.go%3FsearchUrl%3D%2FSuche%2Fde%2Fberlin%2Fberlin%2Fwohnung-mieten%26exposeId%3D114129230&navigationHasNext=true&navigationBarType=RESULT_LIST&searchId=81fdb290-5c4a-3069-a40f-c434ab7ddedc&searchType=district#/",
    rooms: 3
  }
];

Flat.create(apartments).then(flats => {
  console.log(flats.length + " flats were added");
  User.updateOne({ username: 'Alexandra'}, {contactedFlats: [flats._id]})
});

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt))
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
