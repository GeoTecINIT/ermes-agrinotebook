/*! esri-offline-maps - v2.14.0 - 2015-08-14
*   Copyright (c) 2015 Environmental Systems Research Institute, Inc.
*   Apache License*/
define([
    "dojo/query",
    "dojo/request",
    "dojo/_base/declare",
    "esri/layers/LOD",
    "esri/geometry/Point",
    "esri/geometry/Extent",
    "esri/layers/TileInfo",
    "esri/SpatialReference",
    "esri/geometry/Polygon",
    "esri/layers/TiledMapServiceLayer",
    "oesri/offline-tiles-core-src"
], function(query, request, declare, LOD, Point, Extent, TileInfo,
            SpatialReference, Polygon, TiledMapServerLayer, TilesCore)
{
    "use strict";
    return declare("O.esri.Tiles.OfflineTileEnablerLayer",[TiledMapServerLayer],{

        tileInfo: null,
        _imageType: "",
        _level: null, //current zoom level
        _minZoom: null,
        _maxZoom: null,
        _tilesCore:null,

        constructor:function(url,callback,/* boolean */ state,/* Object */ dbConfig){

            if(this._isLocalStorage() === false){
                alert("OfflineTiles Library not supported on this browser.");
                callback(false);
            }

            if( dbConfig === undefined || dbConfig === null){
                // Database properties
                this.DB_NAME = "offline_tile_store";       // Sets the database name.
                this.DB_OBJECTSTORE_NAME = "tilepath"; // Represents an object store that allows access to a set of data in the IndexedDB database
            }
            else {
                this.DB_NAME = dbConfig.dbName;
                this.DB_OBJECTSTORE_NAME = dbConfig.objectStoreName;
            }

            this._tilesCore = new TilesCore();

            //For calculating minZoom and maxZoom
            Array.prototype.sortNumber = function(){return this.sort(function(a,b){return a - b;});};

            this._self = this;
            this._lastTileUrl = "";
            this._imageType = "";

            /* we add some methods to the layer object */
            /* we don't want to extend the tiled layer class, as it is a capability that we want to add only to one instance */
            /* we also add some additional attributes inside an "offline" object */

            this._getTileUrl = this.getTileUrl;

            var isOnline = true;
            if(typeof state != "undefined" || state != null){
                isOnline = state; console.log("STATE IS: " + state);
            }

            /**
             * Option to show/hide blank tile images. When using multiple basemap layers,
             * if one has no tiles, this will display and cover another basemap storage which may have tiles.
             * @type {boolean}
             */
            this.showBlankTiles = true;

            /**
             * IMPORTANT! proxyPath is set to null by default since we assume Feature Service is CORS-enabled.
             * All AGOL Feature Services are CORS-enabled.
             *
             * @type {{online: boolean, store: O.esri.Tiles.TilesStore, proxyPath: null}}
             */
            this.offline = {
                online: isOnline,
                store: new O.esri.Tiles.TilesStore(),
                proxyPath: null
            };

            if( /*false &&*/ this.offline.store.isSupported() )
            {
                this.offline.store.dbName = this.DB_NAME;
                this.offline.store.objectStoreName = this.DB_OBJECTSTORE_NAME;
                this.offline.store.init(function(success){
                    if(success){
                        this._getTileInfoPrivate(url,function(result){

                            // Store the layerInfo locally so we have it when browser restarts or is reloaded.
                            // We need this info in order to properly rebuild the layer.
                            if(localStorage.__offlineTileInfo === undefined && result !== false){
                                localStorage.__offlineTileInfo = result;
                            }

                            // If library is offline then attempt to get layerInfo from localStorage.
                            if(this.offline.online === false && result === false && localStorage.__offlineTileInfo !== undefined){
                                result = localStorage.__offlineTileInfo;
                            }
                            else if(this.offline.online === false && result === false && localStorage.__offlineTileInfo === undefined){
                                alert("There was a problem retrieving tiled map info in OfflineTilesEnablerLayer.");
                            }

                            this._tilesCore._parseGetTileInfo(result,function(tileResult){
                                this.layerInfos = tileResult.resultObj.layers;
                                this.minScale = tileResult.resultObj.minScale;
                                this.maxScale = tileResult.resultObj.maxScale;
                                this.tileInfo = tileResult.tileInfo;
                                this._imageType = this.tileInfo.format.toLowerCase();
                                this.fullExtent = tileResult.fullExtent;
                                this.spatialReference = this.tileInfo.spatialReference;
                                this.initialExtent = tileResult.initExtent;
                                this.loaded = true;
                                this.onLoad(this);
                                callback(true);
                            }.bind(this._self));
                        }.bind(this._self));
                    }
                }.bind(this._self));
            }
            else
            {
                return callback(false, "indexedDB not supported");
            }
        },

        /**
         * Internal method that overrides the getTileUrl() method.
         * If application is offline then tiles are written to IndexedDB.
         * Retrieves tiles as requested by the ArcGIS API for JavaScript.
         * If a tile is in cache it is returned.
         * If it is not in cache then one is retrieved over the internet.
         * @param level
         * @param row
         * @param col
         * @returns {String} URL
         */
        getTileUrl: function(level,row,col)
        {
            console.assert(!isNaN(level) && !isNaN(row) && !isNaN(col), "bad tile requested");
            //console.log("looking for tile",level,row,col);

            this._level = level;

            var url = this.url + "/tile/" + level + "/" + row + "/" + col;
            //console.log("LIBRARY ONLINE " + this.offline.online);
            if( this.offline.online )
            {
                //console.log("fetching url online: ", url);
                this._lastTileUrl = url;
                return url;
            }

            url = url.split("?")[0];

            /* temporary URL returned immediately, as we haven't retrieved the image from the indexeddb yet */
            var tileid = "void:/"+level+"/"+row+"/"+col;
            var img = null;
            this._tilesCore._getTiles(img,this._imageType,url,tileid,this.offline.store,query,this.showBlankTiles);

            return tileid;
        },

        /**
         * Utility method to get the basemap layer reference
         * @param map
         * @returns {Number} layerId
         */
        getBasemapLayer: function(map)
        {
            var layerId = map.layerIds[0];
            return map.getLayer(layerId);
        },

        /**
         * Returns an object that contains the number of tiles that would need to be downloaded
         * for the specified extent and zoom level, and the estimated byte size of such tiles.
         * This method is useful to give the user an indication of the required time and space
         * before launching the actual download operation. The byte size estimation is very rough.
         * @param extent
         * @param level
         * @param tileSize
         * @returns {{level: *, tileCount: Number, sizeBytes: number}}
         */
        getLevelEstimation: function(extent, level, tileSize)
        {
            var tilingScheme = new O.esri.Tiles.TilingScheme(this);
            var cellIds = tilingScheme.getAllCellIdsInExtent(extent,level);

            var levelEstimation = {
                level: level,
                tileCount: cellIds.length,
                sizeBytes: cellIds.length * tileSize
            };

            return levelEstimation;
        },

        /**
         * Returns the current zoom level
         * @returns {number}
         */
        getLevel: function(){
            return this._level;
        },

        /**
         * Returns the maximum zoom level for this layer
         * @param callback number
         */
        getMaxZoom: function(callback){

            if(this._maxZoom == null){
                this._maxZoom = this.tileInfo.lods[this.tileInfo.lods.length-1].level;
            }
            callback(this._maxZoom);
        },

        /**
         * Returns the minimum zoom level for this layer
         * @param callback number
         */
        getMinZoom: function(callback){

            if(this._minZoom == null){
                this._minZoom = this.tileInfo.lods[0].level;
            }
            callback(this._minZoom);
        },

        /**
         * Utility method for bracketing above and below your current Level of Detail. Use
         * this in conjunction with setting the minLevel and maxLevel in prepareForOffline().
         * @param minZoomAdjust An Integer specifying how far above the current layer you want to retrieve tiles
         * @param maxZoomAdjust An Integer specifying how far below (closer to earth) the current layer you want to retrieve tiles
         */
        getMinMaxLOD: function(minZoomAdjust,maxZoomAdjust){
            var zoom = {};
            var map = this.getMap();
            var min = map.getLevel() - Math.abs(minZoomAdjust);
            var max = map.getLevel() + maxZoomAdjust;
            if(this._maxZoom != null && this._minZoom != null){
                zoom.max = Math.min(this._maxZoom, max);  //prevent errors by setting the tile layer floor
                zoom.min = Math.max(this._minZoom, min);   //prevent errors by setting the tile layer ceiling
            }
            else{
                this.getMinZoom(function(result){
                    zoom.min = Math.max(result, min);   //prevent errors by setting the tile layer ceiling
                });

                this.getMaxZoom(function(result){
                    zoom.max = Math.min(result, max);  //prevent errors by setting the tile layer floor
                });
            }

            return zoom;

        },

        /**
         * Retrieves tiles and stores them in the local cache.
         * @param minLevel
         * @param maxLevel
         * @param extent
         * @param reportProgress
         */
        prepareForOffline : function(minLevel, maxLevel, extent, reportProgress)
        {
            this._tilesCore._createCellsForOffline(this,minLevel,maxLevel,extent,function(cells){
                /* launch tile download */
                this._doNextTile(0, cells, reportProgress);
            }.bind(this));
        },

        /**
         * This method puts the layer in offline mode. When in offline mode,
         * the layer will not fetch any tile from the remote server. It
         * will look up the tiles in the indexed db database and display them in the
         * If the tile can't be found in the local database it will show up blank
         * (even if there is actual connectivity). The pair of methods goOffline() and
         * goOnline()allows the developer to manually control the behaviour of the
         * Used in conjunction with the offline dectection library, you can put the layer in
         * the appropriate mode when the offline condition changes.
         */
        goOffline : function()
        {
            this.offline.online = false;
        },

        /**
         * This method puts the layer in online mode. When in online mode, the layer will
         * behave as regular layers, fetching all tiles from the remote server.
         * If there is no internet connectivity the tiles may appear thanks to the browsers cache,
         * but no attempt will be made to look up tiles in the local database.
         */
        goOnline : function()
        {
            this.offline.online = true;
            this.refresh();
        },

        /**
         * Determines if application is online or offline
         * @returns {boolean}
         */
        isOnline : function()
        {
            return this.offline.online;
        },

        /**
         * Clears the local cache of tiles.
         * @param callback callback(boolean, errors)
         */
        deleteAllTiles : function(callback) // callback(success) or callback(false, error)
        {
            var store = this.offline.store;
            store.deleteAll(callback);
        },

        /**
         * Gets the size in bytes of the local tile cache.
         * @param callback  callback(size, error)
         */
        getOfflineUsage : function(callback) // callback({size: <>, tileCount: <>}) or callback(null,error)
        {
            var store = this.offline.store;
            store.usedSpace(callback);
        },

        /**
         * Gets polygons representing all cached cell ids within a particular
         * zoom level and bounded by an extent.
         * @param callback callback(polygon, error)
         */
        getTilePolygons : function(callback)	// callback(Polygon polygon) or callback(null, error)
        {
            this._tilesCore._getTilePolygons(this.offline.store,this.url,this,callback);
        },

        /**
         * Saves tile cache into a portable csv format.
         * @param fileName
         * @param callback callback( boolean, error)
         */
        saveToFile : function(fileName, callback) // callback(success, msg)
        {
            this._tilesCore._saveToFile(fileName,this.offline.store,callback);
        },

        /**
         * Reads a csv file into local tile cache.
         * @param file
         * @param callback callback( boolean, error)
         */
        loadFromFile : function(file, callback) // callback(success,msg)
        {
            console.log("reading",file);
            this._tilesCore._loadFromFile(file,this.offline.store,callback);
        },

        /**
         * Makes a request to a tile url and uses that as a basis for the
         * the average tile size.
         * Future Iterations could call multiple tiles and do an actual average.
         * @param callback
         * @returns {Number} Returns NaN if there was a problem retrieving the tile
         */
        estimateTileSize : function(callback)
        {
            this._tilesCore._estimateTileSize(request,this._lastTileUrl,this.offline.proxyPath,callback);
        },

        /**
         * Helper method that returns a new extent buffered by a given measurement that's based on map units.
         * E.g. If you are using mercator then buffer would be in meters
         * @param buffer
         * @returns {Extent}
         */
        getExtentBuffer : function(/* int */ buffer, /* Extent */ extent){
            extent.xmin -= buffer; extent.ymin -= buffer;
            extent.xmax += buffer; extent.ymax += buffer;
            return extent;
        },

        /**
         * Helper method that returns an array of tile urls within a given extent and level
         * @returns Array
         */
        getTileUrlsByExtent : function(extent,level){
            var tilingScheme = new O.esri.Tiles.TilingScheme(this);
            var level_cell_ids = tilingScheme.getAllCellIdsInExtent(extent,level);
            var cells = [];

            level_cell_ids.forEach(function(cell_id)
            {
                cells.push(this.url + "/" + level + "/" + cell_id[1] + "/" + cell_id[0]);
            }.bind(this));

            return cells;
        },

        /* internal methods */

        _doNextTile : function(i, cells, reportProgress)
        {
            var cell = cells[i];

            var url = this._getTileUrl(cell.level,cell.row,cell.col);

            this._tilesCore._storeTile(url,this.offline.proxyPath,this.offline.store,function(success, error)
            {
                if(!success)
                {
                    console.log("error storing tile", cell, error);
                    error = { cell:cell, msg:error};
                }

                var cancelRequested = reportProgress({countNow:i, countMax:cells.length, cell: cell, error: error, finishedDownloading:false});

                if( cancelRequested || i === cells.length-1 )
                {
                    reportProgress({ finishedDownloading: true, cancelRequested: cancelRequested});
                }
                else
                {
                    this._doNextTile(i+1, cells, reportProgress);
                }

            }.bind(this));
        },

        /**
         * Test for localStorage functionality
         * @returns {boolean}
         * @private
         */
        _isLocalStorage: function(){
            var test = "test";
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch(e) {
                return false;
            }
        },

        /**
         * Attempts an http request to verify if app is online or offline.
         * Use this in conjunction with the offline checker library: offline.min.js
         * @param callback
         */
        _getTileInfoPrivate: function(url, callback){
            var req = new XMLHttpRequest();
            var finalUrl = this.offline.proxyPath != null? this.offline.proxyPath + "?" + url + "?f=pjson" : url + "?f=pjson";
            req.open("GET", finalUrl, true);
            req.onload = function()
            {
                if( req.status === 200 && req.responseText !== "")
                {
                    callback(this.response);
                }
                else
                {
                    console.log("_getTileInfoPrivate failed");
                    callback(false);
                }
            };
            req.onerror = function(e)
            {
                console.log("_getTileInfoPrivate failed: " + e);
                callback(false);
            };
            req.send(null);
        }
    }); // declare
}); // define
/**
 * Creates a namespace for the non-AMD libraries in this directory
 */

