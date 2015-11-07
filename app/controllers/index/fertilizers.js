import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/fertilizers';

export default Ember.Controller.extend({
  panelId: 'fertilizers',
  i18n: Ember.inject.service(),
  products: Ember.computed('i18n.locale', function () {
    return dd.getProducts(this);
  }),
  actions: {
    submit() {

    }
  }
});
