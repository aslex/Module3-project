const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");

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

const saveFlatData = listings => {
  // const userId =
  //   User.findOne({_id: }).then(foundUser => {
  //   foundUser.contactedFlats.push(newFlat._id)
  // })
  listings.forEach(flat => {
    Flat.create({
      size: flat.size,
      price: flat.price_formatted,
      imageURL: flat.img_url,
      exposeURL: flat.lister_url,
      rooms: flat.bedroom_number
    }).then(newflat => {
      User.updateOne(
        { _id: userId },
        { contactedFlats: [newflat, ...contactedFlats] }
      );
    });
  });
};

const filterData = listings => {
  const filtered = listings.filter(el => {
    if (
      el.datasource_name == "Immobilienkontor" ||
      el.datasource_name == "ImmobilienScout24"
    ) {
      return true;
    }
    return false;
  });
  console.log("THIS IS THE FILTERED LIST: ", filtered);
  // filter out flats already contacted
};

const getFlats = searchObject => {
  console.log("getFLats is called", searchObject);
  const {
    minPrice,
    maxPrice,
    city,
    size,
    rooms,
    bathrooms
  } = searchObject.search;
  const neighborhoods = searchObject.search.neighborhoods;
  const features = searchObject.search.features;
  let keywords = "";
  if (features.length > 0) {
    keywords = features
      .map(el => {
        return "keywords=" + el;
      })
      .join("&");
  }
  console.log("these are the mapped keywords: ", keywords);
  if (neighborhoods.length == 1) {
    return axios
      .get(
        `https://api.nestoria.de/api?encoding=json&pretty=1&action=search_listings&country=de&centre_point=	52.520008,13.404954,20km&place_name=${
          neighborhoods[0]
        }&listing_type=rent&sort=newest&price_min=${minPrice}&price_max=${maxPrice}&bedroom_min=${rooms}&bathroom_min=${bathrooms}&size_min=${size}&${keywords ||
          ""}`
      )
      .then(res => {
        console.log(res.data.response.listings);
        filterData(res.data.response.listings);
      });
  }
  if (neighborhoods.length > 1) {
    console.log("neighborhoods greater than 1");
    neighborhoods.forEach(place => {
      axios
        .get(
          `https://api.nestoria.de/api?encoding=json&pretty=1&action=search_listings&country=de&centre_point=	52.520008,13.404954,20km&place_name=${place}&listing_type=rent&sort=newest&price_min=${minPrice}&price_max=${maxPrice}&bedroom_min=${rooms}&bathroom_min=${bathrooms}&size_min=${size}&${keywords ||
            ""}`
        )
        .then(response => {
          console.log("axios response: ", response.data.response.listings);
          filterData(response.data.response.listings);
        });
    });
  }
};

router.post("/api/submit", (req, res) => {
  console.log("back end request ----------- ", req.body);
  // req.user???
  getFlats(req.body);
  return res.json(null);

  // const { minPrice, maxPrice, city, size, rooms, bathrooms } = req.body.search;
  // const neighborhoods = req.body.search.neighborhoods;
  // const features = req.body.search.features;
  // console.log(neighborhoods, features);
  // const keywords = features
  //   .map(el => {
  //     return "keywords=" + el;
  //   })
  //   .join("&");
  // console.log("these are the mapped keywords: ", keywords);

  neighborhoods
    .forEach((place, index) => {
      // set timeout?
      axios
        .get(
          `https://api.nestoria.de/api?encoding=json&pretty=1&action=search_listings&country=de&centre_point=	52.520008,13.404954,20km&place_name=${place}&listing_type=rent&sort=newest&price_min=${minPrice}&price_max=${maxPrice}&bedroom_min=${rooms}&bathroom_min=${bathrooms}&size_min=${size}&${keywords ||
            " "}`
        )
        .then(response => {
          console.log("THIS IS THE RESPONSE", response);
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
          // .filter(el => {
          //   if (Flat.find( req.user.contactedFlats{ lister_url: el.lister_url})
          // });
          //make sure we only contact new flats

          console.log("filtered ARRAY: ", filteredSearch);
          // res.json(filteredSearch);
          // filteredSearch.forEach(flat => {
          //   Flat.create(flat)
          //   .then( newflat => {

          //   });
          //   )
          // })
        });
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

router.get("/profile", (req, res) => {
  // const id = req.params.id;
  // console.log(req.user)
  //const id = req.user._id;
  // console.log(id)
  // User.findById(id)
  // .then(response => {
  //   console.log(response);
  //   res.json(response);
  // });

  User.findById(req.user._id)
    .populate("contactedFlats")
    .then(user => {
         res.json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