if(typeof O != "undefined"){
    O.esri.Tiles = {};
}
else{
    O = {};  // jshint ignore:line
    O.esri = {
        Tiles: {}
    };
}

//"use strict";
/*jslint bitwise: true */

O.esri.Tiles.Base64Utils={};
O.esri.Tiles.Base64Utils.outputTypes={
    //	summary:
    //		Enumeration for input and output encodings.
    Base64:0, Hex:1, String:2, Raw:3
};

	//	word-based addition
O.esri.Tiles.Base64Utils.addWords=function(/* word */a, /* word */b){
    //	summary:
    //		add a pair of words together with rollover
    var l=(a&0xFFFF)+(b&0xFFFF);
    var m=(a>>16)+(b>>16)+(l>>16);
    return (m<<16)|(l&0xFFFF);	//	word
};

O.esri.Tiles.Base64Utils.stringToWord=function(/* string */s){
    //	summary:
    //		convert a string to a word array


    //	word-based conversion method, for efficiency sake;
    //	most digests operate on words, and this should be faster
    //	than the encoding version (which works on bytes).
    var chrsz=8;	//	16 for Unicode
    var mask=(1<<chrsz)-1;

    var wa=[];
    for(var i=0, l=s.length*chrsz; i<l; i+=chrsz){
        wa[i>>5]|=(s.charCodeAt(i/chrsz)&mask)<<(i%32);
    }
    return wa;	//	word[]
};

