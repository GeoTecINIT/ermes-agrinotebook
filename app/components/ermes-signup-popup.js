import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  regions: Ember.computed('i18n.locale', function() {
      return [
        {text: this.get('i18n').t('region.greece'), value: "greece"},
        {text: this.get('i18n').t('region.italy'), value: "italy"},
        {text: this.get('i18n').t('region.spain'), value: "spain"}
      ];
    }),
  actions: {
    submit() {
      this.sendAction('signUp');
    }
  }
});
