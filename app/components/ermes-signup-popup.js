import Ember from 'ember';
import $ from 'jquery';
import * as dd from 'ermes-smart-app/models/static/regions';
import { post } from 'ermes-smart-app/utils/ajax';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  regions: Ember.computed('i18n.locale', function() {
      return dd.getRegions(this);
    }),
  showError: false,
  message: "This is a test message",
  success: false,
  model: Ember.RSVP.hash({
    username: "",
    password: "",
    rPassword: "",
    email: "",
    rEmail: "",
    region: "greece"
  }),
  actions: {
    submit() {
      let model = this.get('model');
      this.hideMessage();

      if (model.password !== model.rPassword) {
        this.showMessage("Passwords don't match");

      } else if (model.email !== model.rEmail) {
        this.showMessage("Emails don't match");

      } else {
        this.showMessage("Processing...", 'blue');

        post('/signup', {username: model.username,
          password: model.password, email: model.email, region: model.region})
        .done((data) => {
          if (data) {
            this.hideMessage();
            this.set('success', true);
          } else {
            this.showMessage('Sorry, that user already exist');
          }
        }).fail(() => {
          this.showMessage('Connection lost');
        });
      }
    },
    changeRegion(region) {
      this.set('model.region', region);
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
