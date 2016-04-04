import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');

  this.route('index', { path: '/' }, function() {
    this.route('observation', {});
    this.route('crop-info', {});
    this.route('soil-type', {});
    this.route('soil-condition', {});
    this.route('crop-phenology', {});
    this.route('insects', {});
    this.route('diseases', {});
    this.route('weeds', {});
    this.route('fertilizers', {});
    this.route('agrochemicals', {});
    this.route('irrigation', {});
    this.route('yield', {});
    this.route('profile', {});
    this.route('about', {});
    this.route('parcel-info', {});
    this.route('welcome', {});
    this.route('cannot-edit', {});
    this.route('abiotic-stresses');
  });
  this.route('index-error', {});
  this.route('index-loading', {});
  this.route('download-asset');
  this.route('update-os');
});

export default Router;
