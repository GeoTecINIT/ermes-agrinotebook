import Ember from 'ember';

export default Ember.Service.extend({
  init() {
    this.set('storage', window.localforage.createInstance({
      name: 'productStorage'
    }));

    this.set('configStorage', window.localforage.createInstance({
      name: 'configStorage'
    }));

    this.set('downloading', false);
  }

});
