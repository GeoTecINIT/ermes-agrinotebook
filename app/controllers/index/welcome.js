import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    dismiss() {
      this.transitionToRoute('index');
    }
  }
});
