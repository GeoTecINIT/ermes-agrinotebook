import Ember from 'ember';

export default Ember.Service.extend({
  offlineStorage: Ember.inject.service(),
  store: Ember.inject.service(),
  init() {
    // Polling about online status
    this.set('online', navigator.onLine);
    setInterval(() => {
      if(this.get('online') !== String(navigator.onLine)) {
        this.set('online', navigator.onLine);
      }
    }, 1000);

    // Daemon stopped by default
    this.set('stopped', true);
  },
  start() {
    this.get('offlineStorage').get('storage').getItem('upload-pending-products').then((prods) => {
      if (prods && this.get('online')) {
        this.set('stopped', false);
        var remainingProducts = prods.compact();
        try {
          prods.forEach((offlineProduct, productNumber) => {
            var prodElem = offlineProduct.split(':');
            this.get('store').findRecord(prodElem[1], prodElem[2]).then((product) => {
              product.save().then(() => Ember.debug('Pending product uploaded (' + (productNumber+1) + '/' + prods.length + ')'));
              this.get('offlineStorage').get('storage').removeItem(offlineProduct);
            }, () => {
              this.get('offlineStorage').get('storage').getItem(offlineProduct).then((product) => {
                if (product) {
                  this.get('store').createRecord(prodElem[1], product[prodElem[1]]).save().then(() => {
                    Ember.debug('Pending product uploaded (' + (productNumber+1) + '/' + prods.length + ')');
                  });
                  this.get('offlineStorage').get('storage').removeItem(offlineProduct);
                }
              });
            });

            // Remove actual copy if the requests succeeds or fails it will generate a new one
            remainingProducts.removeObject(offlineProduct);

            // Offline control
            if (!this.get('online')) {
              throw new XMLHttpRequestException();
            }
          });
        } catch(e) {}
        this.get('offlineStorage').get('storage').setItem('upload-pending-products', remainingProducts);

        //if (remainingProducts.length !== 0) {
        //  this.get('offlineStorage').get('storage').setItem('upload-pending-products', remainingProducts);
        //} else {
        //  this.get('offlineStorage').get('storage').removeItem('upload-pending-products');
        //}
        this.set('stopped', true);
      }
    });
  },
  daemonControl: Ember.observer('online', function() {
    if (this.get('online') && this.get('stopped')){
      this.start();
    }
  })
});
