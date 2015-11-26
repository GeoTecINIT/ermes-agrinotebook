import $ from 'jquery';
import Ember from 'ember';

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),
  pageTitle: Ember.computed('i18n.locale', function() {
    return this.get('i18n').t('fields.header.title');
  }),
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
    //var classes = $($.mobile.activePage).attr('class').split(' ');
    //if (!'ember-view' in classes) {
    //  console.debug('I have to render this')
    //}
  }
});
