import Ember from 'ember';
import AuthChecker from 'ermes-smart-app/mixins/auth-checker';

export default Ember.Route.extend(AuthChecker, {
   offlineStorage: Ember.inject.service(),

    beforeModel(transition) {
      this._super(transition);
      var isDownloading = this.get('offlineStorage').get('downloading');
        if (!isDownloading) {
          this.transitionTo('index');
        }
    }
});
