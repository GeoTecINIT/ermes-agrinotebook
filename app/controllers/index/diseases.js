import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/diseases';

export default Ember.Controller.extend({
  panelId: 'diseases',
  i18n: Ember.inject.service(),
  names: Ember.computed('i18n.locale', function () {
    return dd.getNames(this);
  }),
  actions: {
    submit() {

    }
  }
});
