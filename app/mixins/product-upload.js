import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    submit() {
      this.set('model.uploadingDate', new Date());
      this.get('model').save();
    }
  }
});
