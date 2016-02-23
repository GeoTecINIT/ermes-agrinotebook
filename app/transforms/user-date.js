import DS from 'ember-data';
import Moment from 'moment';
import config from '../config/environment';

var dFormat = config.APP.defaultDateFormat;

export default DS.Transform.extend({
  deserialize: function(serialized) {
    if (String(serialized) === 'null') {
      return undefined;
    }
    return new Moment(serialized).format(dFormat);
  },

  serialize: function(deserialized) {
    if (!deserialized || typeof deserialized === 'undefined') {
      return null;
    }
    if (new Moment(deserialized, Moment.ISO_8601).isValid()){
      return deserialized;
    }
    return new Moment(deserialized, dFormat).add(12, 'hours').toISOString();
  }
});
