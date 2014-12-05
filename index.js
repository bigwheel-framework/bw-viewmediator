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

	aniIn: function( data, onComplete ) {
		this.doAni( 'aniIn', data, onComplete );		
	},

	aniOut: function( data, onComplete ) {
		this.doAni( 'aniOut', data, onComplete );
	},

	doAni: function( func, data, onComplete ) {

		var numAni = numItem = 0,
			onAni = function() {

				if( ++numAni == numItem )
					onComplete();
			};

		// we need to do two loops here just in case onComplete gets called immediately
		for( var i = 0, len = this.items.length; i < len; i++ ) {

			if( typeof this.items[ i ][ func ] == 'function' )
				numItem++;
		}

		// now call the animate in functions
		for( var i = 0, len = this.items.length; i < len; i++ ) {

			if( typeof this.items[ i ][ func ] == 'function' )
				this.items[ i ][ func ]( data, onAni );
		}
	},

	destroy: function(data, onComplete) {

		var numDestroy = numItem = 0,
			onDestroy = function() {

			if( ++numDestroy == numItem )
				onComplete();
		};

		for( var i = 0, len = this.items.length; i < len; i++ ) {

			if( typeof this.items[ i ].destroy == 'function' ) 
				numItem++;
		}

		for( var i = 0, len = this.items.length; i < len; i++ ) {

			if( typeof this.items[ i ].destroy == 'function' ) 
				this.items[ i ].destroy(data, onDestroy);
		}
	}
};


module.exports = mediator;