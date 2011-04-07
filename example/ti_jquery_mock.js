
var class2type = {};
jQuery = {
  isFunction: function(obj) {
    return jQuery.type(obj) === "function";
  },
  type: function( obj ) {
		return obj == null ? String( obj ) : class2type[ toString.call(obj) ] || "object";
	},
	
  extend: function() {
  	// copy reference to target object
  	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy;

  	// Handle a deep copy situation
  	if ( typeof target === "boolean" ) {
  		deep = target;
  		target = arguments[1] || {};
  		// skip the boolean and the target
  		i = 2;
  	}

  	// Handle case when target is a string or something (possible in deep copy)
  	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
  		target = {};
  	}

  	// extend jQuery itself if only one argument is passed
  	if ( length === i ) {
  		target = this;
  		--i;
  	}

  	for ( ; i < length; i++ ) {
  		// Only deal with non-null/undefined values
  		if ( (options = arguments[ i ]) != null ) {
  			// Extend the base object
  			for ( name in options ) {
  				src = target[ name ];
  				copy = options[ name ];

  				// Prevent never-ending loop
  				if ( target === copy ) {
  					continue;
  				}

  				// Recurse if we're merging object literal values or arrays
  				if ( deep && copy && ( jQuery.isPlainObject(copy) || jQuery.isArray(copy) ) ) {
  					var clone = src && ( jQuery.isPlainObject(src) || jQuery.isArray(src) ) ? src
  						: jQuery.isArray(copy) ? [] : {};

  					// Never move original objects, clone them
  					target[ name ] = jQuery.extend( deep, clone, copy );

  				// Don't bring in undefined values
  				} else if ( copy !== undefined ) {
  					target[ name ] = copy;
  				}
  			}
  		}
  	}

  	// Return the modified object
  	return target;
  },
  each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction(object);

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
			}
		}

		return object;
	},
	
  
  inArray: function( elem, array ) {
		if ( array.indexOf ) {
			return array.indexOf( elem );
		}

		for ( var i = 0, length = array.length; i < length; i++ ) {
			if ( array[ i ] === elem ) {
				return i;
			}
		}

		return -1;
	},
	browser: {
	  msie: false
	}
	
  
};
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
  class2type[ "[object " + name + "]" ] = name.toLowerCase();
});



$ = jQuery;
