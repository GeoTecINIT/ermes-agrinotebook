import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    submit() {
      if (!this.get('model.product.observationDate')) {
        this.set('dateError', this.get('i18n').t('panel.notification.missing-date'));
      } else {
        this.set('dateError', '');
        this._super(this);
      }
    }
  }
});
