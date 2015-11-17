import Ember from 'ember';

export default Ember.Service.extend({
  userLoggedIn: false,
  userId: null,

  init() {
    if( localStorage.userId ) {
      this.set('userId', localStorage.userId);
      this.set('userLoggedIn', true);
    }
  },

  logIn(id) {
    // Store session here
    localStorage.userId = id;
    this.set('userId', id);
    this.set('userLoggedIn', true);
  },

  logOut() {
    // Remove session here
    localStorage.removeItem('userId');
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
