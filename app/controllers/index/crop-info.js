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

  notIsRice: Ember.computed('model.cropType', function () {
    if (this.get('model.cropType') == 'rice') {
      return false;
    } else {
      this.get('model').setProperties({
        riceVariety: 'null',
        pudding: 'null',
        sowingPractice: 'null'
      });
      return true;
    }
  }),
  actions: {
    submit() {
      this.set('model.uploadingDate', new Date());
      // Transform date
      this.get('model').save();
    },
    selectChange(name, value) {
      this.get('model').set(name, value);
    }
  }
});
