import $ from 'jquery';
import Ember from 'ember';
import JqmPopup from 'ember-jquery-mobile/components/jqm-popup';

export default JqmPopup.extend({
  id: 'ermes-menu-fields',
  theme: 'c',
  transition: 'slidedown',
  i18n: Ember.inject.service(),
  products: Ember.computed('i18n.locale', function() {
      return [
        {text: this.get('i18n').t('fields.text.crop-info'), panel: 'index.crop-info'},
        {text: this.get('i18n').t('fields.text.soil-type'), panel: 'index.soil-type'},
        {text: this.get('i18n').t('fields.text.soil-condition'), panel: 'index.soil-condition'},
        {text: this.get('i18n').t('fields.text.crop-phenology'), panel: 'index.crop-phenology'},
        {text: this.get('i18n').t('fields.text.pathogens'), panel: 'index.pathogens'},
        {text: this.get('i18n').t('fields.text.diseases'), panel: 'index.diseases'},
        {text: this.get('i18n').t('fields.text.weeds'), panel: 'index.weeds'},
        {text: this.get('i18n').t('fields.text.fertilizers'), panel: 'index.fertilizers'},
        {text: this.get('i18n').t('fields.text.agrochemicals'), panel: 'index.agrochemicals'},
        {text: this.get('i18n').t('fields.text.irrigation'), panel: 'index.irrigation'},
        {text: this.get('i18n').t('fields.text.yield'), panel: 'index.yield'}
      ];
    }),
  actions: {
    showPanel(name) {
      $('#'+this.get('id')).popup('close');
      this.sendAction('showPanel', name);
    }
  }
});
