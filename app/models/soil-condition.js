import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';
import Moment from 'moment';
import config from '../config/environment';

var fDate = config.APP.defaultDateFormat;

export default ProductModel.extend({
  uploadingDate: DS.attr('date'),
  parcelStatus: DS.attr('string', { defaultValue() { return 'bare-soil'; }}),
  observationDate: DS.attr('user-date', { defaultValue() { return new Moment().format(fDate); }}),
  parcels: MF.array('string')
});
