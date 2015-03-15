import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

var Router = Ember.Router.extend(googlePageview, {
  location: config.locationType
});

Router.map(function() {
  this.route('buttons');
  this.route('content');
  this.route('divider');
  this.route('card');
  this.route('input');
  this.route('list');
  this.route('toolbar');
  this.route('checkbox');
  this.route('slider');
  this.route('progress-circular');
  this.route('progress-linear');
  this.route('icon');
});

export default Router;
