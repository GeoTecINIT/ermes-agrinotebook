import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/regions';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  regions: Ember.computed('i18n.locale', function() {
      return dd.getRegions(this);
    }),
  actions: {
    submit() {
      this.sendAction('signUp');
    }
  }
});
