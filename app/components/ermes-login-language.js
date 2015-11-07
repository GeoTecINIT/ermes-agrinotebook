import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/regions';

export default Ember.Component.extend({
  classNames: ['ermes-login-language', 'animated', 'fadeIn'],
  i18n: Ember.inject.service(),
  languages: dd.getLanguajes(),
  actions: {
    changeLanguaje(value) {
      this.get('i18n').set('locale', value);
    }
  }
});
