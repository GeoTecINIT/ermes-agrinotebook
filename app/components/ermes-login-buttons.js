import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ermes-login-buttons', 'animated' ,'bounceInLeft'],
  actions: {
    openPopup(param) {
      this.sendAction('action', param);
    }
  }
});
