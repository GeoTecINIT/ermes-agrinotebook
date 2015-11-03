import JqmPopup from 'ember-jquery-mobile/components/jqm-popup';

export default JqmPopup.extend({
  id: 'ermes-menu-fields',
  theme: 'c',
  transition: 'slidedown',
  options: [
    {text: "My profile", icon: "user", action: null},
    {text: "My fields", icon: "bullets", action: null},
    {text: "About", icon: "info", action: null}
  ]

});
