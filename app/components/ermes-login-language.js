import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ermes-login-language', 'animated', 'fadeIn'],
  i18n: Ember.inject.service(),
  languages: [
    {text: 'English', value: 'en', selected: true},
    {text: 'Español', value: 'es'},
    {text: 'Italiano', value: 'it'},
    {text: 'Έλληνες', value: 'gk'}
  ],
  actions: {
    changeLanguaje(value) {
      this.get('i18n').set('locale', value);
    }
  }
});
