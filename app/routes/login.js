import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (this.get('auth').isAuth()) {
      this.transitionTo('index');
    }
  }
});
