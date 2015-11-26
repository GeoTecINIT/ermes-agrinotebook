import Ember from 'ember';
import $ from 'jquery';
import * as dd from 'ermes-smart-app/models/static/regions';
import { post } from 'ermes-smart-app/utils/ajax';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  regions: Ember.computed('i18n.locale', function() {
      return dd.getRegions(this);
    }),
  success: false,
  model: Ember.RSVP.hash({
    username: "",
    password: "",
    rPassword: "",
    email: "",
    rEmail: "",
    region: ""
  }),
  actions: {
    submit() {
      let model = this.get('model');
      this.set('error', '');

      if (model.password !== model.rPassword) {
        this.set('error', this.get('i18n').t('panel.notification.password-mismatch'));

      } else if (model.email !== model.rEmail) {
        this.set('error', this.get('i18n').t('panel.notification.email-mismatch'));

      } else {
        this.set('info', this.get('i18n').t('panel.notification.processing'));

        post('/signup', {username: model.username,
          password: model.password, email: model.email, region: model.region})
        .done((data) => {
          this.set('info', '');
          if (data) {
            this.set('success', true);
          } else {
            this.set('error', this.get('i18n').t('panel.notification.user-exits'));
          }
        }).fail(() => {
          this.set('info', '');
          this.set('error', this.get('i18n').t('panel.notification.offline'));
        });
      }
    },
    showLoginPopup() {
      let loginPopup = $('#ermes-login-popup');
      let signupPopup = $('#ermes-signup-popup');
      loginPopup.find('form').trigger('reset'); // Clear login
      $(loginPopup.find('form').find('input')[0]).val(this.get('model.username')); // Set login username
      signupPopup.one('popupafterclose', function () {
        loginPopup.popup('open');
      }); // Prevent animation error
      signupPopup.popup('close'); // Close actual popup
      this.set('success', false);
    }
  }
});
