import $ from 'jquery';
import JqmPopup from 'ember-jquery-mobile/components/jqm-popup';

export default JqmPopup.extend({
  id: 'ermes-menu-fields',
  theme: 'c',
  transition: 'slidedown',
  options: [
    {text: "My profile", icon: "user", action: "showPanel", actionParam: "index.profile"},
    {text: "My fields", icon: "bullets", action: "enterEditMode", actionParam: null},
    {text: "About", icon: "info", action: "showPanel", actionParam: "index.about"}
  ],
  actions: {
    showPanel(name) {
      $('#'+this.get('id')).popup('close');
      this.sendAction('showPanel', name);
    },
    enterEditMode() {

    }
  }

});
