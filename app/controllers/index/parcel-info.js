import Ember from 'ember';
import Moment from 'moment';
import * as dd from 'ermes-smart-app/models/static/products';
import * as cInfo from 'ermes-smart-app/models/static/crop-info';

export default Ember.Controller.extend({
  panelId: 'parcel-info',
  i18n: Ember.inject.service(),
  parcels: Ember.inject.service(),
  networkChecker: Ember.inject.service(),
  productsNames: Ember.computed('i18n.locale', function() {
    return dd.getProductsNames(this);
  }),
  cropTypes: Ember.computed('i18n.locale', function() {
    return cInfo.getCropTypes(this);
  }),
  riceVarieties: Ember.computed('i18n.locale', 'customVarieties.options.[]', function() {
    var defaultVarieties = cInfo.getRiceVarieties(this)[0].elements;
    var customVarieties = this.get('customVarieties.options').map((variety) => variety.toJSON());

    return defaultVarieties.concat(customVarieties);
  }),
  modelChange: Ember.on('init', Ember.observer('parcels.selectedParcels.[]', function () {
    this.set('parcelError', false);
    this.set('loading', true);

    var selectedParcels = this.get('parcels.selectedParcels').toArray();
    if (selectedParcels.length === 1) {
      let parcelId = selectedParcels[0];
      this.store.findRecord('customOption', 'cropInfos').then((customVarieties) => {
        this.set('customVarieties', customVarieties);
      });
      this.store.findRecord('parcel', parcelId).then((parcel) => {
        return parcel.reload();
      }).then((parcel) => {
        this.set('model', parcel);
      }).catch(() => {
        this.set('parcelError', true);
      }).finally(() => {
        this.set('loading', false);
      });
    } else {
      this.set('model', null); // Nº of parcels != 1, then decouple model
      this.set('loading', false);
    }
  })),
  cropInfo: Ember.computed('model', 'i18n.locale', function () {
    if (this.get('model') && this.get('model.cropInfos').get('firstObject')) {
      var cropInfo = this.get('model.cropInfos').get('firstObject');
      var cropTypes = this.get('cropTypes');
      var riceVarieties = this.get('riceVarieties');
      return {
        cropType: cropInfo.get('cropType') ? cropTypes.findBy('value', cropInfo.get('cropType')).text : '----',
        riceVariety: cropInfo.get('riceVariety') ? riceVarieties.findBy('value', cropInfo.get('riceVariety')).text : '----'
      };
    } else {
      return {
        cropType: '----',
        riceVariety: '----'
      };
    }
  }),
  parcel: Ember.computed('model', 'i18n.locale', function () {
    var model = this.get('model');
    var productsNames = this.get('productsNames');

    var parcel = [];
    model.eachRelationship((name, descriptor) => {
      //var product = model.get(name).get('first');
      var product = model.get(name).reduce((lastProduct, actualProduct) => {

        // First to reduce
        if (lastProduct === null) {
          return actualProduct;
        }

        // Get the last one
        return new Moment(lastProduct.get('uploadDate'), 'lll') > new Moment(actualProduct.get('uploadDate'), 'lll') ? lastProduct : actualProduct;
      }, null);
      parcel.push({name: productsNames.findBy('name', descriptor.type).text, lastDate: product ? product.get('uploadDate') : ''});
    });
    return parcel;
  })
});
