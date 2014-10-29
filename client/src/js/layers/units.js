/* global define */
define(['LibCanvas', 'atom'], function (LibCanvas, atom) {
   
   return function(app) {

        var backgroundLayer = app.canvasApp.createLayer({
            name: 'Units',
            zIndex: 2
        });
        
   }; 
});