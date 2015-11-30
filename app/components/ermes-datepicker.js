import JqmDatepicker from 'ember-jquery-mobile/components/jqm-datepicker';
import Moment from 'moment';

export default JqmDatepicker.extend({
  months: Moment.months(),
  days: Moment.weekdaysMin()
});
