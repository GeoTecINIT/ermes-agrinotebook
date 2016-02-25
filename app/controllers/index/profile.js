import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/regions';

export default Ember.Controller.extend({
  panelId: 'profile',
  auth: Ember.inject.service(),
  i18n: Ember.inject.service(),
  languages: dd.getLanguajes(),
  newModel: Ember.RSVP.hash({
    email: "",
    oldPass: "",
    newPass: "",
    rNewPass: ""
  }),
  actions: {
    submit() {
      this.set('info', '');
      this.set('error', '');

      var model = this.get('model');
      var newModel = this.get('newModel');
      if ((newModel.newPass || newModel.rNewPass) && !newModel.oldPass) {
        this.set('error', this.get('i18n').t('panel.notification.old-password-needed'));

      } else if ((newModel.newPass || newModel.rNewPass) && newModel.newPass !== newModel.rNewPass) {
        this.set('error', this.get('i18n').t('panel.notification.password-mismatch'));

      } else {

        if (newModel.newPass) {
          model.set('password', newModel.newPass);
          model.set('oldPassword', newModel.oldPass);
        }

        if (this.get('newModel.email') && this.get('newModel.email') !== '') {
          model.set('email', this.get('newModel.email'));
        }

        model.set('language', this.get('i18n.locale'));
        localStorage.lang = this.get('i18n.locale');

        this.set('info', this.get('i18n').t('panel.notification.processing'));
        model.save().then(() => {
          if (newModel.newPass) {
            this.get('auth')
              .logIn(model.get('username'), btoa(model.get('username')+':'+model.get('password')), model.get('language'));
          }

          this.set('info', this.get('i18n').t('panel.notification.saved'));
          setTimeout(() => this.set('info', ''), 2000);
        }).catch((err) => {
          this.set('info', '');
          var message = err.message;
          if (message) {
            if (message.match(/PASSWORD_MISMATCH/)) {
              this.set('error', this.get('i18n').t('panel.notification.wrong-old-password'));
            } else if (message.match(/email/)) {
              this.set('error', this.get('i18n').t('panel.notification.repeated-email'));
            } else {
              this.set('info', this.get('i18n').t('panel.notification.offline-profile-update'));
            }
          } else {
            this.set('info', this.get('i18n').t('panel.notification.offline-profile-update'));
          }
          setTimeout(() => this.set('info', ''), 2000);
        });
      }
    },
    logOut() {
      this.get('auth').logOut();
      this.transitionToRoute('login');
    }
  }
});
