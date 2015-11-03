import $ from 'jquery';
import JqmPopup from 'ember-jquery-mobile/components/jqm-popup';

export default JqmPopup.extend({
  id: 'ermes-menu-fields',
  theme: 'c',
  transition: 'slidedown',
  products: [
    { text: 'Crop Info', panel: 'index.crop-info'},
    { text: 'Soil Type', panel: 'index.soil-type'},
    { text: 'Soil Condition', panel: 'index.soil-condition'},
    { text: 'Crop Phenology', panel: 'index.crop-phenology'},
    { text: 'Pathogens', panel: 'index.pathogens'},
    { text: 'Diseases', panel: 'index.diseases'},
    { text: 'Weeds', panel: 'index.weeds'},
    { text: 'Fertilizers', panel: 'index.fertilizers'},
    { text: 'Agrochemicals', panel: 'index.agrochemicals'},
    { text: 'Irrigation', panel: 'index.irrigation'},
    { text: 'Yield', panel: 'index.yield'}
  ],
  actions: {
    showPanel(name) {
      $('#'+this.get('id')).popup('close');
      this.sendAction('showPanel', name);
    }
  }
});
