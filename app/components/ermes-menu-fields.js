import JqmPopup from 'ember-jquery-mobile/components/jqm-popup';

export default JqmPopup.extend({
  id: 'ermes-menu-fields',
  theme: 'c',
  transition: 'slidedown',
  products: [
    { text: 'Crop Info', panel: 'crop-info'},
    { text: 'Soil Type', panel: 'soil-type'},
    { text: 'Soil Condition', panel: 'soil-condition'},
    { text: 'Crop Phenology', panel: 'crop-phenology'},
    { text: 'Pathogens', panel: 'pathogens'},
    { text: 'Diseases', panel: 'diseases'},
    { text: 'Weeds', panel: 'weeds'},
    { text: 'Fertilizers', panel: 'fertilizers'},
    { text: 'Agrochemicals', panel: 'agrochemicals'},
    { text: 'Irrigation', panel: 'irrigation'},
    { text: 'Yield', panel: 'yield'}
  ]
});
