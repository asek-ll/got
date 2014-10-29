/* global define */
define(['LibCanvas', 'atom', 'elements/zone'], function (LibCanvas, atom, Zone) {
   
   return function(app) {

        var layer = app.canvasApp.createLayer({
            name: 'Zones',
            zIndex: 1,
            intersection: 'manual'
        });
        


        var first = new Zone( layer, {
            shape: new LibCanvas.Shapes.Polygon([
                [120,  30],
                [200,  10],
                [240, 120],
                [150, 150],
                [100, 100]
            ])
        });
        
        app.mouseHandler.subscribe(first);
        
   }; 
});