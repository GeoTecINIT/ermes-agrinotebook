import Ember from 'ember';

export default Ember.Service.extend({
  init() {
    this.set('storage', window.localforage.createInstance({
      name: 'productStorage'
    }));
  }
});
