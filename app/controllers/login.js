import $ from 'jquery';
import Ember from 'ember';

export default Ember.Controller.extend({
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
