import Ember from 'ember';

export default Ember.Service.extend({
  userLoggedIn: null,
  userId: null,

  init() {
    if( true ) {
      this.set('userLoggedIn', false);
    } else {
      this.set('userLoggedIn', false);
    }
  },

  logIn(id) {
    // Store session here
    Ember.debug("User with ID: " + id + " has logged in");
    this.set('userId', id);
    this.set('userLoggedIn', true);
  },

  logOut() {
    // Remove session here
    Ember.debug("User logged out");
    this.set('userLoggedIn', false);
    this.set('userId', null);
  },

  getCurrentUserToken() {
    return this.get('userId');
  },

  isAuth() {
    return this.get('userLoggedIn');
  }
});
