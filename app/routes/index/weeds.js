import Ember from 'ember';
import AuthChecker from 'ermes-smart-app/mixins/auth-checker';
import PanelManager from 'ermes-smart-app/mixins/panel-manager';
import ProductModelCustomOptionsFactory from 'ermes-smart-app/mixins/product-model-custom-options-factory';

export default Ember.Route.extend(AuthChecker, PanelManager, ProductModelCustomOptionsFactory, {
});
