import Ember from 'ember';
import AuthChecker from 'ermes-smart-app/mixins/auth-checker';
import PanelManager from 'ermes-smart-app/mixins/panel-manager';
import ProductModelFactory from 'ermes-smart-app/mixins/product-model-factory';

export default Ember.Route.extend(AuthChecker, PanelManager, ProductModelFactory, {
});
