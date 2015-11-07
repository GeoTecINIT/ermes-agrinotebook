import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/crop-info';

export default Ember.Controller.extend({
  panelId: 'crop-info',
  i18n: Ember.inject.service(),
  cropTypes: Ember.computed('i18n.locale', function() {
    return dd.getCropTypes(this);
  }),
  riceVarieties: Ember.computed('i18n.locale', function() {
    return dd.getRiceVarieties(this);
  }),
  puddings: Ember.computed('i18n.locale', function() {
    return dd.getPuddings(this);
  }),
  sowingPractices: Ember.computed('i18n.locale', function() {
    return dd.getSowingPractices(this);
  }),
  actions: {
    submit() {

    }
  }
});
