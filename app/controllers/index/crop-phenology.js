import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/crop-phenology';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ProductRequiredDate from 'ermes-smart-app/mixins/product-required-date';
import ProductParcelCheck from 'ermes-smart-app/mixins/product-parcel-check';

export default Ember.Controller.extend(ProductUpload, ProductParcelCheck, ProductRequiredDate, {
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
