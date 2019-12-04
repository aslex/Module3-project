const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
  // axios
  //   .get(
  //     "https://rest.immobilienscout24.de/restapi/security/oauth/request_token"
  //   )
  //   .then(res => {
  //     console.log(res);
  //     axios.get(
  //       `https://rest.immobilienscout24.de/restapi/security/oauth/confirm_access?oauth_token=${res.data}`
  //     );
  //   });

  res.render("index");
});

router.post("/form1", (req, res) => {
  console.log(req.body);
  res.redirect("/form2");
});

// router.post("/search/area", res => {
//   console.log(res);
//   // const lat = res.body
//   axios.get(
//     "https://rest.immobilienscout24.de/restapi/api/search/v1.0/search/radius?realestatetype=apartmentrent&geocoordinates=52.518500;13.404760;10"
//   );
// });

module.exports = router;
