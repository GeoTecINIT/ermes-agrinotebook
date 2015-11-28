import Ember from 'ember';

export default Ember.Mixin.create({
  parcels: Ember.inject.service(),
  actions: {
    submit() {
      if (this.get('parcels.selectedParcels').length <= 0) {
        this.set('parcelError', this.get('i18n').t('panel.notification.missing-parcel'));
      } else {
        this.set('parcelError', '');
        this.set('model.parcels', this.get('parcels.selectedParcels'));
        this.set('model.uploadingDate', new Date());
        this.get('model').save();
      }
    }
  }
});
