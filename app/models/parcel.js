import DS from 'ember-data';

export default DS.Model.extend({
  parcelId: DS.attr('string'),
  inDanger: DS.attr('boolean'),
  abioticStresses: DS.hasMany('abiotic-stress'),
  agrochemicals: DS.hasMany('agrochemical'),
  cropInfos: DS.hasMany('crop-info'),
  cropPhenologies: DS.hasMany('crop-phenology'),
  diseases: DS.hasMany('disease'),
  fertilizers: DS.hasMany('fertilizer'),
  insects: DS.hasMany('insect'),
  irrigations: DS.hasMany('irrigation'),
  observations: DS.hasMany('observation'),
  soilConditions: DS.hasMany('soil-condition'),
  soilTypes: DS.hasMany('soil-type'),
  weeds: DS.hasMany('weed'),
  yields: DS.hasMany('yield')
});
