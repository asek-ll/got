/*global define, require*/
require.config({
  paths: {
    'LibCanvas': '../lib/libcanvas/libcanvas-full-compiled',
    'atom': '../lib/atomjs/atom-full-compiled'
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

define(['LibCanvas', 'atom'], function (LibCanvas, atom) {
  var width = 1280;
  var height = 1923;

  var app = new LibCanvas.App({
    size: new LibCanvas.Size(width, height)
  });

  var backgroundLayer = app.createLayer({
    name: 'background'
  });

  var imagePreloader = new atom.ImagePreloader({
    images: {
      map: 'images/map.jpg'
    },
    onReady: function (images) {
      app.resources.set('images', images);

      backgroundLayer.ctx.drawImage({
        image: images.get('map'),
        from: [0, 0]
      });

    }
  });

  var zonesLayer = app.createLayer({
    name: 'zones',
    zIndex: 1
  });

  var unitsLayer = app.createLayer({
    name: 'units',
    zIndex: 2
  });

  return app;
});
