const cron = require("node-cron");
const express = require("express");
const User = require("../models/User");
const Flat = require("../models/Flat");
const getFlats = require("../routes/index");
const saveFlatData = require("../routes/index");



const timedSearchMasterFunction = () => {
  User.find().then(users => {
    console.log("here ---- +++++++ ------- ", users);

    // const month = new Date().getMonth()+1;
    // const day = new Date().getDate();
    // const year = new Date().getFullYear();
    // console.log(  `${year}-${month}-${day}`)
    // users.forEach(el =>    console.log(el.updated_at))
    // users.filter(user => {
    //   return ( today.getDate() - user.updated_at )
    // })
    users.forEach(user => {

        if (!user.preferences.city.toUpperCase() !== 'BERLIN') {
          return;
        }

        getFlats(user.preferences).then(onlyImmoScout => {
          console.log(onlyImmoScout);
          filterContactedFlats(onlyImmoScout, user.contactedFlats).then(
            newFlats => {
              console.log("NEW FLATS ONLY : ", newFlats.length);
              saveFlatData(newFlats, user);

              getContact(newFlats).then(arrOfId => {
                console.log("emails will now be sent to ", arrOfId.length, " flats");

                //---------- UNCOMMENT THIS TO ACTUALLY SEND EMAILS TO LISTINGS -----------------
                // sendEmail(arrOfId, req.user._id)
                return res.json(null);
              });
            }
          );
        });
      })

    // saveFlatData();
  })      .catch(err => {
    console.log(err);
  });
};


cron.schedule('* * */1  * *', () => {
    console.log('NODECRON working every hour?');

    timedSearchMasterFunction();
});

// cron.schedule('1 * * * * *', () => {
//     console.log('TESTING NODECRON')
// })