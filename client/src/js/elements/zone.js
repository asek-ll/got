/* global define */
define(['LibCanvas', 'atom'], function (LibCanvas, atom) {
    
    var Zone = atom.declare( LibCanvas.App.Element, {
        configure: function () {
    		new LibCanvas.App.Clickable( this, this.redraw ).start();
    
    /*
    		this.events.add( 'mousedown', function () {
    			this.clicked = !this.clicked;
    			this.redraw();
    		});
    		*/
    	},
        renderTo: function (ctx, resources) {
            if(this.hover) {
                ctx.fill( this.shape, 'rgba(255,0,0,.5)' );
            } else if(this.clicked) {
                ctx.fill( this.shape, 'green' );
            } else {
                ctx.fill( this.shape, 'rgba(0,0,0,.5)' );
            }
        }
    });
    
    return Zone;
});