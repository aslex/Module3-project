const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const Flat = require("../models/Flat");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const request = require("request-promise");

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
      // el.datasource_name == "Immobilienkontor" ||
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
      console.log("this is what gets filtered: ", allListings.flat());
      const flattenedListings = allListings.flat();
      return filterData(flattenedListings);
    })
    .catch(err => {
      console.log(err);
    });
};

function hash_function_sha1(base_string, key) {
  return crypto
    .createHmac("sha1", key)
    .update(base_string)
    .digest("base64");
}

const oauth = OAuth({
  consumer: { key: process.env.SYSTEM_KEY, secret: process.env.API_SECRET },
  signature_method: "HMAC-SHA1",
  hash_function: hash_function_sha1
});

const token = {
  key: process.env.ACCESS_TOKEN,
  secret: process.env.TOKEN_SECRET
};

const getContact = newFlats => {
  const getEachId = newFlats.map(el => {
    return axios.get(el.lister_url, { validateStatus: false });
  });
  return Promise.all(getEachId)
    .then(res => {
      if (res.status == 404) {
        return;
      }
      console.log("response foreach applied to this: ", res[0].data);
      let arrOfId = [];
      res.forEach(el => {
        if (el.status === 404) {
          return;
        }
        let index = el.data.indexOf("https://www.immobilienscout24.de/expose");
        let exposeID = el.data.substring(index + 40, index + 49);
        if (exposeID) {
          arrOfId.push(exposeID);
        }
      });
      console.log("EXPOSE ID HEREEEEEEE ", arrOfId);
      // const headers = {
      //   Accept: "application/json",
      //   "Content-Type": "application/json"
      // };
      const messageBody = {
        "expose.contactForm": {
          "@xmlns": {
            common: "http://rest.immobilienscout24.de/schema/common/1.0"
          },
          firstname: "firstname",
          lastname: "lastname",
          phoneNumber: "phoneNumber",
          emailAddress: "emailAddress@mail.de",
          appointmentRequested: "YES",
          message: "message",
          address: {
            "@xsi.type": "common:Address",
            street: "street",
            houseNumber: "houseNumber",
            postcode: "12345",
            city: "city"
          },
          salutation: "FEMALE"
        }
      };
      const contactList = arrOfId.map((el, i) => {
        const requestData = {
          url: `https://rest.immobilienscout24.de/restapi/api/search/v1.0/expose/${el}/contact`,
          method: "POST",
          data: messageBody
        };

        return request({
          url: `https://rest.immobilienscout24.de/restapi/api/search/v1.0/expose/${el}/contact`,
          method: "POST",
          form: oauth.authorize(requestData, token),
          json: true
        });
      });
      let b;
      return Promise.all(contactList).then(res => {
        console.log(res);
      });
    })
    .catch(err => {
      console.log("WITH HEADERS", err);
    });
};

const savePreferences = (user, search) => {
  User.updateOne(
    { _id: user._id },
    { preferences: search },
    { new: true }
  ).then(updated => {
    console.log("THIS IS THE UPDATED USER DOCUMENT: ", updated);
  });
};

router.post("/api/submit", (req, res) => {
  console.log("SEARCH req.body ----------- ", req.body);

  const user = req.user;
  const search = req.body.search;
  // const contactForm = req.body.contactForm;
  savePreferences(user, search);

  console.log("USER: ", user, search);
  getFlats(search)
    .then(onlyImmoScout => {
      console.log("only immoscout listings: ", onlyImmoScout.length);
      console.log(user.contactedFlats);

      // let allIds = user.contactedFlats
      // let alreadyContacted =
      //   Flat.find({ _id: { $all: allIds } })
      //   .then(flat => flat);

      // console.log("contacted flats: ", alreadyContacted.length);

      // const newFlats = onlyImmoScout.filter(flat => {
      //   if (alreadyContacted) {
      //     return contactedFlats.forEach(obj => {
      //       if (obj.exposeURL == flat.lister_url) {
      //         return false;
      //       }
      //       return true;
      //     });
      //   } return true;
      // });

      // console.log("NEW FLATS ONLY : ", newFlats.length);

      getContact(onlyImmoScout);
      return res.json(null);
    })

    .catch(err => {
      console.log(err);
    });
});

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

router.put("/profile/update-preferences", (req, res) => {
  console.log("request to update:", req.body, "user: ", req.user);
  const {
    city,
    size,
    rooms,
    bathrooms,
    minPrice,
    maxPrice,
    features,
    neighborhoods
  } = req.body.settings;
  User.updateOne(
    { _id: req.user._id },
    {
      preferences: {
        city,
        size,
        rooms,
        bathrooms,
        minPrice,
        maxPrice,
        features,
        neighborhoods
      }
    },
    { new: true }
  ).then(newUser => {
    console.log("NEW USER: ", newUser);
    res.json({
      newUser: newUser,
      message: "Your preferences have been updated!"
    });
  });
});

module.exports = router;
