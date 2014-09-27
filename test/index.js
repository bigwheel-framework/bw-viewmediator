var mediator = require( '../' );

var Content = {

	init: function( onComplete ) {

		console.log( 'init', this.name );	
		onComplete();
	},

	resize: function( w, h ) {

		console.log( 'resize', this.name, w, h );
	},

	aniIn: function( onComplete ) {

		console.log( 'aniIn', this.name );
		onComplete();
	},

	aniOut: function( onComplete ) {

		console.log( 'aniOut', this.name );
		onComplete();
	},

	destroy: function() {

		console.log( 'destroyed', this.name );
	}
};


var c1 = Object.create( Content );
var c2 = Object.create( Content );
var c3 = Object.create( Content );

c1.name = 'c1';
c2.name = 'c2';
c3.name = 'c3';

c2.init = undefined;
c2.destroy = undefined;

var combined = mediator( c1, c2, c3 );

combined.init( function() {

	console.log( '---INIT COMPLETE' );
});
combined.aniIn( function() {

	console.log( '---ANIIN COMPLETE' );
});
combined.aniOut( function() {

	console.log( '---ANIOUT COMPLETE' );
});
combined.destroy();