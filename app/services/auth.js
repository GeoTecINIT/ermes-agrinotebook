import Ember from 'ember';

export default Ember.Service.extend({
  userLoggedIn: false,
  userId: null,
  token: null,

  init() {
    if( localStorage.token && localStorage.userId ) {
      this.set('userId', localStorage.userId);
      this.set('token', localStorage.token);
      this.set('userLoggedIn', true);
    }
  },

  logIn(id, token) {
    // Store session here
    localStorage.userId = id;
    localStorage.token = token;
    this.set('userId', id);
    this.set('token', token);
    this.set('userLoggedIn', true);
  },

  logOut() {
    // Remove session here
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.set('userLoggedIn', false);
    this.set('userId', null);
    this.set('token', null);
  },

  getCurrentUserId() {
    return this.get('userId');
  },

  isAuth() {
    return this.get('userLoggedIn');
  }
});
