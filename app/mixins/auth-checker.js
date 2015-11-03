import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel(transition) {
    if (!this.get('auth').isAuth()) {

      // Tell login controller that he needs to load a different route on login
      var loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);

      // Move to login page
      this.transitionTo('login');
    }
  }
});
