import Ember from 'ember';
import { post } from 'ermes-smart-app/utils/ajax';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  showError: "false",
  message: "",
  msgColor: "",
  model: Ember.RSVP.hash({
    username: "",
    password: ""
  }),
  actions: {
    submit() {
      let model = this.get('model');
      var auth = this.get('auth');

      this.hideMessage();

      this.showMessage('Processing...', 'blue');
      post('/login', {username: model.username, password: model.password })
      .done((data) => {
        if (!data) {
          this.showMessage('Wrong user or password');
        } else if (data.profile !== 'local') {
          this.showMessage('This is a regional account');
        } else {
          this.hideMessage();
          auth.logIn(data.user);
          this.sendAction('logIn');
        }
      });
    }
  },
  showMessage(message, color) {
    if (color) {
      this.set('msgColor', color);
    } else {
      this.set('msgColor', 'brown');
    }
    this.set('message', message);
    this.set('showError', true);
  },
  hideMessage() {
    this.set('showError', false);
  }
});
