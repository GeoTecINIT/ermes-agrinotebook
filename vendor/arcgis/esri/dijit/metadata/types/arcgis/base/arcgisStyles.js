// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.14/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/base/arcgisStyles","dojo/_base/lang dojo/_base/array dojo/has ../../../../../kernel ../../../base/xml/xmlUtil dojo/i18n!../../../nls/i18nArcGIS".split(" "),function(l,d,m,n,f,p){var k={getAll:function(){var a=[],c=function(b,g){var c={name:b,profile:g,label:b};a.push(c);try{var e=p.metadataStyle[b];"undefined"!==typeof e&&(null!==e&&0<e.length)&&(c.label=e)}catch(q){console.error(q)}};c("FGDC CSDGM Metadata","FGDC");c("INSPIRE Metadata Directive","INSPIRE");
c("ISO 19139 Metadata Implementation Specification GML3.2","ISO19139");c("ISO 19139 Metadata Implementation Specification","ISO19139");c("Item Description","ItemDescription");c("North American Profile of ISO19115 2003","NAP");return a},findByName:function(a){var c=this.getAll(),b=null;d.some(c,function(c){if(c.name===a)return b=c,!0});return b},findByProfile:function(a){var c=this.getAll(),b=null;d.some(c,function(c){if(c.profile===a)return b=c,!0});return b},findFromXmlDocument:function(a){var c=
null;(a=a.documentElement)&&(a.localName&&"metadata"===a.localName)&&d.some(a.childNodes,function(b){if(b.localName&&"Esri"===b.localName){var a=null,h=null,e=null;d.some(b.childNodes,function(a){if(a.localName&&"ArcGISstyle"===a.localName)return h=f.getNodeText(a),e=this.findByName(h),!0},this);d.some(b.childNodes,function(b){if(b.localName&&"ArcGISProfile"===b.localName)return f.getNodeText(b),a=this.findByProfile(a),!0},this);null!==a?(c=a,"ISO19139"===a.profile&&null!==e&&"ISO 19139 Metadata Implementation Specification"===
e.name&&(c=e)):null!==e&&(c=e);return!0}},this);return c},preLoad:function(a,c){var b=null,g=null;a.forceDefaultArcGISStyle&&(b=this.findByName(a.defaultArcGISStyle),null!==b&&(g=c.documentElement));g&&(g.localName&&"metadata"===g.localName)&&d.some(g.childNodes,function(a){if(a.localName&&"Esri"===a.localName){var c=null;d.some(a.childNodes,function(a){if(a.localName&&"ArcGISstyle"===a.localName)return c=f.getNodeText(a),c!==b.name&&d.some(a.childNodes,function(a){if(a.nodeType===f.nodeTypes.TEXT_NODE)return a.nodeValue=
b.name,!0},this),!0},this);d.some(a.childNodes,function(a){if(a.localName&&"ArcGISProfile"===a.localName)return c=f.getNodeText(a),c!==b.profile&&d.some(a.childNodes,function(a){if(a.nodeType===f.nodeTypes.TEXT_NODE)return a.nodeValue=b.profile,!0},this),!0},this)}},this)},setArcGISProfile:function(a,c){var b=null;try{c&&(b=this.findFromXmlDocument(c))}catch(d){console.error(d)}null===b&&(b=this.findByName(a.gxeContext.defaultArcGISStyle),null===b&&(b=this.findByName("ISO 19139 Metadata Implementation Specification GML3.2")));
var f=b.name,b=b.profile;a.ArcGISFormat="1.0";a.ArcGISProfile=b;a.ArcGISStyle=f;a.isAgsItemDescription=!1;a.isAgsFGDC=!1;a.isAgsISO19139=!1;a.isAgsINSPIRE=!1;a.isAgsNAP=!1;"ItemDescription"===b?a.isAgsItemDescription=!0:"FGDC"===b?a.isAgsFGDC=!0:"ISO19139"===b?a.isAgsISO19139=!0:"INSPIRE"===b?a.isAgsINSPIRE=!0:"NAP"===b&&(a.isAgsNAP=!0)}};m("extend-esri")&&l.setObject("dijit.metadata.types.arcgis.base.arcgisStyles",k,n);return k});