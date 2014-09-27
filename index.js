function mediator() {

	if( !( this instanceof mediator ) ) {

		var rVal = Object.create( mediator.prototype );
		mediator.apply( rVal, arguments );
		return rVal;
	}

	this.items = arguments;
}

mediator.prototype = {

	init: function( data, onComplete ) {

		var numInit = 0,
			numToInit = 0,
			numItem = this.items.length,
			onInit = function() {

				if( ++numInit == numToInit )
					onComplete();
			};

		// the following needs to be done in two for loops
		// because init may complete immediately
		// looks odd but it's needed
		for( var i = 0; i < numItem; i++ ) {

			if( typeof this.items[ i ].init == 'function' )
				numToInit++;
		}

		// now finally do the initialization
		for( var i = 0; i < numItem; i++ ) {

			if( typeof this.items[ i ].init == 'function' )
				this.items[ i ].init( data, onInit );
		}
	},

	resize: function( w, h ) {

		for( var i = 0, len = this.items.length; i < len; i++ ) {

			if( typeof this.items[ i ].resize == 'function' )
				this.items[ i ].resize( w, h );
		}
	},

	aniIn: function( onComplete ) {

		this.doAni( 'aniIn', onComplete );		
	},

	aniOut: function( onComplete ) {

		this.doAni( 'aniOut', onComplete );
	},

	doAni: function( func, onComplete ) {

		var numAni = 0,
			numItem = this.items.length,
			onAni = function() {

				if( ++numAni == numItem )
					onComplete();
			};

		for( var i = 0; i < numItem; i++ ) {

			this.items[ i ][ func ]( onAni );
		}
	},

	destroy: function() {

		for( var i = 0, len = this.items.length; i < len; i++ ) {

			if( typeof this.items[ i ].destroy == 'function' )
				this.items[ i ].destroy();
		}
	}
};


module.exports = mediator;