/* global define */
define(['LibCanvas', 'atom'], function (LibCanvas, atom) {
   
   return function(app) {

        var backgroundLayer = app.canvasApp.createLayer({
            name: 'Background'
        });
        
        app.events.add('resourceLoad', function(resources) {
            backgroundLayer.ctx.drawImage({
                image: resources.get('images').get('map'),
                from: [0, 0]
            });
        });
   }; 
});