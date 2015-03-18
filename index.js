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

    var numInit = 0;
    var numItem = 0;
    var onInit = function() {

      if( ++numInit === numItem ) {

        onComplete();
      }
    };
    var i;
    var len;

    // the following needs to be done in two for loops
    // because init may complete immediately
    // looks odd but it's needed
    for( i = 0, len = this.items.length; i < len; i++ ) {

      if( typeof this.items[ i ].init === 'function' ) {
        numItem++;
      }
    }

    // now finally do the initialization
    for( i = 0, len = this.items.length; i < len; i++ ) {

      if( typeof this.items[ i ].init === 'function' ) {
        this.items[ i ].init( data, onInit );
      }
    }
  },

  resize: function( w, h ) {

    for( var i = 0, len = this.items.length; i < len; i++ ) {

      if( typeof this.items[ i ].resize === 'function' ) {
        this.items[ i ].resize( w, h );
      }
    }
  },

  animateIn: function( data, onComplete ) {
    this.doAni( 'animateIn', data, onComplete );    
  },

  animateOut: function( data, onComplete ) {
    this.doAni( 'animateOut', data, onComplete );
  },

  doAni: function( func, data, onComplete ) {

    var numAni = 0;
    var numItem = 0;
    var onAni = function() {

      if( ++numAni === numItem )
        onComplete();
    };
    var i;
    var len;

    // we need to do two loops here just in case onComplete gets called immediately
    for( i = 0, len = this.items.length; i < len; i++ ) {

      if( typeof this.items[ i ][ func ] === 'function' ) {
        numItem++;
      }
    }

    // now call the animate in functions
    for( i = 0, len = this.items.length; i < len; i++ ) {

      if( typeof this.items[ i ][ func ] === 'function' ) {
        this.items[ i ][ func ]( data, onAni );
      }
    }
  },

  destroy: function(data, onComplete) {

    var numDestroy = 0;
    var numItem = 0;
    var onDestroy = function() {

      if( ++numDestroy === numItem ) {
        onComplete();
      }
    };
    var i;
    var len;

    for( i = 0, len = this.items.length; i < len; i++ ) {

      if( typeof this.items[ i ].destroy === 'function' ) {
        numItem++;
      }
    }

    for( i = 0, len = this.items.length; i < len; i++ ) {

      if( typeof this.items[ i ].destroy === 'function' ) {
        this.items[ i ].destroy(data, onDestroy);
      }
    }
  }
};


module.exports = mediator;