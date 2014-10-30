/* global define */
define(['LibCanvas', 'atom'], function (LibCanvas, atom) {

  var Unit = atom.declare( LibCanvas.App.Element, {
    configure: function () {
      new LibCanvas.App.Clickable( this, this.redraw ).start();

    },
    renderTo: function (ctx, resources) {
      if (this.hover) {
        ctx.fill( this.shape, 'rgba(255,0,0,.2)' );
      }
    },
    get currentBoundingShape () {
      return this.shape;
    },
  });

  return Unit;
});
