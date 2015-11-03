import $ from 'jquery';
import Ember from 'ember';

export default Ember.Controller.extend({
  pageTitle: "General view",
  actions: {
    showPanel(name) {
      this.transitionToRoute(name);
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
