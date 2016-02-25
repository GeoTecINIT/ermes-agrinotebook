import Ember from 'ember';

export default Ember.Mixin.create({
  offlineStorage: Ember.inject.service(),
  actions: {
    submit() {
      this._super().then(() => {
        alert('All went fine!');
      }).catch(() => {
        alert('Seems that this has failed');
      });
    }
  }
});