O.esri.Tiles.Base64Utils.wordToString=function(/* word[] */wa){
    //	summary:
    //		convert an array of words to a string

    //	word-based conversion method, for efficiency sake;
    //	most digests operate on words, and this should be faster
    //	than the encoding version (which works on bytes).
    var chrsz=8;	//	16 for Unicode
    var mask=(1<<chrsz)-1;

    var s=[];
    for(var i=0, l=wa.length*32; i<l; i+=chrsz){
        s.push(String.fromCharCode((wa[i>>5]>>>(i%32))&mask));
    }
    return s.join("");	//	string
};

O.esri.Tiles.Base64Utils.wordToHex=function(/* word[] */wa){
    //	summary:
    //		convert an array of words to a hex tab
    var h="0123456789abcdef", s=[];
    for(var i=0, l=wa.length*4; i<l; i++){
        s.push(h.charAt((wa[i>>2]>>((i%4)*8+4))&0xF)+h.charAt((wa[i>>2]>>((i%4)*8))&0xF));
    }
    return s.join("");	//	string
};

O.esri.Tiles.Base64Utils.wordToBase64=function(/* word[] */wa){
    //	summary:
    //		convert an array of words to base64 encoding, should be more efficient
    //		than using dojox.encoding.base64
    var p="=", tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s=[];
    for(var i=0, l=wa.length*4; i<l; i+=3){
        var t=(((wa[i>>2]>>8*(i%4))&0xFF)<<16)|(((wa[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((wa[i+2>>2]>>8*((i+2)%4))&0xFF);
        for(var j=0; j<4; j++){
            if(i*8+j*6>wa.length*32){
                s.push(p);
            } else {
                s.push(tab.charAt((t>>6*(3-j))&0x3F));
            }
        }
    }
    return s.join("");	//	string
};

/*jslint bitwise: false */
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2013-10-21
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
 plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */


O.esri.Tiles.saveAs =
// IE 10 support, see Eli Grey's original source
//    || (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
    function(view) {
    "use strict";
    var
        doc = view.document
    // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
        , get_URL = function() {
            return view.URL || view.webkitURL || view;
        }
        , URL = view.URL || view.webkitURL || view
        , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
        , can_use_save_link =  !view.externalHost && "download" in save_link
        , click = function(node) {
            var event = doc.createEvent("MouseEvents");
            event.initMouseEvent(
                "click", true, false, view, 0, 0, 0, 0, 0
                , false, false, false, false, 0, null
            );
            node.dispatchEvent(event);
        }
        , webkit_req_fs = view.webkitRequestFileSystem
        , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
        , throw_outside = function (ex) {
            (view.setImmediate || view.setTimeout)(function() {
                throw ex;
            }, 0);
        }
        , force_saveable_type = "application/octet-stream"
        , fs_min_size = 0
        , deletion_queue = []
        , process_deletion_queue = function() {
            var i = deletion_queue.length;
            while (i--) {
                var file = deletion_queue[i];
                if (typeof file === "string") { // file is an object URL
                    URL.revokeObjectURL(file);
                } else { // file is a File
                    file.remove();
                }
            }
            deletion_queue.length = 0; // clear queue
        }
        , dispatch = function(filesaver, event_types, event) {
            event_types = [].concat(event_types);
            var i = event_types.length;
            while (i--) {
                var listener = filesaver["on" + event_types[i]];
                if (typeof listener === "function") {
                    try {
                        listener.call(filesaver, event || filesaver);
                    } catch (ex) {
                        throw_outside(ex);
                    }
                }
            }
        }
        , FileSaver = function(blob, name) {
            // First try a.download, then web filesystem, then object URLs
            var
                filesaver = this
                , type = blob.type
                , blob_changed = false
                , object_url
                , target_view
                , get_object_url = function() {
                    var object_url = get_URL().createObjectURL(blob);
                    deletion_queue.push(object_url);
                    return object_url;
                }
                , dispatch_all = function() {
                    dispatch(filesaver, "writestart progress write writeend".split(" "));
                }
            // on any filesys errors revert to saving with object URLs
                , fs_error = function() {
                    // don't create more object URLs than needed
                    if (blob_changed || !object_url) {
                        object_url = get_object_url(blob);
                    }
                    if (target_view) {
                        target_view.location.href = object_url;
                    } else {
                        window.open(object_url, "_blank");
                    }
                    filesaver.readyState = filesaver.DONE;
                    dispatch_all();
                }
                , abortable = function(func) {
                    return function() {
                        if (filesaver.readyState !== filesaver.DONE) {
                            return func.apply(this, arguments);
                        }
                    };
                }
                , create_if_not_found = {create: true, exclusive: false}
                , slice
                ;
            filesaver.readyState = filesaver.INIT;
            if (!name) {
                name = "download";
            }
            if (can_use_save_link) {
                object_url = get_object_url(blob);
                // FF for Android has a nasty garbage collection mechanism
                // that turns all objects that are not pure javascript into 'deadObject'
                // this means `doc` and `save_link` are unusable and need to be recreated
                // `view` is usable though:
                doc = view.document;
                save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
                save_link.href = object_url;
                save_link.download = name;
                var event = doc.createEvent("MouseEvents");
                event.initMouseEvent(
                    "click", true, false, view, 0, 0, 0, 0, 0
                    , false, false, false, false, 0, null
                );
                save_link.dispatchEvent(event);
                filesaver.readyState = filesaver.DONE;
                dispatch_all();
                return;
            }
            // Object and web filesystem URLs have a problem saving in Google Chrome when
            // viewed in a tab, so I force save with application/octet-stream
            // http://code.google.com/p/chromium/issues/detail?id=91158
            if (view.chrome && type && type !== force_saveable_type) {
                slice = blob.slice || blob.webkitSlice;
                blob = slice.call(blob, 0, blob.size, force_saveable_type);
                blob_changed = true;
            }
            // Since I can't be sure that the guessed media type will trigger a download
            // in WebKit, I append .download to the filename.
            // https://bugs.webkit.org/show_bug.cgi?id=65440
            if (webkit_req_fs && name !== "download") {
                name += ".download";
            }
            if (type === force_saveable_type || webkit_req_fs) {
                target_view = view;
            }
            if (!req_fs) {
                fs_error();
                return;
            }
            fs_min_size += blob.size;
            req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
                fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
                    var save = function() {
                        dir.getFile(name, create_if_not_found, abortable(function(file) {
                            file.createWriter(abortable(function(writer) {
                                writer.onwriteend = function(event) {
                                    target_view.location.href = file.toURL();
                                    deletion_queue.push(file);
                                    filesaver.readyState = filesaver.DONE;
                                    dispatch(filesaver, "writeend", event);
                                };
                                writer.onerror = function() {
                                    var error = writer.error;
                                    if (error.code !== error.ABORT_ERR) {
                                        fs_error();
                                    }
                                };
                                "writestart progress write abort".split(" ").forEach(function(event) {
                                    writer["on" + event] = filesaver["on" + event];
                                });
                                writer.write(blob);
                                filesaver.abort = function() {
                                    writer.abort();
                                    filesaver.readyState = filesaver.DONE;
                                };
                                filesaver.readyState = filesaver.WRITING;
                            }), fs_error);
                        }), fs_error);
                    };
                    dir.getFile(name, {create: false}, abortable(function(file) {
                        // delete file if it already exists
                        file.remove();
                        save();
                    }), abortable(function(ex) {
                        if (ex.code === ex.NOT_FOUND_ERR) {
                            save();
                        } else {
                            fs_error();
                        }
                    }));
                }), fs_error);
            }), fs_error);
        }
        , FS_proto = FileSaver.prototype
        , saveAs = function(blob, name) {
            return new FileSaver(blob, name);
        }
        ;
    FS_proto.abort = function() {
        var filesaver = this;
        filesaver.readyState = filesaver.DONE;
        dispatch(filesaver, "abort");
    };
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
        FS_proto.onwritestart =
            FS_proto.onprogress =
                FS_proto.onwrite =
                    FS_proto.onabort =
                        FS_proto.onerror =
                            FS_proto.onwriteend =
                                null;

    view.addEventListener("unload", process_deletion_queue, false);
    return saveAs;

}(this.self || this.window || this.content);
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

