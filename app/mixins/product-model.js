import Ember from 'ember';
import DS from 'ember-data';
import Moment from 'moment';

export default DS.Model.extend({
  offlineStorage: Ember.inject.service(),
  save() {
    return this._super().then((obj) => {
      // Store product for offline use
      var prod = {};
      prod[this._internalModel.modelName] = this.serialize({includeId: true});
      this.get('offlineStorage').get('storage').setItem(this._internalModel.type + this.id, prod);
      return obj;
    }, (err) => {
      var old = !!this.get('id');

      // Generate a unique identifier for the product offline storage
      var id = Math.round(Math.random()*1e8) + new Moment().format('x') + 'lsp';

      // Prepare the product key for its storage
      const key = this._internalModel.type + id;

      // Store product
      var prod = {};
      if (old) {
        prod[this._internalModel.modelName] = this.serialize({includeId: true});
      } else { // Without id record cannot be pushed, create a new record instead
        prod[this._internalModel.modelName] = this.serialize();
      }
      this.get('offlineStorage').get('storage').setItem(key, prod);

      // Mark it as pending
      return this.get('offlineStorage').get('storage').getItem('upload-pending-products').then((products) => {
        if (products !== null) { // There are other pending products
          products.push(key);
          this.get('offlineStorage').get('storage').setItem('upload-pending-products', products);
        } else { // First pending product is going to be stored
          this.get('offlineStorage').get('storage').setItem('upload-pending-products', [key]);
        }
        return err;
      });
    });
  }
});
