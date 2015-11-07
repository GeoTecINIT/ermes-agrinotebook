import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/crop-phenology';

export default Ember.Controller.extend({
  panelId: 'crop-phenology',
  i18n: Ember.inject.service(),
  developmentStages: Ember.computed('i18n.locale', function() {
    return dd.getDevelopmentStages(this);
  }),
  phenologyGrowth: Ember.computed('i18n.locale', function() {
    return dd.getPhenologyGrowth(this);
  }),
  phenologyCodes: Ember.computed('i18n.locale', function() {
    return dd.getPhenologyCodes(this);
  }),
  actualPhenologyGrowth: 'null:',
  actualPhenologyCodes: Ember.computed('i18n.locale', 'actualPhenologyGrowth', function() {
    let growth = this.get('actualPhenologyGrowth').split(':')[0];
    return this.get('phenologyCodes')['cod_'+growth];
  }),
  actions: {
    submit() {

    }
  }
});
