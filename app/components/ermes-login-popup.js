import Ember from 'ember';
import { post } from 'ermes-smart-app/utils/ajax';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  model: Ember.RSVP.hash({
    username: "",
    password: ""
  }),
  actions: {
    submit() {
      let model = this.get('model');
      var auth = this.get('auth');

      this.set('error', '');

      this.set('info', 'Processing...');
      post('/login', {username: model.username, password: model.password })
      .done((data) => {
        this.set('info', '');
        if (!data) {
          this.set('error', 'Wrong user or password');
        } else if (data.profile !== 'local') {
          this.set('error', 'This is a regional account');
        } else {
          auth.logIn(data.user);
          this.sendAction('logIn');
        }
      });
    }
  }
});
