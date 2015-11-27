import Ember from 'ember';
import { post } from 'ermes-smart-app/utils/ajax';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  i18n: Ember.inject.service(),
  model: Ember.RSVP.hash({
    username: "",
    password: ""
  }),
  username: Ember.computed.alias('model.username'),
  actions: {
    submit() {
      let model = this.get('model');
      var auth = this.get('auth');

      this.set('error', '');

      this.set('info', this.get('i18n').t('panel.notification.processing'));
      post('/login', {username: model.username, password: model.password })
      .done((data) => {
        this.set('info', '');
        if (!data) {
          this.set('error', this.get('i18n').t('panel.notification.login-error'));
        } else if (data.profile !== 'local') {
          this.set('error', this.get('i18n').t('panel.notification.regional-error'));
        } else {

          auth.logIn(data.user, data.user+";"+model.password, data.lang);

          // Reset form
          this.set('model.username', '');
          this.set('model.password', '');
          this.sendAction('logIn');
        }
      }).fail(() => {
        this.set('info', '');
        this.set('error', this.get('i18n').t('panel.notification.offline'));
      });
    }
  }
});
