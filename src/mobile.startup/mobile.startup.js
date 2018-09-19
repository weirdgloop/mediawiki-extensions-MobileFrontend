var ModuleLoader = require( './modules' ),
	moduleLoader = new ModuleLoader(),
	mfExtend = require( './mfExtend' ),
	context = require( './context' ),
	time = require( './time' ),
	util = require( './util' ),
	View = require( './View' ),
	Browser = require( './Browser' ),
	cache = require( './cache' );

mw.mobileFrontend = moduleLoader;
mw.log.deprecate( moduleLoader, 'on', moduleLoader.on,
	'The global EventEmitter should not be used (T156186).' );

OO.mfExtend = mfExtend;

// I know there is a temptation to use moduleLoader here, but if you do resource-modules will fail
// as webpack might change the variable name. Using mw.mobileFrontend means that the variable
// will not be recast.
mw.mobileFrontend.define( 'mobile.startup/util', util );
mw.mobileFrontend.define( 'mobile.startup/View', View );
mw.mobileFrontend.define( 'mobile.startup/Browser', Browser );
mw.mobileFrontend.define( 'mobile.startup/cache', cache );
mw.mobileFrontend.define( 'mobile.startup/time', time );
mw.mobileFrontend.define( 'mobile.startup/context', context );

// Expose the entry chunk through libraryTarget and library. This allows
// arbitrary file access via ResourceLoader like
// `mfModules['mobile.startup'].moduleLoader.require('mobile.startup/LoadingOverlay')`.
module.exports = {
	moduleLoader: moduleLoader,
	time: time,
	util: util,
	View: View,
	Browser: Browser,
	context: context,
	cache: cache
};
