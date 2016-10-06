import $ from 'jquery';
import Ember from 'ember';

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),

  pageTitle: Ember.computed('i18n.locale', function() {
    return this.get('i18n').t('fields.header.title');
  }),
  productsMenuDisabled: Ember.computed('editMode', 'model', function () {
    return  this.get('model.type') === 'guest' || this.get('editMode')
  }),
  freeObservationDisabled: Ember.computed.alias('editMode'),
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
    openProductsMenu() {
      var openedPanel = this.get('openedPanel');
      if (openedPanel && openedPanel !== 'none') {
        this.transitionToRoute('index');
      }

      this.send('openPopup', 'ermes-menu-fields');
    },
    openPopup(popup) {
      $('#' + popup).popup('open');
    },
    cannotEdit() {
      this.transitionToRoute('index.cannot-edit');
    }
  },
  init() {
    this._super();
    document.title = this.get('pageTitle');
  }
});
