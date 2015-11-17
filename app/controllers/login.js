import $ from 'jquery';
import Ember from 'ember';

export default Ember.Controller.extend({
  auth: Ember.inject.service(),
  actions: {
    openPopup(popup) {
      $('#' + popup).popup('open');
    },
    logIn() { // Check if another page was requested before this one
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
