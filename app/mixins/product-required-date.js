import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    submit() {
      var observationDate = this.get('model.observationDate') || this.get('model.product.observationDate');
      if (!observationDate) {
        this.set('dateError', this.get('i18n').t('panel.notification.missing-date'));
      } else {
        this.set('dateError', '');
        this._super(this);
      }
    }
  }
});
