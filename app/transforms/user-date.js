import DS from 'ember-data';
import Moment from 'moment';
import config from '../config/environment';

var dFormat = config.APP.defaultDateFormat;

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return moment(serialized).format(dFormat);
  },

  serialize: function(deserialized) {
    return moment(deserialized, dFormat).add(1, 'hours');
  }
});
