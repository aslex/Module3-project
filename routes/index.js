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

router.post("/api/submit", (req, res) => {
  console.log("back end request ----------- ", req.body);
  const { minPrice, maxPrice, city, size, rooms, bathrooms } = req.body.search;
//   const neighborhoods = req.body.neighborhoods;

// neighborhoods.forEach(place => {

// })

  axios
    .get(
      `https://api.nestoria.de/api?encoding=json&pretty=1&action=search_listings&country=de&place_name=${city}&listing_type=rent&price_min=${minPrice}&price_max=${maxPrice}&bedroom_min=${rooms}&bathroom_min=${bathrooms}&size_min=${size}`
    )
    .then(response => {
      console.log("loooooook --------", response.data);
      res.json(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

// router.post("/search/area", res => {
//   console.log(res);
//   // const lat = res.body
//   axios.get(
//     "https://rest.immobilienscout24.de/restapi/api/search/v1.0/search/radius?realestatetype=apartmentrent&geocoordinates=52.518500;13.404760;10"
//   );
// });

module.exports = router;
