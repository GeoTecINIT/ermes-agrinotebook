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
      var model = this.get('model');
      if (this.get('newModel.email')) {
        model.set('email', this.get('newModel.email'));
      }
      model.set('language', this.get('i18n.locale'));
      localStorage.lang = this.get('i18n.locale');
      this.set('info', this.get('i18n').t('panel.notification.processing'));
      model.save().then(() => {
        this.set('info', this.get('i18n').t('panel.notification.saved'));
        setTimeout(() => this.set('info', ''), 2000);
      }, () => {
        this.set('info', '');
        this.set('info', this.get('i18n').t('panel.notification.offline-profile-update'));
        setTimeout(() => this.set('info', ''), 2000);
      });
    },
    logOut() {
      this.get('auth').logOut();
      this.transitionToRoute('login');
    }
  }
});
