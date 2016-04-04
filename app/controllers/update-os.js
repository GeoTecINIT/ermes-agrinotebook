import Ember from 'ember';

export default Ember.Controller.extend({
  offlineStorage: Ember.inject.service(),
  actions: {
    proceed() {
      var offlineStorage = this.get('offlineStorage');

      offlineStorage.set('updateAdvised', true);
      if (this.get('doNotShowAgain')) {
        offlineStorage.get('configStorage').setItem('do-not-show-update-os', true);
      }
      this.transitionToRoute("index");
    }
  }
});
