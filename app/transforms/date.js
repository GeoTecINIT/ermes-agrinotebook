import DS from 'ember-data';
import Moment from 'moment';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    if (String(serialized) === 'null') {
      return undefined;
    }
    return new Moment(serialized).format('lll');
  },

  serialize: function(deserialized) {
    if (!deserialized || typeof deserialized === 'undefined') {
      return null;
    }
    if (new Moment(deserialized, Moment.ISO_8601).isValid()){
      return deserialized;
    }
    return new Moment(deserialized, 'lll').toISOString();
  }
});
