import DS from 'ember-data';
import Moment from 'moment';
import config from '../config/environment';

var dFormat = config.APP.defaultDateFormat;

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return new Moment(serialized).format(dFormat);
  },

  serialize: function(deserialized) {
    return new Moment(deserialized, dFormat).add(1, 'hours').toISOString();
  }
});
