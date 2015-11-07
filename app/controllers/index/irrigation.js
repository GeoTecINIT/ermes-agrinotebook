import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/irrigation';

export default Ember.Controller.extend({
  panelId: 'irrigation',
  i18n: Ember.inject.service(),
  measures: Ember.computed('i18n.locale', function () {
    return dd.getMeasures(this);
  }),
  actions: {
    submit() {

    }
  }
});
