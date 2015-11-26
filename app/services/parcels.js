import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  user: null,
  selectedParcels: null,

  init() {
    // Fake user
    var user = {
      parcels: [
        "ES52346237A00400032A",
        "ES52346237A00400294A",
        "ES52346237A00400075A"
      ],
      lastPosition: {
        lastX: -0.3,
          lastY: 39.3,
          zoom: 15
      },
      region: 'spain'
    };
    this.setUser(user);
    this.set('selectedParcels', []);
  },

  // =================================================================
  //          USER
  // =================================================================

  // Initialize de service with a new user
  setUser(model) {
    this.set('user', model);
  },

  // Useful when creating a new map
  getUserLastPosition() {
    return this.get('user.lastPosition');
  },

  // Store actual position on the database
  setUserLastPosition(position) {
    this.set('user.lastPosition', position);
  },

  // Useful for loading map layers
  getUserMapInfo() {
    return config.APP.regionLayers[this.get('user.region')];
  },

  // Retrieve user owned parcels
  getUserParcels() {
    return this.get('user.parcels');
  }

});
