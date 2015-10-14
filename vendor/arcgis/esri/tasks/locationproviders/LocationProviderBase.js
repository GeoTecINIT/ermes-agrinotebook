// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.14/esri/copyright.txt for details.
//>>built
define("esri/tasks/locationproviders/LocationProviderBase","../../declare dojo/_base/lang dojo/promise/all dojo/Deferred dojo/when dojo/Evented ../../SpatialReference ../../geometry/jsonUtils ../../graphic ../../arcgis/csv".split(" "),function(v,r,w,s,x,y,z,t,A,B){return v("esri.tasks.locationproviders.LocationProviderBase",y,{geometryType:null,loaded:!1,constructor:function(d){r.mixin(this,d);setTimeout(r.hitch(this,this._init),0)},locate:function(d,a){function e(C){x(u).then(function(){for(var a=
[],b=C.concat(g).concat(f),e=0;e<d.length;e++){for(var c=d[e],h=!1,k=0;k<b.length;k++)if(b[k]===c){h=!0;break}h||(c&&c.setGeometry&&c.setGeometry(),a.push(c))}a={features:b,failed:a};l.emit("locate-complete",a);m.resolve(a)})}function p(a){for(var b={features:a},c=0;c<a.length;c++){var d=a[c];d.setGeometry(d.geometry)}l.emit("locate-progress",b);m.progress(b)}function b(a){a={error:a};l.emit("error",a);m.progress(a)}var m=new s,l=this,c=null,f=[],n=[],g=[];a=a||{};for(var q=0;q<d.length;q++){var h=
d[q];if(h&&h instanceof A){var k=h.geometry;k&&a.useExistingGeometries&&t.getJsonType(k)===this.geometryType?(c||(c=k.spatialReference),!k.spatialReference||a.outSpatialReference&&!k.spatialReference.equals(a.outSpatialReference)?g.push(h):f.push(h)):n.push(h)}}var u;g.length&&(u=this._project(g,a.outSpatialReference,c||new z(4326)).then(function(){p(g)}));f.length&&p(f);this.loaded?this._locate(n,a).then(e,b,p):b("not loaded");return m.promise},_init:function(){this.geometryType&&(this.loaded=!0,
this.emit("load"))},_project:function(d,a,e){function p(c,b){var d=new s;B._projectFeatureSet({featureSet:{geometryType:m.geometryType,features:c}},b,a,function(a){for(a=0;a<c.length;a++){var b=c[a];b&&(b.geometry&&!b.geometry.toJson)&&(b.geometry=t.fromJson(b.geometry))}d.resolve()});return d.promise}for(var b=[],m=this,l=0;l<d.length;l++){var c=d[l],f=c&&c.geometry;if(f&&(f.spatialReference||f.setSpatialReference(e),!a.equals(f.spatialReference))){for(var n,g=0;g<b.length;g++)n=b[g].sref.equals(f.spatialReference)&&
b[g].features;n?n.push(c):b.push({sref:f.spatialReference,features:[c]})}}d=[];for(e=0;e<b.length;e++)d.push(p(b[e].features,b[e].sref));return w(d)}})});