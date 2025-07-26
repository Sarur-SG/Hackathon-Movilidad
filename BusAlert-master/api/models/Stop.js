const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema({
  name: String, // Nombre de la parada
  location: {
    lat: Number,
    lng: Number
  },
  busAvailable: Boolean // True si hay un autobús en la parada
});

module.exports = mongoose.model('Stop', StopSchema);
