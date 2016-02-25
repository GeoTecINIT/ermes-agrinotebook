import Ember from 'ember';

export default Ember.Service.extend({
  init() {
    // Polling about online status
    this.set('online', navigator.onLine);
    setInterval(() => {
      if(this.get('online') !== String(navigator.onLine)) {
        this.set('online', navigator.onLine);
      }
    }, 1000);
  }
});
