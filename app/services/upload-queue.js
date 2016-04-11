import Ember from 'ember';
import ImageUpload from 'ermes-smart-app/mixins/image-upload';

export default Ember.Service.extend(ImageUpload, {
  offlineStorage: Ember.inject.service(),
  networkChecker: Ember.inject.service(),
  store: Ember.inject.service(),
  init() {
    this.set('stopped', true);
  },
  start() {
    Ember.debug('Syncing offline products...');
    if (!this.get('lock')) {
      this.set('lock', true);
      this.get('offlineStorage').get('storage').getItem('upload-pending-products').then((prods) => {
        if (prods && this.get('networkChecker.online')) {
          this.set('stopped', false);
          var remainingProducts = prods.compact();
          try {
            prods.forEach((offlineProduct, productNumber) => {
              var prodElem = offlineProduct.split(':');
              this.get('store').findRecord(prodElem[1], prodElem[2]).then((product) => {
                return new Ember.RSVP.Promise((resolve, reject) => {
                  // Solution to Ember Data production error, pushes product into store without id
                  if (product.get('id')) {
                    new Ember.RSVP.Promise((res, rej) => {
                      if (product.get('file') && product.get('file').match(/^[0-9]/)) {
                        var key = product.get('file');
                        this.get('offlineStorage.imageStorage').getItem(key).then((image) => {
                          if (image) {
                            this.uploadImage(image).then((data) => {
                              product.set('file', data.image.url);
                              res();
                            }).catch(() => {
                              product.set('file', '');
                              res();
                            }).finally(() => {
                              this.get('offlineStorage.imageStorage').removeItem(key);
                            });
                          } else {
                            product.set('file', '');
                            res();
                          }
                        });
                      } else {
                        res();
                      }
                    }).then(() => {
                      product.save().then(() => Ember.debug('Pending product uploaded (' + (productNumber + 1) + '/' + prods.length + ')'));
                      this.get('offlineStorage').get('storage').removeItem(offlineProduct);
                      resolve(product);
                    });
                  } else {
                    reject(product);
                  }
                });
              }).catch(() => {
                this.get('offlineStorage').get('storage').getItem(offlineProduct).then((product) => {
                  if (product) {
                    var productInstance = this.get('store').createRecord(prodElem[1], product[prodElem[1]]);

                    new Ember.RSVP.Promise((res, rej) => {
                      if (productInstance.get('file') && productInstance.get('file').match(/^[0-9]/)) {
                        var key = productInstance.get('file');
                        this.get('offlineStorage.imageStorage').getItem(key).then((image) => {
                          if (image) {
                            this.uploadImage(image).then((data) => {
                              productInstance.set('file', data.image.url);
                              res();
                            }).catch(() => {
                              productInstance.set('file', '');
                              res();
                            }).finally(() => {
                              this.get('offlineStorage.imageStorage').removeItem(key);
                            });
                          } else {
                            productInstance.set('file', '');
                            res();
                          }
                        });
                      } else {
                        res();
                      }
                    }).then(() => {
                      productInstance.save().then(() => {
                        Ember.debug('Pending product uploaded (' + (productNumber + 1) + '/' + prods.length + ')');
                      });
                      this.get('offlineStorage').get('storage').removeItem(offlineProduct);
                    });
                  }
                });
              });

              // Remove actual copy if the requests succeeds or fails it will generate a new one
              remainingProducts.removeObject(offlineProduct);

              // Offline control
              if (!this.get('networkChecker.online')) {
                throw new Error();
              }
            });
          } catch (e) {
          }
          this.get('offlineStorage').get('storage').setItem('upload-pending-products', remainingProducts);
          this.set('stopped', true);
          this.set('lock', false);
        }
      });
    }
  },
  daemonControl: Ember.observer('networkChecker.online', function() {
    if (this.get('networkChecker.online') && this.get('stopped')){
      this.start();
    }
  })
});
