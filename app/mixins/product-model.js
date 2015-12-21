import DS from 'ember-data';
import Agrochemical from 'ermes-smart-app/models/agrochemical';
import Moment from 'moment';

export default DS.Model.extend({
  save() {
    return this._super().then((obj) => {
      // Store product for offline use
      var prod = {};
      prod[this._internalModel.modelName] = this.serialize({includeId: true});
      window.localforage.setItem(this._internalModel.type + this.id, prod);
      return obj;
    }, (err) => {
      var old = false; // New record or modified

      // Generate a unique identifier for the product
      var id = Math.round(Math.random()*1e8) + Moment().format('x');
      if (this.get('id')) { // If the product is going to be modified
        id = this.get('id');
        old = true;
      }

      // Prepare the product key for its storage
      const key = this._internalModel.type + id;

      // Store product
      var prod = {};
      if (old) {
        prod[this._internalModel.modelName] = this.serialize({includeId: true});
      } else { // Without id record cannot be pushed, create a new record instead
        prod[this._internalModel.modelName] = this.serialize();
      }
      window.localforage.setItem(key, prod);

      // Mark it as pending
      window.localforage.getItem('upload-pending-products').then((products) => {
        if (products !== null) { // There are other pending products
          products.push(key);
          window.localforage.setItem('upload-pending-products', products);
        } else { // First pending product is going to be stored
          window.localforage.setItem('upload-pending-products', [key]);
        }
      });
      return err;
    });
  }
});
