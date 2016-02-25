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
      var file = this.get('model.file') || this.get('model.product.file');

      if (file) {
        new Ember.RSVP.Promise((resolve, reject) => {
          var data = new FormData();
          data.append('image', file);
        });
      }
    }
  }
});
