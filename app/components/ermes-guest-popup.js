import Ember from 'ember';
import { post } from 'ermes-smart-app/utils/ajax';
import * as dd from 'ermes-smart-app/models/static/regions';
import * as gd from 'ermes-smart-app/models/static/guests';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  auth: Ember.inject.service(),

  regions: Ember.computed('i18n.locale', function() {
    return dd.getRegions(this);
  }),
  guests: Ember.computed(function () {
    return gd.getGuests();
  }),
  model: Ember.RSVP.hash({
    region: "greece"
  }),

  actions: {
    submit() {
      let model = this.get('model');
      let guests = this.get('guests');

      var auth = this.get('auth');

      this.set('error', '');

      this.set('info', this.get('i18n').t('panel.notification.processing'));
      var token = guests.findBy('region', model.region).token;
      post('/login', {headers: {'X-Authorization': 'Bearer ' + token}})
        .done((data) => {
          this.set('info', '');
          var user = data.user;

          auth.logIn(user.username.toLowerCase().trim(), token, user.language);

          this.sendAction('logIn');

        }).fail((err) => {
        this.set('info', '');
        var message = err.responseText;
        if (message) {
          if (message.match(/USER_NOT_FOUND/)){
            this.set('error', this.get('i18n').t('panel.notification.user-not-found'));
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
