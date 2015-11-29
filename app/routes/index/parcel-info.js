import Ember from 'ember';
import AuthChecker from 'ermes-smart-app/mixins/auth-checker';
import PanelManager from 'ermes-smart-app/mixins/panel-manager';

export default Ember.Route.extend(AuthChecker, PanelManager, {
  parcels: Ember.inject.service(),
  model() {
    var selectedParcels = this.get('parcels.selectedParcels');
    if (selectedParcels.length === 1) {
      let parcel = selectedParcels.get('firstObject');
      return this.store.findRecord('parcel', parcel);
    }
  }
});
