import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('buttons');
  this.route('content');
  this.route('divider');
  this.route('card');
});

export default Router;
