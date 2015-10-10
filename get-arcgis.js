/**
 * Created by alberto on 4/10/15.
 */
var esrislurp = require('esrislurp');

var version = '3.13';
var beautify = false;

function onSuccess() {
  console.log('Download finished successfully');
}

function onProgress(p) {
  console.log('File download count ' + p.count + '/' + p.total + ' ; ' + Math.round(p.count*10000 / p.total) / 100 + '%');
}

function onError(msg) {
  console.log('An error occurred');
}

esrislurp('./vendor/arcgis', version, beautify, onSuccess, onError, onProgress);
