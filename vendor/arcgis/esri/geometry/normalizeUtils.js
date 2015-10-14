// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.14/esri/copyright.txt for details.
//>>built
define("esri/geometry/normalizeUtils","dojo/_base/array dojo/_base/lang dojo/_base/Deferred dojo/has ../kernel ../config ../deferredUtils ./Polyline ./Polygon ./webMercatorUtils ./jsonUtils".split(" "),function(h,k,D,L,M,N,x,r,z,y,O){function v(a,f){return Math.ceil((a-f)/(2*f))}function A(a,f){var c=a.paths||a.rings,b,e,d=c.length,n;for(b=0;b<d;b++){n=c[b].length;for(e=0;e<n;e++){var w=a.getPoint(b,e);a.setPoint(b,e,w.offset(f,0))}}return a}function E(a,f){if(!(a instanceof r||a instanceof z))throw console.error("_straightLineDensify: the input geometry is neither polyline nor polygon"),
Error("_straightLineDensify: the input geometry is neither polyline nor polygon");var c=a instanceof r,b=[],e;h.forEach(c?a.paths:a.rings,function(a){b.push(e=[]);e.push([a[0][0],a[0][1]]);var n,c,p,m,l,g,h,k,r,q,s,t;for(l=0;l<a.length-1;l++){n=a[l][0];c=a[l][1];p=a[l+1][0];m=a[l+1][1];h=Math.sqrt((p-n)*(p-n)+(m-c)*(m-c));k=(m-c)/h;r=(p-n)/h;q=h/f;if(1<q){for(g=1;g<=q-1;g++)t=g*f,s=r*t+n,t=k*t+c,e.push([s,t]);g=(h+Math.floor(q-1)*f)/2;s=r*g+n;t=k*g+c;e.push([s,t])}e.push([p,m])}});return c?new r({paths:b,
spatialReference:a.spatialReference}):new z({rings:b,spatialReference:a.spatialReference})}function B(a,f,c){f&&(a=E(a,1E6),a=y.webMercatorToGeographic(a,!0));c&&(a=A(a,c));return a}function C(a,f,c){var b=a.x||a[0],e;b>f?(e=v(b,f),a.x?a=a.offset(e*-2*f,0):a[0]=b+e*-2*f):b<c&&(e=v(b,c),a.x?a=a.offset(e*-2*c,0):a[0]=b+e*-2*c);return a}function G(a,f){var c=-1;h.forEach(f.cutIndexes,function(b,e){var d=f.geometries[e];h.forEach(d.rings||d.paths,function(a,e){h.some(a,function(b){if(!(180>b[0])){b=0;
var c,f=a.length,g;for(c=0;c<f;c++)g=a[c][0],b=g>b?g:b;b=Number(b.toFixed(9));b=-360*v(b,180);f=a.length;for(c=0;c<f;c++)g=d.getPoint(e,c),d.setPoint(e,c,g.offset(b,0))}return!0})});b===c?d.rings?h.forEach(d.rings,function(d){a[b]=a[b].addRing(d)}):h.forEach(d.paths,function(d){a[b]=a[b].addPath(d)}):(c=b,a[b]=d)});return a}function H(a,f,c,b){var e=new D;e.addCallbacks(c,b);f=f||N.defaults.geometryService;var d=[],n=[],w,p,m,l,g,k,F,u,q=0;h.forEach(a,function(a){if(a)if(w||(w=a.spatialReference,
p=w._getInfo(),l=(m=w._isWebMercator())?2.0037508342788905E7:180,g=m?-2.0037508342788905E7:-180,k=m?102100:4326,F=new r({paths:[[[l,g],[l,l]]],spatialReference:{wkid:k}}),u=new r({paths:[[[g,g],[g,l]]],spatialReference:{wkid:k}})),p){var b=O.fromJson(a.toJson()),c=a.getExtent();"point"===a.type?d.push(C(b,l,g)):"multipoint"===a.type?(b.points=h.map(b.points,function(a){return C(a,l,g)}),d.push(b)):"extent"===a.type?(b=c._normalize(null,null,p),d.push(b.rings?new z(b):b)):c?(a=v(c.xmin,g)*2*l,b=0===
a?b:A(b,a),c=c.offset(a,0),c.intersects(F)&&c.xmax!==l?(q=c.xmax>q?c.xmax:q,b=B(b,m),n.push(b),d.push("cut")):c.intersects(u)&&c.xmin!==g?(q=c.xmax*2*l>q?c.xmax*2*l:q,b=B(b,m,360),n.push(b),d.push("cut")):d.push(b)):d.push(b)}else d.push(a);else d.push(a)});c=new r;b=v(q,l);for(var s=-90,t=b;0<b;){var x=-180+360*b;c.addPath([[x,s],[x,-1*s]]);s*=-1;b--}0<n.length&&0<t?f?f.cut(n,c,function(b){n=G(n,b);var c=[];h.forEach(d,function(b,e){if("cut"===b){var f=n.shift();a[e].rings&&1<a[e].rings.length&&
f.rings.length>=a[e].rings.length?(d[e]="simplify",c.push(f)):d[e]=!0===m?y.geographicToWebMercator(f):f}});0<c.length?f.simplify(c,function(a){h.forEach(d,function(b,c){"simplify"===b&&(d[c]=!0===m?y.geographicToWebMercator(a.shift()):a.shift())});e.callback(d)},function(a){e.errback(a)}):e.callback(d)},function(a){e.errback(a)}):e.errback(Error("esri.geometry.normalizeCentralMeridian: 'geometryService' argument is missing.")):(h.forEach(d,function(a,b){if("cut"===a){var c=n.shift();d[b]=!0===m?
y.geographicToWebMercator(c):c}}),e.callback(d));return e}function u(a,f,c,b){var e=!1,d;k.isObject(a)&&a&&(k.isArray(a)?a.length&&((d=a[0]&&a[0].declaredClass)&&-1!==d.indexOf("Graphic")?(a=h.map(a,function(a){return a.geometry}),e=a.length?!0:!1):d&&-1!==d.indexOf("esri.geometry.")&&(e=!0)):(d=a.declaredClass)&&-1!==d.indexOf("FeatureSet")?(a=h.map(a.features||[],function(a){return a.geometry}),e=a.length?!0:!1):d&&-1!==d.indexOf("esri.geometry.")&&(e=!0));e&&f.push({index:c,property:b,value:a})}
function I(a,f){var c=[];h.forEach(f,function(b){var e=b.i,d=a[e];b=b.p;var f;if(k.isObject(d)&&d)if(b)if("*"===b[0])for(f in d)d.hasOwnProperty(f)&&u(d[f],c,e,f);else h.forEach(b,function(a){u(k.getObject(a,!1,d),c,e,a)});else u(d,c,e)});return c}function J(a,f){var c=0,b={};h.forEach(f,function(e){var d=e.index,f=e.property,h=e.value,p=h.length||1,m=a.slice(c,c+p);k.isArray(h)||(m=m[0]);c+=p;delete e.value;f?(b[d]=b[d]||{},b[d][f]=m):b[d]=m});return b}var K={normalizeCentralMeridian:H,_foldCutResults:G,
_prepareGeometryForCut:B,_offsetMagnitude:v,_pointNormalization:C,_updatePolyGeometry:A,_straightLineDensify:E,_createWrappers:function(a){var f=k.isObject(a)?a.prototype:k.getObject(a+".prototype");h.forEach(f.__msigns,function(a){var b=f[a.n];f[a.n]=function(){var e=this,d=[],f,k=new D(x._dfdCanceller);a.f&&x._fixDfd(k);for(f=0;f<a.c;f++)d[f]=arguments[f];var p={dfd:k};d.push(p);var m,l=[],g;e.normalization&&!e._isTable&&(m=I(d,a.a),h.forEach(m,function(a){l=l.concat(a.value)}),l.length&&(g=H(l)));
g?(k._pendingDfd=g,g.addCallbacks(function(a){k.canceled||(p.assembly=J(a,m),k._pendingDfd=b.apply(e,d))},function(b){var f=e.declaredClass;f&&-1!==f.indexOf("FeatureLayer")?e._resolve([b],null,d[a.e],k,!0):e._errorHandler(b,d[a.e],k)})):k._pendingDfd=b.apply(e,d);return k}})},_disassemble:I,_addToBucket:u,_reassemble:J};L("extend-esri")&&k.mixin(k.getObject("geometry",!0,M),K);return K});