import Ember from 'ember';
import Moment from 'moment';
import * as dd from 'ermes-smart-app/models/static/irrigation';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ProductParcelCheck from 'ermes-smart-app/mixins/product-parcel-check';

import config from '../../config/environment';

var dFormat = config.APP.defaultDateFormat;

export default Ember.Controller.extend(ProductUpload, ProductParcelCheck, {
  panelId: 'irrigation',
  i18n: Ember.inject.service(),
  measures: Ember.computed('i18n.locale', function () {
    return dd.getMeasures(this);
  }),
  hasMM: Ember.computed('model.measureUnit', function () {
    return this.get('model.measureUnit') === 'mm';
  }),
  actions: {
    submit() {
      if (!this.get('model.startDate')) {
        this.set('startDateError', this.get('i18n').t('panel.notification.missing-start-date'));
      } else if (this.get('model.endDate') &&
        new Moment(this.get('model.endDate'), dFormat) < new Moment(this.get('model.startDate'), dFormat)) {
          this.set('startDateError', '');
          this.set('endDateError', this.get('i18n').t('panel.notification.dates-inconsistency'));
      } else {
          this.set('startDateError', '');
          this.set('endDateError', '');
          this._super(this);
      }
    }
  }
});
