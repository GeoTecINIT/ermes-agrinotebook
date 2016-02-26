import Ember from 'ember';

export default Ember.Mixin.create({
  offlineStorage: Ember.inject.service(),
  auth: Ember.inject.service(),
  actions: {
    submit() {
      // IF File
        // Upload Image
          // THEN model.setURL()
          // CATCH model.setLocalDBId()
          // FINALLY super()
      var files = this.get('files');

      if (files.length === 1) {
        var image = files[0];

        new Ember.RSVP.Promise((resolve, reject) => {
          var data = new FormData();
          data.append('image', image);
        });
      }
    }
  }
});
