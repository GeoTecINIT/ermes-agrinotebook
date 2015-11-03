import $ from 'jquery';
import Ember from 'ember';

export default Ember.Controller.extend({
  pageTitle: "General view",
  actions: {
    showPanel(name) {

      // If the action points to the same panel in which actually I am route to index instead
      var actionData = name.split('.');
      if(actionData[1] === this.get('openedPanel')){
        this.set('openedPanel', 'none');
        this.transitionToRoute('index');
      } else {
        this.transitionToRoute(name);
      }
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
