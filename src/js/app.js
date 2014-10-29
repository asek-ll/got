/* global define */
define(['LibCanvas', 'atom'], function (LibCanvas, atom) {
  var width = 1280;
  var height = 1923;

  var app = new LibCanvas.App({
    size: new LibCanvas.Size(width, height)
  });

  var imagePreloader = new atom.ImagePreloader({
    images: {
      map: 'images/map.jpg'
    },
    onReady: function (images) {
      app.resources.set('images', images);
    }
  });

  var backgroundLayer = app.createLayer({
    name: 'background'
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
