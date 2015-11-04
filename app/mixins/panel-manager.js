import Ember from 'ember';

export default Ember.Mixin.create({
  afterModel() {

    // Tell index controller that a panel has been opened
    var indexController = this.controllerFor('index');
    var routeName = this.routeName.split('.');
    indexController.set('openedPanel', routeName[1]);
  },
  actions: {
    willTransition() {
      // When leaving panel by itself reset index openedPanel property
      var indexController = this.controllerFor('index');
      indexController.set('openedPanel', 'none');
    }
  }
});
