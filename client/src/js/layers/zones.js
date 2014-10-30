/* global define */
define(['LibCanvas', 'atom', 'elements/zone', 'zonesdata'], function (LibCanvas, atom, Zone, zonesData) {

  return function(app) {

    var layer = app.canvasApp.createLayer({
      name: 'Zones',
      zIndex: 1,
      intersection: 'manual'
    });

    zonesData.forEach(function (zone) {

      var first = new Zone( layer, {
        shape: new LibCanvas.Shapes.Polygon(zone.coords)
      });

      app.mouseHandler.subscribe(first);

    });
  };
});
