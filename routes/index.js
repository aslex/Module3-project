const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const Flat = require("../models/Flat");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const request = require("request-promise");
const oauthSignature = require("oauth-signature");

/* GET home page */
router.get("/", (req, res, next) => {

  res.render("index");
});

// BEGIN POST REQUEST CODE

const sendEmail = (arrOfId, userId) => {
  User.findOne({ _id: userId }).then(user => {
    const { contactForm } = user;
    const requests = [];

    let i = 1;
    while (i <= arrOfId.length) {
      const nonce = () => {
        const nonceLen = 32;
        return crypto
          .randomBytes(Math.ceil((nonceLen * 3) / 4))
          .toString("base64") // convert to base64 format
          .slice(0, nonceLen) // return required number of characters
          .replace(/\+/g, "0") // replace '+' with '0'
          .replace(/\//g, "0"); // replace '/' with '0'
      };

      const signParameters = (
        method,
        url,
        {
          oauth_token,
          oauth_consumer_key,
          oauth_consumer_secret,
          oauth_token_secret
        },
        parameters = {}
      ) => {
        const urlParams = Object.assign(
          {},
          {
            oauth_consumer_key,
            oauth_nonce: nonce(),
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: Math.floor(Date.now() / 1000),
            oauth_token: oauth_token,
            oauth_version: "1.0"
          },
          parameters
        );

        urlParams.oauth_signature = encodeURIComponent(
          oauthSignature.generate(
            method,
            url,
            urlParams,
            oauth_consumer_secret,
            oauth_token_secret,
            { encodeSignature: false }
          )
        );

        return urlParams;
      };

      const requestData = {
        method: "POST",
        url: `https://rest.immobilienscout24.de/restapi/api/search/v1.0/expose/${arrOfId[i]}/contact`,
        form: contactForm
      };

      const signed = signParameters(requestData.method, requestData.url, {
        oauth_token: process.env.ACCESS_TOKEN,
        oauth_consumer_key: process.env.SYSTEM_KEY,
        oauth_consumer_secret: process.env.API_SECRET,
        oauth_token_secret: process.env.TOKEN_SECRET
      });

      let authorizationHeader = `${Object.keys(signed).reduce(
        (acc, val, i, arr) =>
          acc.concat(`${val}="${signed[val]}"${i < arr.length - 1 ? "," : ""}`),
        "OAuth "
      )}`;

      var options = {
        method: "POST",
        url: `https://rest.immobilienscout24.de/restapi/api/search/v1.0/expose/${arrOfId[i]}/contact`,
        headers: {
          Authorization: authorizationHeader,
          "Content-Type": "application/json"
        },
        body: contactForm,
        json: true
      };

      i++;
      requests.push(
        request(options)
          .then(response => {
            console.log("YOU DID IT ========= !!!!!!!!  ", response);
            return response.data;
          })
          .catch(err => {
            console.log(err);
          })
      );
    }

    Promise.all(requests).then(responses => {
      console.log(responses);
    });
  });
};

//END POST REQUEST CODE

const saveFlatData = (listings, user) => {
  listings.forEach(flat => {
    //need to filter to not create multiple documents for same flat
    Flat.findOne({ exposeURL: flat.lister_url })
      .then(found => {
        if (!found) {
          return Flat.create({
            size: flat.size,
            price: flat.price_formatted,
            imageURL: flat.img_url,
            exposeURL: flat.lister_url,
            rooms: flat.bedroom_number
          }).then(newflat => {
            // console.log("NEW FLAT CREATED", newflat);
            return User.updateOne(
              { _id: user._id },
              { $push: { contactedFlats: newflat._id } }
            ).then(data => {
              // console.log(data);
            });
          });
        }
      })
      .catch(err => {
        console.log("error in saveFlatData ", err);
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
  return Promise.all(getEachId).then(res => {
    if (res.status == 404) {
      return;
    }
    // console.log("response foreach applied to this: ", res[0].data);
    let arrOfId = [];
    res.forEach(el => {
      if (el.status === 404) {
        return;
      }
      let index = el.data.indexOf("https://www.immobilienscout24.de/expose");
      let exposeID = parseInt(el.data.substring(index + 40, index + 49));
      if (exposeID) {
        arrOfId.push(exposeID);
      }
    });
    console.log("EXPOSE ID HEREEEEEEE ", arrOfId);
    return arrOfId;
  });
};

const savePreferences = (user, search) => {
  console.log("save preferences called -user: ", user, " -search: ", search);
  const {
    city,
    size,
    rooms,
    bathrooms,
    minPrice,
    maxPrice,
    features,
    neighborhoods
  } = search;
  const {
    firstname,
    lastname,
    phoneNumber,
    appointmentRequested,
    emailAddress,
    street,
    houseNumber,
    postcode
  } = search;

  User.updateOne(
    { _id: user._id },
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
      },
      contactForm: {
        firstname,
        lastname,
        phoneNumber,
        appointmentRequested,
        emailAddress,
        address: {
          street,
          houseNumber,
          postcode
        }
      }
    },
    { new: true }
  ).then(updated => {
    console.log("user document has been updated", updated);
  });
};

const filterContactedFlats = (onlyImmoScout, allIds) => {
  return Flat.find({ _id: { $in: allIds } })
    .then(alreadyContacted => {
      // console.log(flats) => array of all the flats
      console.log("contacted flats: ", alreadyContacted.length);
      const newFlats = onlyImmoScout.filter(flat => {
        if (alreadyContacted) {
          for (let i = 0; i < alreadyContacted.length; i++) {
            const obj = alreadyContacted[i];
            if (obj.exposeURL == flat.lister_url) {
              return false;
            }
          }
          return true;
        }
        return true;
      });

      return newFlats;
    })
    .catch(err => {
      console.log(err);
    });
};

router.post("/api/submit", (req, res) => {
  console.log("SEARCH req.body ----------- ", req.body);

  const user = req.user;
  const search = req.body.search;
  // const contactForm = req.body.search.contactForm;
  savePreferences(user, search);

  console.log("USER: ", user, search);
  getFlats(search)
    .then(onlyImmoScout => {
      // console.log("only immoscout listings: ", onlyImmoScout.length);
      // console.log(user.contactedFlats);

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

      // newFlats is filtered from the contacted flats



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
