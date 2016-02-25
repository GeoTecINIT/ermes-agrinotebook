import Ember from 'ember';

export default Ember.Mixin.create({
  model() {
    var route = this.routeName.split('.');
    var productType = route[route.length-1];
    var productName = Ember.String.singularize(productType);
    return Ember.RSVP.hash({
      product: this.get('products').getProduct(productName),
      customOptions: this.store.findRecord('customOption', Ember.String.pluralize(Ember.String.camelize(productType)))
    });
  }
});
