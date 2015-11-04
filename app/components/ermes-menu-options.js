import $ from 'jquery';
import Ember from 'ember';
import JqmPopup from 'ember-jquery-mobile/components/jqm-popup';

export default JqmPopup.extend({
  id: 'ermes-menu-fields',
  theme: 'c',
  transition: 'slidedown',
  i18n: Ember.inject.service(),
  options: Ember.computed('i18n.locale', function() {
      return [
        {text: this.get('i18n').t('fields.options-m.profile'), icon: "user", action: "showPanel", actionParam: "index.profile"},
        {text: this.get('i18n').t('fields.options-m.fields'), icon: "bullets", action: "enterEditMode", actionParam: null},
        {text: this.get('i18n').t('fields.options-m.about'), icon: "info", action: "showPanel", actionParam: "index.about"}
      ];
    }),
  actions: {
    showPanel(name) {
      $('#'+this.get('id')).popup('close');
      this.sendAction('showPanel', name);
    },
    enterEditMode() {

    }
  }

});
