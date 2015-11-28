import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  developmentStage: DS.attr('string'),
  growthStage: DS.attr('string'),
  code: DS.attr('string'),
  parcels: MF.array('string')
});
