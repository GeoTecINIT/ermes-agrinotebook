import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'username',
  serialize(snapshot, options) {
    var json = this._super(snapshot, options);
    var record = snapshot.record;

    if (record.get('password')) {
      json.password = record.get('password');
    }

    if (record.get('oldPassword')) {
      json.oldPassword = record.get('oldPassword')
    }

    if (record.get('collaboratesWith')) {
      json.collaboratesWith = record.get('collaboratesWith');
    }
    return json;
  }
});
