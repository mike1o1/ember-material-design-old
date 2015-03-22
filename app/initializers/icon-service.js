export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');

    var iconService = container.lookup('service:icon');
    iconService.init();

}

export default {
  name: 'icon-service',
  initialize: initialize
};
