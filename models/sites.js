const mongoose = require('mongoose');

const SiteSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  }
});

const Site = module.exports = mongoose.model('Site', SiteSchema);
