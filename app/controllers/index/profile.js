import Ember from 'ember';

export default Ember.Controller.extend({
  panelId: 'profile',
  auth: Ember.inject.service(),
  actions: {
    submit() {

    },
    logOut() {
      this.get('auth').logOut();
      this.transitionToRoute('login');
    }
  }
});
