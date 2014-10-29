/* global define */
define(['LibCanvas', 'atom'], function (LibCanvas, atom) {
    
    var Zone = atom.declare( LibCanvas.App.Element, {
        renderTo: function (ctx, resources) {
            ctx.fill( this.shape, 'red' );
        }
    });
    
    return Zone;
});