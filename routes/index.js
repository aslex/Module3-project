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
  const neighborhoods = req.body.search.neighborhoods;
  const features = req.body.search.features;
  console.log(neighborhoods, features);
  const keywords = features
    .map(el => {
      return "keywords=" + el;
    })
    .join("&");
  console.log("this is the maped keywords: ", keywords);

  neighborhoods.forEach(place => {
    axios
      .get(
        `https://api.nestoria.de/api?encoding=json&pretty=1&action=search_listings&country=de&centre_point=	52.520008,13.404954,20km&place_name=${place}&listing_type=rent&sort=newest&price_min=${minPrice}&price_max=${maxPrice}&bedroom_min=${rooms}&bathroom_min=${bathrooms}&size_min=${size}&${keywords ||
          " "}`
      )
      .then(response => {
        // console.log("For each neighborhood: ", response.data.response.listings);

        const filteredSearch = response.data.response.listings.filter(el => {
          if (
            el.datasource_name == "Immobilienkontor" ||
            el.datasource_name == "ImmobilienScout24"
          ) {
            return true;
          }
          return false;
        });
        console.log("filtered ARRAY: ", filteredSearch);
        res.json(filteredSearch);
        // filteredSearch.forEach(flat => {
        //   Flat.create(flat)
        //   .then( newflat => {

        //   });
        //   )
        // })
      })
      .catch(err => {
        console.log(err);
      });
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
