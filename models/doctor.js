const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  Name: String,
  Profession: String,
  Adresse: String,
  City: String,
  Latitude: Number,
  Longitude: Number,
  Description: String,
  DoctoLink: String,
});

const Doctor = mongoose.model("pros", doctorSchema);

module.exports = Doctor;
