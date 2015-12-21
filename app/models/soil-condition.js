import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';
import Moment from 'moment';
import config from '../config/environment';

var fDate = config.APP.defaultDateFormat;

export default ProductModel.extend({
  parcelStatus: DS.attr('string', { defaultValue() { return 'bare-soil'; }}),
  date: DS.attr('user-date', { defaultValue() { return new Moment().format(fDate); }}),
  uploadingDate: DS.attr('date'),
  parcels: MF.array('string')
});
