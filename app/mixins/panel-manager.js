import Ember from 'ember';

export default Ember.Mixin.create({
  afterModel() {

    // Tell index controller that a panel has been opened
    var indexController = this.controllerFor('index');
    var routeName = this.routeName.split('.');
    indexController.set('openedPanel', routeName[1]);
  }
});
