// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.14/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/base/conditionals/INSPIRE_DomainConsistency","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/topic dojo/has ../../../../../../kernel dojo/i18n!../../../../nls/i18nArcGIS ../../../../base/Conditional ../../../../base/etc/docUtil".split(" "),function(d,g,e,f,h,k,l,m,n){d=d(m,{key:"INSPIRE_DomainConsistency",postCreate:function(){this.inherited(arguments);var b=this;this.own(f.subscribe("gxe/interaction-occurred",function(a){try{b.parentXNode&&a&&a.inputWidget&&
a.inputWidget.parentXNode&&"/metadata/dqInfo/report/@type"===a.inputWidget.parentXNode.gxePath&&b.emitInteractionOccurred()}catch(c){console.error(c)}}));this.own(f.subscribe("gxe/after-xnode-destroyed",function(a){try{b.parentXNode&&a&&a.xnode&&"report"===a.xnode.target&&b.emitInteractionOccurred()}catch(c){console.error(c)}}))},ensureFocus:function(){n.ensureVisibility(this.parentXNode);e.some(this.parentXNode.getChildren(),function(b){if(b._isGxeTabs)return e.some(b.getChildren(),function(a){if(a.isReportSection)return b.ensureActiveTab(a),
!0}),!0})},validateConditionals:function(b){var a=this.newStatus({message:l.conditionals[this.key]}),c=!0,d=this.parentXNode.domNode;this.isXNodeOff(this.parentXNode)||(c=!1,this.forActiveXNodes("/metadata/dqInfo/report/@type",d,function(a){if("DQDomConsis"===a.inputWidget.getInputValue())return c=!0}));a.isValid=c;this.track(a,b);return a}});h("extend-esri")&&g.setObject("dijit.metadata.types.arcgis.base.conditionals.INSPIRE_DomainConsistency",d,k);return d});