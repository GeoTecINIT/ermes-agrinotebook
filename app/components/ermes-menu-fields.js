import $ from 'jquery';
import Ember from 'ember';
import JqmPopup from 'ember-jquery-mobile/components/jqm-popup';
import * as dd from 'ermes-smart-app/models/static/products';

export default JqmPopup.extend({
  id: 'ermes-menu-fields',
  theme: 'c',
  transition: 'slidedown',
  i18n: Ember.inject.service(),
  products: Ember.computed('i18n.locale', function() {
      return dd.getProducts(this);
    }),
  actions: {
    showPanel(name) {
      $('#'+this.get('id')).popup('close');
      this.sendAction('showPanel', name);
    }
  }
});
