import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  init() {
    var products = Ember.RSVP.hash({});
    this.set('products', products);
  },

  /**
   * Product singleton factory, retrieves an existent product or
   * instances a new one if there's not
   * @param productName
   * @returns product
     */
  getProduct(productName) {
    if (this.get('products.'+productName)) {
      return this.get('products.'+productName);
    } else {
      var product = this.get('store').createRecord(productName);
      this.set('products.'+productName, product);
      return product;
    }
  },

  /**
   * Archives actual product instancing a new one
   * @param productName
   * @returns product
     */
  archiveProduct(productName) {
    var product = this.get('store').createRecord(productName);
    this.set('products.'+productName, product);
    return product;
  }
});
