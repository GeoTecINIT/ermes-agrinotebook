import $ from 'jquery';
import Ember from 'ember';

export default Ember.Controller.extend({
  auth: Ember.inject.service(),
  actions: {
    openPopup(popup) {
      $('#' + popup).popup('open');
    },
    logIn() {
      var auth = this.get('auth');
      auth.logIn('a4g5a1wae8');

      var previous = this.get('previousTransition');
      if (previous) {
        this.set('previousTransition', null);
        previous.retry();
      } else {
        this.transitionToRoute('index');
      }
    },
    signUp() {

    }
  }
});
