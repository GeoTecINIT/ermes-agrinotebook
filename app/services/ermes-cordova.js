//import Cordova from 'ember-cli-cordova/services/cordova';
//import Cordova from 'ember-cli-cordova/addon/services/cordova';
//import Cordova from 'ember-cli-cordova/services/cordova';
import Ember from 'ember';

export default Ember.Service.extend({

    isNative(){
      return !document.URL.match(/^https?:\/\//);
    }//,
  // export default MyEmberObject.extend({
    //cordova: Ember.inject.service()
//
//   init: function() {
//     cordova.on('resume', function() { console.log('i am resumed'); });
//   }
// });
});
