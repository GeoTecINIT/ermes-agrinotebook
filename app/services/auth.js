import Ember from 'ember';

export default Ember.Service.extend({
  i18n: Ember.inject.service(),

  userLoggedIn: false,
  userId: null,
  token: null,

  init() {
    if( localStorage.token && localStorage.userId ) {
      this.set('userId', localStorage.userId);
      this.set('token', localStorage.token);
      this.set('userLoggedIn', true);
      if (localStorage.lang) {
        this.get('i18n').set('locale', localStorage.lang);
      }
    }
  },

  logIn(id, token, lang) {
    // Store session here
    localStorage.userId = id;
    localStorage.token = token;
    localStorage.lang = lang;
    this.set('userId', id);
    this.set('token', token);
    this.set('userLoggedIn', true);
    this.get('i18n').set('locale', lang);
  },

  logOut() {
    // Remove session here
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('lang');
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
