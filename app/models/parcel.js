import DS from 'ember-data';

export default DS.Model.extend({
  parcelId: DS.attr('string'),
  inDanger: DS.attr('boolean'),
  observations: DS.hasMany('observation'),
  cropInfos: DS.hasMany('crop-info'),
  soilTypes: DS.hasMany('soil-type'),
  soilConditions: DS.hasMany('soil-condition'),
  cropPhenologies: DS.hasMany('crop-phenology'),
  insects: DS.hasMany('insect'),
  diseases: DS.hasMany('disease'),
  weeds: DS.hasMany('weed'),
  abioticStresses: DS.hasMany('abiotic-stress'),
  fertilizers: DS.hasMany('fertilizer'),
  agrochemicals: DS.hasMany('agrochemical'),
  irrigations: DS.hasMany('irrigation'),
  yields: DS.hasMany('yield')
});
