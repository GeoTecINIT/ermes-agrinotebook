import DS from 'ember-data';

export default DS.Model.extend({
  parcelId: DS.attr('string'),
  inDanger: DS.attr('boolean'),
  observations: DS.hasMany('observation'),
  weeds: DS.hasMany('weed'),
  diseases: DS.hasMany('disease'),
  insects: DS.hasMany('insect'),
  abioticStresses: DS.hasMany('abiotic-stress'),
  phenologies: DS.hasMany('crop-phenology'),
  agrochemicals: DS.hasMany('agrochemical'),
  fertilizers: DS.hasMany('fertilizer'),
  irrigationInfos: DS.hasMany('irrigation'),
  yields: DS.hasMany('yield'),
  cropInfos: DS.hasMany('crop-info'),
  parcelStatus: DS.hasMany('soil-condition'),
  soils: DS.hasMany('soil-type')
});
