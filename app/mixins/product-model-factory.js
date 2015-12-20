import Ember from 'ember';

export default Ember.Mixin.create({
  model() {
    var route = this.routeName.split('.');
    var productName = Ember.String.singularize(route[route.length-1]);
    return this.get('products').getProduct(productName);
  }
});
