import Ember from 'ember';
import { post } from 'ermes-smart-app/utils/ajax';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  i18n: Ember.inject.service(),
  model: Ember.RSVP.hash({
    username: "",
    password: ""
  }),
  //username: Ember.computed.alias('model.username'),
  actions: {
    submit() {
      let model = this.get('model');
      var auth = this.get('auth');

      this.set('error', '');

      this.set('info', this.get('i18n').t('panel.notification.processing'));
      var token = btoa(model.username.toLowerCase().trim()+':'+model.password);
      //post('/login', {username: model.username, password: model.password })
      post('/login', {headers: {'X-Authorization': 'Bearer ' + token}})
      .done((data) => {
        this.set('info', '');
        var user = data.user;
        if (!user) {
          this.set('error', this.get('i18n').t('panel.notification.login-error'));
        } else if (user.profile !== 'local') {
          this.set('error', this.get('i18n').t('panel.notification.regional-error'));
        } else {

          auth.logIn(user.username.toLowerCase().trim(), token, data.language);

          // Reset form
          this.set('model.username', '');
          this.set('model.password', '');
          this.sendAction('logIn');
        }
      }).fail((err) => {
        this.set('info', '');
        var message = err.responseText;
        if (message) {
          if (message.match(/USER_NOT_FOUND/)){
            this.set('error', this.get('i18n').t('panel.notification.user-not-found'));
          } else if (message.match(/WRONG_PASSWORD/)) {
            this.set('error', this.get('i18n').t('panel.notification.login-error'));
          } else if (message.match(/INACTIVE_ACCOUNT/)) {
            this.set('error', this.get('i18n').t('panel.notification.inactive-account'));
          } else {
            this.set('error', this.get('i18n').t('panel.notification.offline'));
          }
        } else {
          this.set('error', this.get('i18n').t('panel.notification.offline'));
        }
      });
    }
  }
});
