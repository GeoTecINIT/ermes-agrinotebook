import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    reconnect() {
      this.transitionToRoute('index');
    }
  }
});
