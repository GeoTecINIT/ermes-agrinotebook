import Ember from 'ember';

export default Ember.Mixin.create({
  indexController: Ember.inject.controller('index'),
  panelManager: function() {

    // Tell the index controller that a panel has been opened
    this.get('indexController').set('openedPanel', this.get('panelId'));

  }.on('init')
});
