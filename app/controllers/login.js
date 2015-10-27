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
  actions: {
    openPopup(popup) {
      $('#' + popup).popup('open');
    }
  }
});
