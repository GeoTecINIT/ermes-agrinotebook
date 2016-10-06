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
        {text: this.get('i18n').t('fields.options-m.profile'), icon: "user", theme: "c", action: "showPanel", actionParam: "index.profile", isShown: this.get('type') !== 'guest'},
        {text: this.get('i18n').t('fields.options-m.fields'), icon: "bullets", theme: "c", action: "enterEditMode", actionParam: null, isShown: !this.get('editMode') && this.get('type') === 'owner'},
        {text: this.get('i18n').t('fields.options-m.about'), icon: "info", theme: "c", action: "showPanel", actionParam: "index.about", isShown: true},
        {text: this.get('i18n').t('fields.options-m.logout'), icon: "power", theme: "b", action: "logOut", actionParam: null, isShown: true}
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
    },
    logOut() {
      this.sendAction('logOut')
    }
  }

});
