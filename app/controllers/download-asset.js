import Ember from 'ember';

export default Ember.Controller.extend({
  offlineStorage: Ember.inject.service(),
  ermesCordova: Ember.inject.service(),
  index: Ember.inject.controller(),
  progressUndetermined: false,
  progressLoaded : 0,
  progressTotal: 1,
  askingForDownload: true,

/*
  var networkState = navigator.connection.type;
  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';
*/


normalizedProgress: Ember.computed("progressLoaded", "progressTotal", "progressUndetermined", function(){

       if (this.get("progressUndetermined")){
         return -1;
       }

       if (typeof this.get("progressLoaded") === 'undefined'){
         return 0;
       }

       return this.get("progressLoaded")/ this.get("progressTotal");
  }),

  actions: {
    downloadAsset(){
      //var isDownloading = this.get('offlineStorage').get('downloading');
      this.set('downloadError', undefined);
      this.set("progressLoaded",  0);
      this.set("progressTotal", 1);

      var isNative = this.get("ermesCordova").isNative();
      var downloadUrl = this.get("downloadUrl");
      var assetsKey = this.get("assetsKey");
      var assetsDetails = this.get("assetsDetails");

       if (isNative) {
           var fileTransfer = new FileTransfer();
           Ember.debug("About to start transfer");

           var store = cordova.file.dataDirectory;
           var fileName = assetsKey;

            function checkIfFileExists(){
               return new Ember.RSVP.Promise( (resolve, reject )=> {
                     window.resolveLocalFileSystemURL(store + fileName,  (fileEntry) => {
                       //delete the file
                       fileEntry.remove(function() {
                         console.log('File removed.');
                         resolve();
                       },(error) => {
                         console.log ('File not removed with the file API: ' + error);
                         resolve();
                       });

                       resolve();
                 }, ()=> { resolve()});
               } );
            }

         checkIfFileExists().then(
           //Check for the file.
            () => {
             var _this = this;
             fileTransfer.onprogress = function(progressEvent) {
                 if (progressEvent.lengthComputable) {
                   var progress = progressEvent.loaded / progressEvent.total;
                     Ember.debug("downloading asset" + progress);
                      const MBRate = 1048576;
                     _this.set("progressLoaded",  progressEvent.loaded/(MBRate)/*to mb*/ );
                     _this.set("progressTotal", progressEvent.total/(MBRate)/*to mb*/);
                     _this.set("progressUndetermined", false);

                 } else {
                   _this.set("progressUndetermined", true);
                   Ember.debug("downloading asset ..");
                 }
             };

             fileTransfer.download(encodeURI(downloadUrl), store + fileName,
               function(entry) {
                 Ember.debug("Success! downloading assets ..");
                 var offlineStorage = _this.get('offlineStorage');
                 offlineStorage.set('downloading', false);
                 offlineStorage.get('configStorage').setItem(assetsKey, assetsDetails).then(()=>{
                   _this.transitionToRoute("index");
                 });
               },
               function(err) {
                 Ember.debug("Error downloading asset..");
                 _this.set('downloadError', err);
               });});

         }
       },

    confirmDownload () {
      var isWifi = navigator.connection.type === Connection.WIFI;
      this.set('connectionAcceptable', isWifi);
      this.set('askingForDownload', false);
      if (isWifi){
        this.send('downloadAsset');
      }

    },

    rejectDownload() {
       this.get('index').set('useOnlineBasemap', true);
       this.transitionToRoute("index");
    },

    confirmConnection() {
      this.set('connectionAcceptable', true);
      this.send('downloadAsset');
    }

} //actions end

});
