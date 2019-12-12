const cron = require("node-cron");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Flat = require("../models/Flat");
const { getFlats } = require("../routes/index");
const { filterContactedFlats } = require("../routes/index");
const { saveFlatData } = require("../routes/index");
const { getContact } = require("../routes/index");
const { sendEmail } = require("../routes/index");

const getDate = () => {
  console.log("TODAY", Date.now());
  let oneMonth = Date.parse("01 Feb 1970 00:00:00 GMT");
  console.log("one month in milliseconds: ", oneMonth);
};

const timedSearchMasterFunction = () => {
  User.find()
    .then(users => {
      // console.log(Date.parse(users.updated_at));
      const recentUsers = users.filter(user => {
        return Date.now() - Date.parse(user.updated_at) < 2678400000;
      });
      console.log("recent users: ", recentUsers);

      recentUsers.forEach(user => {
        if (
          user.preferences.city.toUpperCase() !== "BERLIN" ||
          !user.preferences
        ) {
          return;
        }

        console.log(user.preferences);

        getFlats(user.preferences).then(onlyImmoScout => {
          console.log(onlyImmoScout);

          filterContactedFlats(onlyImmoScout, user.contactedFlats).then(
            newFlats => {
              console.log("NEW FLATS ONLY : ", newFlats.length);

              saveFlatData(newFlats, user);

              getContact(newFlats).then(arrOfId => {
                console.log(
                  "emails will now be sent to ",
                  arrOfId.length,
                  " flats"
                );
                //---------- ACTUALLY SEND EMAILS TO LISTINGS -----------------
                 //return sendEmail(arrOfId, req.user._id)
                
              });
            }
          );
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

cron.schedule("0 0 */1 * * *", () => {
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  console.log("Master function running ", hour, min);
  timedSearchMasterFunction();
});

