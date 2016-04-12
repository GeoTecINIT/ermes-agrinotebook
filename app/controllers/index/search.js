import Ember from 'ember';
import {get} from 'ermes-smart-app/utils/ajax';

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),
  parcels: Ember.inject.service(),
  panelId: 'search',
  searchParams: {},
  actions: {
    search() {
      var model = this.get('searchParams');

      this.set('searchError', '');
      this.set('info', this.get('i18n').t('panel.notification.processing'));
      get('/parcel-coords', {town: model.town, polygon: model.polygon, parcel: model.parcel}).done((data) => {
        this.set('info', this.get('i18n').t('panel.search.map-centered'));
        this.set('parcels.searchedParcel', data.parcelCoords);
        setTimeout(() => this.set('info', ''), 3000);
      }).fail((err) => {
        this.set('info', '');
        if (err.status && err.status === 404) {
          if (err.responseJSON && err.responseJSON.error === "SERVICE_DOWN") {
            this.set('searchError', this.get('i18n').t('panel.search.service-down'));
          } else {
            this.set('searchError', this.get('i18n').t('panel.notification.wrong-data'));
          }
        } else {
          this.set('searchError', this.get('i18n').t('panel.notification.offline'));
        }
      });
    }
  }
});
