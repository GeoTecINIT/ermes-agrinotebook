import $ from 'jquery';
import Ember from 'ember';

export default Ember.Controller.extend({
  pageTitle: "General view",
  actions: {
    showPanel(name) {
      Ember.debug(name);
    },
    openPopup(popup) {
      $('#' + popup).popup('open');
    }
  },
  init() {
    this._super();
    document.title = this.get('pageTitle');
  }
});
