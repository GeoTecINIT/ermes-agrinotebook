import Cordova from 'ember-cli-cordova/services/cordova';

export default Cordova.extend({

    isNative(){
      return !document.URL.match(/^https?:\/\//);
    }
  // export default MyEmberObject.extend({
//   cordova: Ember.inject.service()
//
//   init: function() {
//     cordova.on('resume', function() { console.log('i am resumed'); });
//   }
// });
});
