import DS from 'ember-data';
import Moment from 'moment';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return moment(serialized).format('lll');
  },

  serialize: function(deserialized) {
    return moment(deserialized).toISOString();
  }
});
