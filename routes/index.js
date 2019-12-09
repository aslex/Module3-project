const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const Flat = require("../models/Flat");

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
  const filtered = listings[0].filter(el => {
    if (
      el.datasource_name == "Immobilienkontor" ||
      el.datasource_name == "ImmobilienScout24"
    ) {
      return true;
    }
    return false;
  });

  // console.log("THIS IS THE FILTERED LIST: ", filtered);
  return filtered;
  // filter out flats already contacted
};

const getFlats = searchObject => {
  console.log("SEARCH_OBJECT:", searchObject);
  const { minPrice, maxPrice, city, size, rooms, bathrooms } = searchObject;
  const neighborhoods = searchObject.neighborhoods;
  console.log("NEIGHBORHOODS:", neighborhoods);
  const features = searchObject.features;
  // const features = [minPrice, maxPrice, city, size, rooms, bathrooms];
  console.log("FEATURES:", features);
  let keywords = "";
  if (features.length > 0) {
    keywords = features
      .map(el => {
        return "keywords=" + el;
      })
      .join("&");
  }
  console.log("KEYWORDS:", keywords);
  // console.log("these are the mapped keywords: ", keywords);

  const searchEveryNeighborhood = neighborhoods.map(el => {
    return axios.get(
      `https://api.nestoria.de/api?encoding=json&pretty=1&action=search_listings&country=de&centre_point=	52.520008,13.404954,20km&place_name=${el}&listing_type=rent&sort=newest&price_min=${minPrice}&price_max=${maxPrice}&bedroom_min=${rooms}&bathroom_min=${bathrooms}&size_min=${size}&${keywords ||
        ""}`
    );
  });
  // console.log("PROMISES HEREEEEEEEEE: ", searchEveryNeighborhood);

  return Promise.all(searchEveryNeighborhood)
    .then(response => {
      const allListings = response.reduce((acc, el) => {
        return [el.data.response.listings, ...acc];
      }, []);
      console.log("this is what gets filtered: ", allListings);
      return filterData(allListings);
    })
    .catch(err => {
      console.log(err);
    });
};

const getContact = newFlats => {
  const getEachId = newFlats.map(el => {
    return axios.get(el.lister_url);
  });
  return Promise.all(getEachId)
    .then(res => {
      console.log('response foreach applied to this: ', res)
      let arrOfId = [];
      res.forEach(el => {
        let index = el.indexOf("https://www.immobilienscout24.de/expose");
        let exposeID = el.substring(index + 40, index + 49);
        arrOfId.push(exposeID);
      });
      console.log("EXPOSE ID HEREEEEEEE ", arrOfId);
    })
    .catch(err => {
      console.log(err);
    });
};

router.post("/api/submit", (req, res) => {
  console.log("back end request ----------- ", req.body);
  // req.user???
  const user = req.user;
  const search = req.body.search;
  console.log("USER: ", user, search);
  getFlats(search)
    .then(onlyImmoScout => {
      console.log("only immoscount listings: ", onlyImmoScout.length);

      let contactedFlats = user.contactedFlats.forEach(id => {
        return Flat.find({ _id: id }).then(flat => flat);
      });
      console.log("contacted flats: ", contactedFlats.length);

      const newFlats = onlyImmoScout.filter(flat => {
        if (contactedFlats) {
          return contactedFlats.forEach(obj => {
            if (obj.exposeURL == flat.lister_url) {
              return false;
            }
            return true;
          });
        } return true;
      });

      console.log("NEW FLATS ONLY : ", newFlats.length);

      getContact(newFlats);
      return res.json(null);
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
