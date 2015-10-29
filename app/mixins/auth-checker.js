import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel(transition) {
    if (!this.get('auth').isAuth()) {
      var loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
  }
});
