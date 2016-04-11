import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  user: null,
  selectedParcels: null,
  searchedParcel: null,

  init() {
    this.set('selectedParcels', []);
  },

  // =================================================================
  //          USER
  // =================================================================

  setUser(user) {
    this.set('user', user);
    this.set('selectedParcels', []);
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
