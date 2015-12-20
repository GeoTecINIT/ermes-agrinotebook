import DS from 'ember-data';
import Moment from 'moment';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return new Moment(serialized).format('lll');
  },

  serialize: function(deserialized) {
    return new Moment(deserialized, 'lll').toISOString();
  }
});
