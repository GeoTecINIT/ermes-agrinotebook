import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/crop-phenology';
import ProductUploadRDate from 'ermes-smart-app/mixins/product-upload-rdate';

export default Ember.Controller.extend(ProductUploadRDate, {
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
  actualPhenologyCodes: Ember.computed('i18n.locale', 'model.growthStage', function() {
    let growth = this.get('model.growthStage');
    return this.get('phenologyCodes')['cod_'+growth];
  }),
  hasNoStage: Ember.computed('model.growthStage', function () {
    return this.get('model.growthStage') === 'null';
  })
});