//if (typeof module !== 'undefined') module.exports = saveAs;

/*global indexedDB */
/**
 * Library for handling the storing of map tiles in IndexedDB.
 *
 * Author: Andy Gup (@agup)
 * Contributor: Javier Abadia (@javierabadia)
 */

O.esri.Tiles.TilesStore = function(){
    /**
     * Internal reference to the local database
     * @type {null}
     * @private
     */
    this._db = null;

    this.dbName = "offline_tile_store";
    this.objectStoreName = "tilepath";

    /**
     * Determines if indexedDB is supported
     * @returns {boolean}
     */
    this.isSupported = function(){

        if(!window.indexedDB && !window.openDatabase){
            return false;
        }

        return true;
    };

    /**
     * Adds an object to the database
     * @param urlDataPair
     * @param callback callback(boolean, err)
     */
    this.store = function(urlDataPair,callback)
    {
        try
        {
            var transaction = this._db.transaction([this.objectStoreName],"readwrite");

            transaction.oncomplete = function()
            {
                callback(true);
            };

            transaction.onerror = function(event)
            {
                callback(false,event.target.error.message);
            };

            var objectStore = transaction.objectStore(this.objectStoreName);
            var request = objectStore.put(urlDataPair);
            request.onsuccess = function()
            {
                //console.log("item added to db " + event.target.result);
            };
        }
        catch(err)
        {
            console.log("TilesStore: " + err.stack);
            callback(false, err.stack);
        }
    };

    /**
     * Retrieve a record.
     * @param url
     * @param callback
     */
    this.retrieve = function(/* String */ url,callback)
    {
        if(this._db !== null)
        {
            var objectStore = this._db.transaction([this.objectStoreName]).objectStore(this.objectStoreName);
            var request = objectStore.get(url);
            request.onsuccess = function(event)
            {
                var result = event.target.result;
                if(result === undefined)
                {
                    callback(false,"not found");
                }
                else
                {
                    callback(true,result);
                }
            };
            request.onerror = function(err)
            {
                console.log(err);
                callback(false, err);
            };
        }
    };

    /**
     * Deletes entire database
     * @param callback callback(boolean, err)
     */
    this.deleteAll = function(callback)
    {
        if(this._db !== null)
        {
            var request = this._db.transaction([this.objectStoreName],"readwrite")
                .objectStore(this.objectStoreName)
                .clear();
            request.onsuccess = function()
            {
                callback(true);
            };
            request.onerror = function(err)
            {
                callback(false, err);
            };
        }
        else
        {
            callback(false,null);
        }
    };

    /**
     * Delete an individual entry
     * @param url
     * @param callback callback(boolean, err)
     */
    this.delete = function(/* String */ url,callback)
    {
        if(this._db !== null)
        {
            var request = this._db.transaction([this.objectStoreName],"readwrite")
                .objectStore(this.objectStoreName)
                .delete(url);
            request.onsuccess = function()
            {
                callback(true);
            };
            request.onerror = function(err)
            {
                callback(false, err);
            };
        }
        else
        {
            callback(false,null);
        }
    };

    /**
     * Retrieve all tiles from indexeddb
     * @param callback callback(url, img, err)
     */
    this.getAllTiles = function(callback)
    {
        if(this._db !== null){
            var transaction = this._db.transaction([this.objectStoreName])
                .objectStore(this.objectStoreName)
                .openCursor();

            transaction.onsuccess = function(event)
            {
                var cursor = event.target.result;
                if(cursor){
                    var url = cursor.value.url;
                    var img = cursor.value.img;
                    callback(url,img,null);
                    cursor.continue();
                }
                else
                {
                    callback(null, null, "end");
                }
            }.bind(this);
            transaction.onerror = function(err)
            {
                callback(null, null, err);
            };
        }
        else
        {
            callback(null, null, "no db");
        }
    };

    /**
     * Provides the size of database in bytes
     * @param callback callback(size, null) or callback(null, error)
     */
    this.usedSpace = function(callback){
        if(this._db !== null){
            var usage = { sizeBytes: 0, tileCount: 0 };

            var transaction = this._db.transaction([this.objectStoreName])
                .objectStore(this.objectStoreName)
                .openCursor();

            transaction.onsuccess = function(event){
                var cursor = event.target.result;
                if(cursor){
                    var storedObject = cursor.value;
                    var json = JSON.stringify(storedObject);
                    usage.sizeBytes += this._stringBytes(json);
                    usage.tileCount += 1;
                    cursor.continue();
                }
                else
                {
                    callback(usage,null);
                }
            }.bind(this);
            transaction.onerror = function(err)
            {
                callback(null, err);
            };
        }
        else
        {
            callback(null,null);
        }
    };

    this._stringBytes = function(str) {
        return str.length /**2*/ ;
    };

    this.init = function(callback)
    {
        var request = indexedDB.open(this.dbName, 4);
        callback = callback || function(success) { console.log("TilesStore::init() success:", success); }.bind(this);

        request.onerror = function(event)
        {
            console.log("indexedDB error: " + event.target.errorCode);
            callback(false,event.target.errorCode);
        }.bind(this);

        request.onupgradeneeded = function(event)
        {
            var db = event.target.result;

            if( db.objectStoreNames.contains(this.objectStoreName))
            {
                db.deleteObjectStore(this.objectStoreName);
            }

            db.createObjectStore(this.objectStoreName, { keyPath: "url" });
        }.bind(this);

        request.onsuccess = function(event)
        {
            this._db = event.target.result;
            console.log("database opened successfully");
            callback(true);
        }.bind(this);
    };
};


