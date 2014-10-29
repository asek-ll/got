/* global define */
define(['LibCanvas', 'atom'], function (LibCanvas, atom) {
  
  var App = atom.Class({
    initialize: function (width, height) {
      this.settings = {};
      this.settings.width  = width;
      this.settings.height = height;
      
      this.canvasApp = new LibCanvas.App({
        size: new LibCanvas.Size(width, height)
      });
      
      this.events = new atom.Events();
    },
    
    load: function() {
      var _self = this;
      var imagePreloader = new atom.ImagePreloader({
        images: {
          map: 'images/map.jpg'
        },
        onReady: function (images) {
          _self.canvasApp.resources.set('images', images);
          _self.events.fire('resourceLoad', [_self.canvasApp.resources]);
        }
      });  
    }
    
  });

  return App;
});
