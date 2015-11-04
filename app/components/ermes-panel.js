import * as JqmPanel from 'ember-jquery-mobile/components/jqm-panel';

export default JqmPanel.default.extend({
  layout: JqmPanel.layout,
  theme: 'a',
  position: 'right',
  display: 'overlay',
  dismissible: 'false',
  closeButton: 'true',
  title: 'Ermes Panel',
  routeOnClose: 'index'
});
