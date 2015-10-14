// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.14/esri/copyright.txt for details.
//>>built
define("esri/map","require dojo/_base/kernel dojo/_base/declare dojo/_base/connect dojo/_base/lang dojo/_base/array dojo/_base/event dojo/on dojo/aspect dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dom-style dijit/registry ./kernel ./config ./sniff ./lang ./_coremap ./MapNavigationManager dojo/i18n!./nls/jsapi".split(" "),function(x,r,M,A,p,s,B,C,N,D,E,h,F,O,P,Q,t,G,g,u,R,S,T){var y={up:"panUp",right:"panRight",down:"panDown",left:"panLeft"},H={upperRight:"panUpperRight",
lowerRight:"panLowerRight",lowerLeft:"panLowerLeft",upperLeft:"panUpperLeft"},f=A.connect,l=A.disconnect,m=F.create,q=P.set,I=p.hitch,v=O.getMarginBox,J=r.deprecated,z=p.mixin,K=0;r=M(R,{declaredClass:"esri.Map",constructor:function(a,c){z(this,{_slider:null,_navDiv:null,_mapParams:z({attributionWidth:0.45,slider:!0,nav:!1,logo:!0,sliderStyle:"small",sliderPosition:"top-left",sliderOrientation:"vertical",autoResize:!0},c||{})});z(this,{isDoubleClickZoom:!1,isShiftDoubleClickZoom:!1,isClickRecenter:!1,
isScrollWheelZoom:!1,isPan:!1,isRubberBandZoom:!1,isKeyboardNavigation:!1,isPanArrows:!1,isZoomSlider:!1});p.isFunction(t._css)&&(t._css=t._css(this._mapParams.force3DTransforms),this.force3DTransforms=this._mapParams.force3DTransforms);var b=g("esri-transforms")&&g("esri-transitions");this.navigationMode=this._mapParams.navigationMode||b&&"css-transforms"||"classic";"css-transforms"===this.navigationMode&&!b&&(this.navigationMode="classic");this.fadeOnZoom=u.isDefined(this._mapParams.fadeOnZoom)?
this._mapParams.fadeOnZoom:"css-transforms"===this.navigationMode;"css-transforms"!==this.navigationMode&&(this.fadeOnZoom=!1);this.setMapCursor("default");this.smartNavigation=c&&c.smartNavigation;if(!u.isDefined(this.smartNavigation)&&g("mac")&&!g("esri-touch")&&!g("esri-pointer")&&!(3.5>=g("ff"))){var d=navigator.userAgent.match(/Mac\s+OS\s+X\s+([\d]+)(\.|\_)([\d]+)\D/i);d&&(u.isDefined(d[1])&&u.isDefined(d[3]))&&(b=parseInt(d[1],10),d=parseInt(d[3],10),this.smartNavigation=10<b||10===b&&6<=d)}this.showAttribution=
u.isDefined(this._mapParams.showAttribution)?this._mapParams.showAttribution:!0;this._onLoadHandler_connect=f(this,"onLoad",this,"_onLoadInitNavsHandler");var e=m("div",{"class":"esriControlsBR"+(this._mapParams.nav?" withPanArrows":"")},this.root);if(this.showAttribution)if(b=p.getObject("esri.dijit.Attribution",!1))this._initAttribution(b,e);else{var L=K++,k=this;this._rids&&this._rids.push(L);x(["./dijit/Attribution"],function(a){var b=k._rids?s.indexOf(k._rids,L):-1;-1!==b&&(k._rids.splice(b,
1),k._initAttribution(a,e))})}this._mapParams.logo&&(b={},6===g("ie")&&(b.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled\x3d'true', sizingMethod\x3d'crop', src\x3d'"+x.toUrl("./images/map/logo-med.png")+"')"),this._ogol=m("div",{style:b},e),this._setLogoSize(),this._onMapResizeLogo_connect=f(this,"onResize",this,"_setLogoSize"),g("esri-touch")||(this._ogol_connect=f(this._ogol,"onclick",this,"_openLogoLink")));this.navigationManager=new S(this);c&&c.basemap&&(this._onLoadFix=!0,
this.setBasemap(c.basemap),this._onLoadFix=!1);if(this.autoResize=this._mapParams.autoResize)b=this._getEnclosingResizableWidget(this.container)||window,d=this.resize,this._rszSignal=C.pausable(b,"resize",d),this._oriSignal=C.pausable(window,"orientationchange",d),N.after(b,"resize",d,!0),this._startResizeTimer()},_startResizeTimer:function(){clearTimeout(this._persistentTimer);this._persistentTimer=setTimeout(this._timedResize,2*this.resizeDelay)},_getEnclosingResizableWidget:function(a){var c=Q.getEnclosingWidget(a);
return!c?c:c.resize?c:this._getEnclosingResizableWidget(a.parentNode)},_setLogoSize:function(){this._ogol&&(25E4>this.root.clientWidth*this.root.clientHeight?(h.remove(this._ogol,"logo-med"),h.add(this._ogol,"logo-sm")):(h.remove(this._ogol,"logo-sm"),h.add(this._ogol,"logo-med")))},_initAttribution:function(a,c){var b=m("span",{"class":"esriAttribution"},c,"first");q(b,"maxWidth",Math.floor(this.width*this._mapParams.attributionWidth)+"px");this._connects.push(f(b,"onclick",function(){h.contains(this,
"esriAttributionOpen")?h.remove(this,"esriAttributionOpen"):this.scrollWidth>this.clientWidth&&h.add(this,"esriAttributionOpen")}));this.attribution=new a({map:this},b)},_cleanUp:function(){this.disableMapNavigation();this.navigationManager.destroy();var a=this._slider;a&&(a.destroy&&!a._destroyed)&&a.destroy();var a=this._navDiv,c=this.attribution;a&&F.destroy(a);c&&c.destroy();this._connects.push(this._slider_connect,this._ogol_connect,this._rszSignal,this._oriSignal);s.forEach(this._connects,l);
clearInterval(this._persistentTimer);this.attribution=this.navigationManager=this._rids=this._connects=this._slider_connect=this._ogol_connect=this._rszSignal=this._oriSignal=this._persistentTimer=null;this.inherited("_cleanUp",arguments)},_isPanningOrZooming:function(){return this.__panning||this.__zooming},_canZoom:function(a){var c=this.getLevel();return!this.__tileInfo||!(c===this.getMinZoom()&&0>a||c===this.getMaxZoom()&&0<a)},_onLoadInitNavsHandler:function(){this.enableMapNavigation();this._createNav();
if("small"===this._mapParams.sliderStyle||!this._createSlider)this._createSimpleSlider();else if(this._mapParams.slider){var a=-1!==this._getSliderClass(!0).indexOf("Horizontal"),a=[a?"dijit.form.HorizontalSlider":"dijit.form.VerticalSlider",a?"dijit.form.HorizontalRule":"dijit.form.VerticalRule",a?"dijit.form.HorizontalRuleLabels":"dijit.form.VerticalRuleLabels"];if(s.some(a,function(a){return!p.getObject(a,!1)})){var a=s.map(a,function(a){return a.replace(/\./g,"/")}),c=K++,b=this;this._rids&&this._rids.push(c);
x(a,function(){var a=b._rids?s.indexOf(b._rids,c):-1;-1!==a&&(b._rids.splice(a,1),b._createSlider.apply(b,arguments))})}else a=s.map(a,function(a){return p.getObject(a,!1)}),this._createSlider.apply(this,a)}l(this._onLoadHandler_connect)},_createNav:function(){if(this._mapParams.nav){var a,c,b,d=h.add,e=this.id;this._navDiv=m("div",{id:e+"_navdiv"},this.root);d(this._navDiv,"navDiv");var g=this.width/2,k=this.height/2,n;for(b in y)c=y[b],a=m("div",{id:e+"_pan_"+b},this._navDiv),d(a,"fixedPan "+c),
"up"===b||"down"===b?(n=parseInt(v(a).w,10)/2,q(a,{left:g-n+"px",zIndex:30})):(n=parseInt(v(a).h,10)/2,q(a,{top:k-n+"px",zIndex:30})),this._connects.push(f(a,"onclick",I(this,this[c])));this._onMapResizeNavHandler_connect=f(this,"onResize",this,"_onMapResizeNavHandler");for(b in H)c=H[b],a=m("div",{id:e+"_pan_"+b,style:{zIndex:30}},this._navDiv),d(a,"fixedPan "+c),this._connects.push(f(a,"onclick",I(this,this[c])));this.isPanArrows=!0}},_onMapResizeNavHandler:function(a,c,b){a=this.id;c/=2;b/=2;var d=
D.byId,e,f,g;for(e in y)f=d(a+"_pan_"+e),"up"===e||"down"===e?(g=parseInt(v(f).w,10)/2,q(f,"left",c-g+"px")):(g=parseInt(v(f).h,10)/2,q(f,"top",b-g+"px"))},_createSimpleSlider:function(){if(this._mapParams.slider){var a=this._slider=m("div",{id:this.id+"_zoom_slider","class":this._getSliderClass(),style:{zIndex:30}}),c=g("esri-touch")&&!g("ff")?"touchstart":g("esri-pointer")?navigator.msPointerEnabled?"MSPointerDown":"pointerdown":"onclick",b=m("div",{"class":"esriSimpleSliderIncrementButton"},a),
d=m("div",{"class":"esriSimpleSliderDecrementButton"},a);this._addZoomButtonTooltips(b,d);this._incButton=b;this._decButton=d;this._simpleSliderZoomHandler(null,null,null,this.getLevel());b.innerHTML="\x3cspan\x3e+\x3c/span\x3e";d.innerHTML="\x3cspan\x3e\x26ndash;\x3c/span\x3e";8>g("ie")&&h.add(d,"dj_ie67Fix");this._connects.push(f(b,c,this,this._simpleSliderChangeHandler));this._connects.push(f(d,c,this,this._simpleSliderChangeHandler));"touchstart"==c&&(this._connects.push(f(b,"onclick",this,this._simpleSliderChangeHandler)),
this._connects.push(f(d,"onclick",this,this._simpleSliderChangeHandler)));(-1<this.getMaxZoom()||-1<this.getMinZoom())&&this._connects.push(f(this,"onZoomEnd",this,this._simpleSliderZoomHandler));10>g("ie")&&D.setSelectable(a,!1);this.root.appendChild(a);this.isZoomSlider=!0}},_simpleSliderChangeHandler:function(a){B.stop(a);a=-1!==a.currentTarget.className.indexOf("IncrementButton")?!0:!1;this._extentUtil({numLevels:a?1:-1})},_simpleSliderZoomHandler:function(a,c,b,d){var e;a=this._incButton;c=this._decButton;
-1<d&&d===this.getMaxZoom()?e=a:-1<d&&d===this.getMinZoom()&&(e=c);e?(h.add(e,"esriSimpleSliderDisabledButton"),h.remove(e===a?c:a,"esriSimpleSliderDisabledButton")):(h.remove(a,"esriSimpleSliderDisabledButton"),h.remove(c,"esriSimpleSliderDisabledButton"))},_getSliderClass:function(a){a=a?"Large":"Simple";var c=this._mapParams.sliderOrientation,b=this._mapParams.sliderPosition||"",c=c&&"horizontal"===c.toLowerCase()?"esri"+a+"SliderHorizontal":"esri"+a+"SliderVertical";if(b)switch(b.toLowerCase()){case "top-left":b=
"esri"+a+"SliderTL";break;case "top-right":b="esri"+a+"SliderTR";break;case "bottom-left":b="esri"+a+"SliderBL";break;case "bottom-right":b="esri"+a+"SliderBR"}return"esri"+a+"Slider "+c+" "+b},_createSlider:function(a,c,b){if(this._mapParams.slider){var d=m("div",{id:this.id+"_zoom_slider"},this.root),e=G.defaults.map,h=this._getSliderClass(!0),k=-1!==h.indexOf("Horizontal"),n=this.getNumLevels();if(0<n){var l,p,w=this._mapParams.sliderLabels,u=!!w,r=!1!==w;if(r){var t=k?"bottomDecoration":"rightDecoration";
if(!w){w=[];for(e=0;e<n;e++)w[e]=""}s.forEach([{"class":"esriLargeSliderTicks",container:t,count:n,dijitClass:c},{"class":u&&"esriLargeSliderLabels",container:t,count:n,labels:w,dijitClass:b}],function(a){var b=m("div"),e=a.dijitClass;delete a.dijitClass;d.appendChild(b);e===c?l=new e(a,b):p=new e(a,b)})}a=this._slider=new a({id:d.id,"class":h,minimum:this.getMinZoom(),maximum:this.getMaxZoom(),discreteValues:n,value:this.getLevel(),clickSelect:!0,intermediateChanges:!0,style:"z-index:30;"},d);a.startup();
r&&(l.startup(),p.startup());this._slider_connect=f(a,"onChange",this,"_onSliderChangeHandler");this._connects.push(f(this,"onExtentChange",this,"_onExtentChangeSliderHandler"));this._connects.push(f(a._movable,"onFirstMove",this,"_onSliderMoveStartHandler"))}else{a=this._slider=new a({id:d.id,"class":h,minimum:0,maximum:2,discreteValues:3,value:1,clickSelect:!0,intermediateChanges:e.sliderChangeImmediate,style:"height:50px; z-index:30;"},d);b=a.domNode.firstChild.childNodes;for(e=1;3>=e;e++)q(b[e],
"visibility","hidden");a.startup();this._slider_connect=f(a,"onChange",this,"_onDynSliderChangeHandler");this._connects.push(f(this,"onExtentChange",this,"_onExtentChangeDynSliderHandler"))}e=a.incrementButton;b=a.decrementButton;k?this._addZoomButtonTooltips(e,b):this._addZoomButtonTooltips(b,e);e.style.outline="none";b.style.outline="none";a.sliderHandle.style.outline="none";a._onKeyPress=function(){};if(k=a._movable){var v=k.onMouseDown;k.onMouseDown=function(a){9>g("ie")&&1!==a.button||v.apply(this,
arguments)}}this.isZoomSlider=!0}},_addZoomButtonTooltips:function(a,c){var b=T.widgets.zoomSlider;E.set(a,"title",b.zoomIn);E.set(c,"title",b.zoomOut)},_onSliderMoveStartHandler:function(){l(this._slider_connect);l(this._slidermovestop_connect);this._slider_connect=f(this._slider,"onChange",this,"_onSliderChangeDragHandler");this._slidermovestop_connect=f(this._slider._movable,"onMoveStop",this,"_onSliderMoveEndHandler")},_onSliderChangeDragHandler:function(a){this._extentUtil({targetLevel:a})},
_onSliderMoveEndHandler:function(){l(this._slider_connect);l(this._slidermovestop_connect)},_onSliderChangeHandler:function(a){this.setLevel(a)},_updateSliderValue:function(a,c){l(this._slider_connect);var b=this._slider,d=b._onChangeActive;b._onChangeActive=!1;b.set("value",a);b._onChangeActive=d;this._slider_connect=f(b,"onChange",this,c)},_onExtentChangeSliderHandler:function(a,c,b,d){l(this._slidermovestop_connect);this._updateSliderValue(d.level,"_onSliderChangeHandler")},_onDynSliderChangeHandler:function(a){this._extentUtil({numLevels:0<
a?1:-1})},_onExtentChangeDynSliderHandler:function(){this._updateSliderValue(1,"_onDynSliderChangeHandler")},_openLogoLink:function(a){window.open(G.defaults.map.logoLink,"_blank");B.stop(a)},enableMapNavigation:function(){this.navigationManager.enableNavigation()},disableMapNavigation:function(){this.navigationManager.disableNavigation()},enableDoubleClickZoom:function(){this.isDoubleClickZoom||(this.navigationManager.enableDoubleClickZoom(),this.isDoubleClickZoom=!0)},disableDoubleClickZoom:function(){this.isDoubleClickZoom&&
(this.navigationManager.disableDoubleClickZoom(),this.isDoubleClickZoom=!1)},enableShiftDoubleClickZoom:function(){this.isShiftDoubleClickZoom||(J(this.declaredClass+": Map.(enable/disable)ShiftDoubleClickZoom deprecated. Shift-Double-Click zoom behavior will not be supported.",null,"v2.0"),this.navigationManager.enableShiftDoubleClickZoom(),this.isShiftDoubleClickZoom=!0)},disableShiftDoubleClickZoom:function(){this.isShiftDoubleClickZoom&&(J(this.declaredClass+": Map.(enable/disable)ShiftDoubleClickZoom deprecated. Shift-Double-Click zoom behavior will not be supported.",
null,"v2.0"),this.navigationManager.disableShiftDoubleClickZoom(),this.isShiftDoubleClickZoom=!1)},enableClickRecenter:function(){this.isClickRecenter||(this.navigationManager.enableClickRecenter(),this.isClickRecenter=!0)},disableClickRecenter:function(){this.isClickRecenter&&(this.navigationManager.disableClickRecenter(),this.isClickRecenter=!1)},enablePan:function(){this.isPan||(this.navigationManager.enablePan(),this.isPan=!0)},disablePan:function(){this.isPan&&(this.navigationManager.disablePan(),
this.isPan=!1)},enableRubberBandZoom:function(){this.isRubberBandZoom||(this.navigationManager.enableRubberBandZoom(),this.isRubberBandZoom=!0)},disableRubberBandZoom:function(){this.isRubberBandZoom&&(this.navigationManager.disableRubberBandZoom(),this.isRubberBandZoom=!1)},enableKeyboardNavigation:function(){this.isKeyboardNavigation||(this.navigationManager.enableKeyboardNavigation(),this.isKeyboardNavigation=!0)},disableKeyboardNavigation:function(){this.isKeyboardNavigation&&(this.navigationManager.disableKeyboardNavigation(),
this.isKeyboardNavigation=!1)},enableScrollWheelZoom:function(){this.isScrollWheelZoom||(this.navigationManager.enableScrollWheelZoom(),this.isScrollWheelZoom=!0)},disableScrollWheelZoom:function(){this.isScrollWheelZoom&&(this.navigationManager.disableScrollWheelZoom(),this.isScrollWheelZoom=!1)},showPanArrows:function(){this._navDiv&&(this._navDiv.style.display="block",this.isPanArrows=!0)},hidePanArrows:function(){this._navDiv&&(this._navDiv.style.display="none",this.isPanArrows=!1)},showZoomSlider:function(){this._slider&&
(q(this._slider.domNode||this._slider,"visibility","visible"),this.isZoomSlider=!0)},hideZoomSlider:function(){this._slider&&(q(this._slider.domNode||this._slider,"visibility","hidden"),this.isZoomSlider=!1)}});g("extend-esri")&&(t.Map=r);return r});