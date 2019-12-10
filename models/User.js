const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    preferences: {
      city: String,
      size: Number,
      rooms: Number,
      bathrooms: Number,
      minPrice: Number,
      maxPrice: Number,
      features: Array,
      neighborhoods: Array
    },
    contactForm: {
      firstname: String,
      lastname: String,
      phoneNumber: Number,
      emailAddress: String,
      appointmentRequested: String,
      message: String,
      "address":{

        "@xsi.type": String,
        
        "street": String,
        
        "houseNumber": String,
        
        "postcode": String,
        
        "city": String
        
        },
      // contactMailCustomStyle: Boolean,
      moveInDate: Date,
      petsInHousehold: String,
      numberOfPersons: Number,
      employmentRelationship: String,
      income: Number,
      salutation: ['FEMALE', 'MALE', 'COMPANY', 'NO_SALUTATION'],
      schufaInformationProvided: ["YES", "NO"],
      // schufaVerificationCode: Boolean,
      sendProfile: String,
      // profileImageUrl: null,
      // privacyPolicyAccepted: Boolean,
      // company: null,
      // buyReason: null,
      ownCapital: Number,
      // hasPreapproval: null,
      // lotAvailable: null,
      // numberOfRequiredWorkingPlaces: null,
      // plannedInvestment: null,
      // commercialUsage: null,
      // applicationPackageCompleted: null

    },
    contactedFlats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Flat"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
