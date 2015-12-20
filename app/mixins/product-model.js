import DS from 'ember-data';
import Agrochemical from 'ermes-smart-app/models/agrochemical';
import Moment from 'moment';

export default DS.Model.extend({
  save() {
    return this._super().then((obj) => {
      // Store product for offline use
      window.localforage.setItem(this._internalModel.modelName +'#'+ this.id, this.serialize());
      return obj;
    }, (err) => {
      // Generate a unique identifier for the product
      const id = this._internalModel.modelName +'#'+ Math.random()*1e20 + Moment().format('x');

      // Store product
      window.localforage.setItem(id, this.serialize());

      // Mark it as pending
      window.localforage.getItem('upload-pending-products').then((products) => {
        if (products !== null) { // There are other pending products
          products.push(id);
          window.localforage.setItem('upload-pending-products', products);
        } else { // First pending product is going to be stored
          window.localforage.setItem('upload-pending-products', [id]);
        }
      });
      return err;
    });
  }
});
