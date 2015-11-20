import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  init() {
    var products = Ember.RSVP.hash({});
    this.set('products', products);
  },

  getProduct(productName) {
    if (this.get('products.'+productName)) {
      return this.get('products.'+productName);
    } else {
      var product = this.get('store').createRecord(productName);
      this.set('products.'+productName, product);
      return product;
    }
  }
});
