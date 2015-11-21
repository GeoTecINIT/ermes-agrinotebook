import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/irrigation';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';

export default Ember.Controller.extend(ProductUpload, {
  panelId: 'irrigation',
  i18n: Ember.inject.service(),
  measures: Ember.computed('i18n.locale', function () {
    return dd.getMeasures(this);
  }),
  hasMM: Ember.computed('model.quantityOfWaterMeasure', function () {
    return this.get('model.quantityOfWaterMeasure') === 'mm';
  }),
  actions: {
    submit() {
      var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
      if (!this.get('model.startDate')) {
        this.set('startDateError', 'Please fill start date');
      } else if (this.get('model.endDate') && new Date(this.get('model.endDate').replace(pattern, '$3-$2-$1')) < new Date(this.get('model.startDate').replace(pattern, '$3-$2-$1'))) {
          this.set('startDateError', '');
          this.set('endDateError', 'End date must be greater than start date');
      } else {
          this.set('startDateError', '');
          this.set('endDateError', '');
          this._super(this);
      }
    }
  }
});
