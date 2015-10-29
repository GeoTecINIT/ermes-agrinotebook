import $ from 'jquery';
import Ember from 'ember';

export default Ember.Controller.extend({
  languages: [
    {text: 'English', value: 'en', selected: true},
    {text: 'Español', value: 'sp'},
    {text: 'Italiano', value: 'it'},
    {text: 'Έλληνες', value: 'gk'}
  ],
  regions: [
    {text: 'Greece', value: "greece"},
    {text: 'Italy', value: "italy"},
    {text: 'Spain', value:"spain"}
  ],
  auth: Ember.inject.service('auth'),
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
    }
  }
});