O.esri.Tiles.TilingScheme = function (layer) {
    this.tileInfo = layer.tileInfo;
};

O.esri.Tiles.TilingScheme.prototype = {
    getCellIdFromXy: function (x, y, level) {
        var col = Math.floor((x - this.tileInfo.origin.x) / (this.tileInfo.cols * this.tileInfo.lods[level].resolution));
        var row = Math.floor((this.tileInfo.origin.y - y) / (this.tileInfo.rows * this.tileInfo.lods[level].resolution));
        return [col, row];
    },

    getCellPolygonFromCellId: function (cellId, level) {
        var col1 = cellId[0];
        var row1 = cellId[1];
        var col2 = col1 + 1;
        var row2 = row1 + 1;

        var x1 = this.tileInfo.origin.x + (col1 * this.tileInfo.cols * this.tileInfo.lods[level].resolution);
        var y1 = this.tileInfo.origin.y - (row1 * this.tileInfo.rows * this.tileInfo.lods[level].resolution);
        var x2 = this.tileInfo.origin.x + (col2 * this.tileInfo.cols * this.tileInfo.lods[level].resolution);
        var y2 = this.tileInfo.origin.y - (row2 * this.tileInfo.rows * this.tileInfo.lods[level].resolution);

        var polygon;
        var spatialReference = this.tileInfo.spatialReference;

        require(["esri/geometry/Polygon"],function(Polygon){
            polygon = new Polygon(spatialReference);
        });

        polygon.addRing([
            [x1, y1], // clockwise
            [x2, y1],
            [x2, y2],
            [x1, y2],
            [x1, y1]
        ]);
        return polygon;
    },

    getAllCellIdsInExtent: function (extent, gridLevel) {
        var cellId0 = this.getCellIdFromXy(extent.xmin, extent.ymin, gridLevel);
        var cellId1 = this.getCellIdFromXy(extent.xmax, extent.ymax, gridLevel);

        var i, j;
        var i0 = Math.max(Math.min(cellId0[0], cellId1[0]), this.tileInfo.lods[gridLevel].startTileCol);
        var i1 = Math.min(Math.max(cellId0[0], cellId1[0]), this.tileInfo.lods[gridLevel].endTileCol);
        var j0 = Math.max(Math.min(cellId0[1], cellId1[1]), this.tileInfo.lods[gridLevel].startTileRow);
        var j1 = Math.min(Math.max(cellId0[1], cellId1[1]), this.tileInfo.lods[gridLevel].endTileRow);

        var cellIds = [];

        for (i = i0; i <= i1; i++) {
            for (j = j0; j <= j1; j++) {
                cellIds.push([i, j]);
            }
        }
        return cellIds;
    }
};

