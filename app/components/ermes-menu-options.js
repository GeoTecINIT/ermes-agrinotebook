import $ from 'jquery';
import Ember from 'ember';
import JqmPopup from 'ember-jquery-mobile/components/jqm-popup';

export default JqmPopup.extend({
  id: 'ermes-menu-fields',
  theme: 'c',
  transition: 'slidedown',
  i18n: Ember.inject.service(),
  options: Ember.computed('i18n.locale', 'editMode', function() {
      return [
        {text: this.get('i18n').t('fields.options-m.profile'), icon: "user", action: "showPanel", actionParam: "index.profile", isShown: true},
        {text: this.get('i18n').t('fields.options-m.fields'), icon: "bullets", action: "enterEditMode", actionParam: null, isShown: !this.get('editMode')},
        {text: this.get('i18n').t('fields.options-m.about'), icon: "info", action: "showPanel", actionParam: "index.about", isShown: true}
      ];
    }),
  actions: {
    showPanel(name) {
      $('#'+this.get('id')).popup('close');
      this.sendAction('showPanel', name);
    },
    enterEditMode() {
      $('#'+this.get('id')).popup('close');
      if(navigator.onLine) {
        this.set('editMode', true);
      } else {
        this.sendAction('cannotEdit');
      }
    }
  }

});
