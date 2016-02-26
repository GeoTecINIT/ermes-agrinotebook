import Ember from 'ember';
import {post} from 'ermes-smart-app/utils/ajax';

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

      if (files && files.length === 1) {
        var image = files[0];
        var product = this.get('model.product') || this.get('model');

        var _super = this._super.bind(this);
        var imageStorage = this.get('offlineStorage.imageStorage');

        // Tell the user that the request is being processed
        this.set('info', this.get('i18n').t('panel.notification.processing'));
        this.uploadImage(image).then((response) => {
          product.set('file', response.image.url);
        }).catch((err) => {
          // Store offline
          var key = Date.now();
          product.set('file', key);
          imageStorage.setItem(key, image);
        }).finally(() => {
          _super();
        });
      } else {
        this._super(this);
      }
    }
  },
  uploadImage(image) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      var data = new FormData();
      data.append('image', image);

      var token = this.get('auth.token');
      var headers = {
        'X-Authorization': 'Bearer ' + token
      };

      post('/images', {data: data, headers: headers, form: true}).done((response) => {
        resolve(response);
      }).fail((err) => {
        reject(err);
      });
    });
  }
});
