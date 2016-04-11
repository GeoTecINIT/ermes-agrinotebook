import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),
  parcels: Ember.inject.service(),
  panelId: 'search',
  searchParams: {},
  actions: {
    search() {
      var SERVER_API_URL = 'http://localhost:4500';
      var uri = '/parcel-coords';

      var model = this.get('searchParams');

      this.set('searchError', '');
      this.set('info', this.get('i18n').t('panel.notification.processing'));
      $.get(SERVER_API_URL + uri, {town: model.town, polygon: model.polygon, parcel: model.parcel}).done((data) => {
        this.set('info', '');
        this.set('parcels.searchedParcel', data.parcelCoords);
      }).fail((err) => {
        this.set('info', '');
        if (err.status && err.status === 404) {
          this.set('searchError', this.get('i18n').t('panel.notification.wrong-data'));
        } else {
          this.set('searchError', this.get('i18n').t('panel.notification.offline'));
        }
        console.debug("[ERROR]: " + err);
      });
    }
  }
});
