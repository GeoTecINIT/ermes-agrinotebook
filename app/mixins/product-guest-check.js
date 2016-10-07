import Ember from 'ember';
import ProductParcelCheck from 'ermes-smart-app/mixins/product-parcel-check';

export default Ember.Mixin.create(ProductParcelCheck, {
  actions: {
    submit() {
      if (this.get('parcels.user.type') !== 'guest') {
        this._super(this);
      } else {
        var alertPosition = this.get('parcels.alertPosition');
        if (!alertPosition) {
          this.set('parcelError', this.get('i18n').t('panel.notification.missing-marker'));
        } else {
          // Reset error messages
          this.set('parcelError', '');

          // Put coordinates inside the model
          this.get('model').setProperties({
            longitude: alertPosition.x,
            latitude: alertPosition.y
          });

          this._super(this);
        }
      }
    }
  }
});
