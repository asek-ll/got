/*global define, require*/
require.config({
  paths: {
    'LibCanvas': '../lib/libcanvas/libcanvas-full-compiled',
    'atom': '../lib/atomjs/atom-full-compiled',
    'zonesdata': '../../zones/zones'
  },
  shim: {
    'LibCanvas': {
      exports: 'LibCanvas',
      deps: ['atom']
    },
    'atom': {
      exports: 'atom'
    }
  }
});

define(['app', 'layers/background', 'layers/zones', 'layers/units'], function (App, BackgroundLayer, ZonesLayer, UnitsLayer) {
  var width = 1280;
  var height = 1923;
  
  var app = new App(width, height);
  BackgroundLayer(app);
  ZonesLayer(app);
  UnitsLayer(app);
  
  app.load();
  
});
