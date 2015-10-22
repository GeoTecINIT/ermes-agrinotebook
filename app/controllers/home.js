import $ from 'jquery';
import Ember from 'ember';

export default Ember.Controller.extend({
  btnAction: 'showAbout',
  btnText: 'Show about panel',
  popupId: 'sample-popup',
  actions: {
    openPopup() {
      $('#'+this.get('popupId')).popup('open');
    },
    showAbout() {
      this.transitionToRoute('home.about');
      this.set('btnAction', 'backToHome');
      this.set('btnText', 'Return to home page');
    },
    backToHome() {
      this.transitionToRoute('home');
      this.set('btnAction', 'showAbout');
      this.set('btnText', 'Show about panel');
    }
  }
});
