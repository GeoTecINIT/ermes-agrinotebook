import Ember from 'ember';
import $ from 'jquery';
import * as dd from 'ermes-smart-app/models/static/regions';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  store: Ember.inject.service(),

  regions: Ember.computed('i18n.locale', function() {
      return dd.getRegions(this);
    }),
  success: false,
  model: Ember.computed('success', function () {
    return this.get('store').createRecord('user');
  }),
  actions: {
    submit() {
      let model = this.get('model');
      this.set('error', '');

      if (model.password !== model.rPassword) {
        this.set('error', this.get('i18n').t('panel.notification.password-mismatch'));

      } else if (model.get('email') !== model.rEmail) {
        this.set('error', this.get('i18n').t('panel.notification.email-mismatch'));

      } else {
        this.set('info', this.get('i18n').t('panel.notification.processing'));

        if (model.collaboratesWith && model.collaboratesWith !== "") {
          model.set('type', 'collaborator');
        }

        if (navigator.onLine) {
          model.save().then(() => {
            this.set('info', '');
            this.set('success', true);
            setTimeout(() => this.set('success', false), 5000);
          }).catch((err) => {
            this.set('info', '');

            if (err.message) {
              if (err.message.match(/Owner/)) {
                this.set('error', this.get('i18n').t('panel.notification.unknown-owner'));
              } else if(err.message.match(/Region/)) {
                this.set('error', this.get('i18n').t('panel.notification.region-mismatch'));
              } else if (err.message.match(/username/)) {
                this.set('error', this.get('i18n').t('panel.notification.user-exits'));
              } else if (err.message.match(/email/i)) {
                this.set('error', this.get('i18n').t('panel.notification.repeated-email'));
              } else {
                this.set('error', this.get('i18n').t('panel.notification.offline'));
              }
            } else {
              this.set('error', this.get('i18n').t('panel.notification.offline'));
            }
          });
        } else {
          this.set('info', '');
          this.set('error', this.get('i18n').t('panel.notification.offline'));
        }
      }
    },
    showLoginPopup() {
      let loginPopup = $('#ermes-login-popup');
      let signupPopup = $('#ermes-signup-popup');
      loginPopup.find('form').trigger('reset'); // Clear login
      this.set('username', this.get('model.username'));
      signupPopup.one('popupafterclose', function () {
        loginPopup.popup('open');
      }); // Prevent animation error
      signupPopup.popup('close'); // Close actual popup
      this.set('success', false);
    }
  }
});
