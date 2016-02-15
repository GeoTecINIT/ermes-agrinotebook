import Ember from 'ember';
import ProgressBar from 'progress-bar';

export default Ember.Component.extend({

  type: 'Line',
  color: '#FCB03C',
  strokeWidth: 1,
  fill: '#aaa',

  subFix: "MB",
  count: 0,
  total: 100,
  progress: 0,

  animate: Ember.on('didInsertElement', Ember.observer('progress', function() {
    var progressBar = this.get('progressBar');
    if (typeof progressBar !== 'undefined') {
      var progress = this.get('progress');
      progressBar.animate(progress);
    }
  })),

  didInsertElement(){
    this.set('progressBar', new ProgressBar[this.get("type").capitalize()]("#"+this.elementId, {
      step: (state, bar)=>{ this._step (state, bar, this)} ,
      color: this.get('color'),
      strokeWidth: this.get('strokeWidth'),
      fill: this.get('fill')
    }));

    var progressBar = this.get('progressBar');
    var progress = this.get('progress');
    progressBar.animate(progress);
  },

  _step(state, bar, ctx){
      bar.setText(Math.round(ctx.get('count')) + " / " + Math.round(ctx.get('total')) + " " + ctx.get("subFix"));
  }

});
