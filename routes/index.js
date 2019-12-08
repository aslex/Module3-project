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

router.get("/profile/:id", (req, res, next) => {
  console.log("req params hereeeeeeee", req.params);
  // get listings from user.contactedFlats
  const id = req.params.id;
  User.findOne({ _id: id })
    .then(foundUser => {
      console.log(foundUser);
      const allFlats = foundUser.contactedFlats.map(el => {
        return Flat.findOne({ _id: el });
      });
      return Promise.all(allFlats).then(response => {
        console.log("RESPONSE: ", response);
        res.json(response);
      });
    })
    .catch(err => {
      console.log(err);
    });
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
  // console.log("getFLats is called", searchObject);
  const { minPrice, maxPrice, city, size, rooms, bathrooms } = searchObject;
  const neighborhoods = searchObject.neighborhoods;
  const features = searchObject.features;
  let keywords = "";
  if (features.length > 0) {
    keywords = features
      .map(el => {
        return "keywords=" + el;
      })
      .join("&");
  }
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
      // console.log("this is what gets filtered: ", allListings);
      return filterData(allListings);
    })
    .catch(err => {
      console.log(err);
    });
};

const getContact = newFlats => {
  // newFlats.forEach(el => {
  axios
    .get(
      "https://www.nestoria.de/detail/0000000112781900250594699/title/5/1-2?serpUid=&pt=1&ot=2&l=mitte&did=7_default&t_sec=9&t_or=45&t_pvid=null&utm_source=api&utm_medium=external"
    )
    .then(res => {
      console.log(
        "just the head: ",
        res.data.document.getElementbyTagName("head")
      );

      console.log(res.data);
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
      let contactedFlats = user.contactedFlats.forEach(id => {
        return Flat.find({ _id: id }).then(flat => flat);
      });
      console.log(".........", contactedFlats);

      const newFlats = onlyImmoScout.filter(flat => {
        if (contactedFlats) {
          return contactedFlats.forEach(obj => {
            if (obj.exposeURL == flat.lister_url) {
              return false;
            }
            return true;
          });
        } else return true;
      });

      console.log("NEW FLATS ONLY : ", newFlats);
      // getContact(newFlats)
      getContact(); //this is not working
      return res.json(null);
    })

    // const newFlats = onlyImmoScout.filter(el => {
    //   if (found.contactedFlats.includes(el.lister_url)) {
    //     return false;
    //   }
    //   return true;
    // });
    .catch(err => {
      console.log(err);
    });

  // getFlats(req.body)
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
