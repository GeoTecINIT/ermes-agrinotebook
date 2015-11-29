import DS from 'ember-data';

export default DS.Model.extend({
  parcelId: DS.attr('string'),
  observations: DS.hasMany('observation'),
  weeds: DS.hasMany('weed'),
  diseases: DS.hasMany('disease'),
  phatogens: DS.hasMany('pathogen'),
  phenologies: DS.hasMany('crop-phenology'),
  agrochemicals: DS.hasMany('agrochemical'),
  fertilizers: DS.hasMany('fertilizer'),
  irrigationInfos: DS.hasMany('irrigation'),
  yields: DS.hasMany('yield'),
  cropInfos: DS.hasMany('crop-info'),
  parcelStatus: DS.hasMany('soil-condition'),
  soils: DS.hasMany('soil-type')
});
