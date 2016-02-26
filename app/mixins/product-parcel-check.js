import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    submit() {
      if (this.get('parcels.selectedParcels').length <= 0) { // There are no selected parcels
        this.set('parcelError', this.get('i18n').t('panel.notification.missing-parcel'));
      } else { // Parcels selected
        // Reset error messages
        this.set('parcelError', '');
        this._super(this);
      }
    }
  }
});
