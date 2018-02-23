( function ( M, $ ) {
	var Icon = M.require( 'mobile.startup/Icon' ),
		endpoint = mw.config.get( 'wgMFNearbyEndpoint' ),
		router = require( 'mediawiki.router' ),
		Nearby = M.require( 'mobile.nearby/Nearby' ),
		util = M.require( 'mobile.startup/util' );

	$( function () {
		var
			nearby,
			options = {
				el: $( '#mw-mf-nearby' ),
				funnel: 'nearby',
				onItemClick: function ( ev ) {
					// Do not react to 'open in new tab' clicks as changing the hash
					// re-renders the view. todo: remove deprecated event.which usage
					// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which.
					if ( util.isModifiedEvent( ev ) || ev.which === 2 ) {
						return;
					}
					// if not on Special:Nearby/#page/page_title or Special:Nearby/#coord/
					// then set hash to clicked element
					if ( !window.location.hash.match( /^(#\/page|#\/coord)/i ) ) {
						window.location.hash = $( this ).attr( 'id' );
					}
				}
			},
			$btn = $( '#secondary-button' ).parent(),
			icon,
			$iconContainer,
			$icon;

		// Remove user button
		if ( $btn.length ) {
			$btn.remove();
		}

		// Create refresh button on the header
		icon = new Icon( {
			name: 'refresh',
			id: 'secondary-button',
			additionalClassNames: 'main-header-button',
			// refresh button doesn't perform any action related
			// to the form when button attribute is used
			el: $( '<button>' ).attr( 'type', 'button' ),
			title: mw.msg( 'mobile-frontend-nearby-refresh' ),
			label: mw.msg( 'mobile-frontend-nearby-refresh' )
		} );
		$iconContainer = $( '<div>' );

		$icon = icon.$el.on( 'click', refreshCurrentLocation )
			.appendTo( $iconContainer );

		$iconContainer.appendTo( '.header' );

		/**
		 * Initialize or instantiate Nearby with options
		 * @method
		 * @ignore
		 * @param {Object} opt
		 */
		function refresh( opt ) {
			// check, if the api object (options.api) is already created and set
			if ( options.api === undefined ) {
				// decide, what api module to use to retrieve the pages
				if ( endpoint ) {
					mw.loader.using( 'mobile.foreignApi' ).done( function () {
						var JSONPForeignApi = M.require( 'mobile.foreignApi/JSONPForeignApi' );
						options.api = new JSONPForeignApi( endpoint );
					} );
				} else {
					options.api = new mw.Api();
				}
			}
			// make sure, that the api object (if created above) is added to the options object used
			// in the Nearby module
			opt = $.extend( {}, opt, options );

			// if Nearby is already created, use the existing one
			if ( nearby ) {
				nearby.refresh( opt );
			} else {
				nearby = new Nearby( opt );
			}
		}

		// Routing on the nearby view

		/*
		 * #/coords/lat,long
		 */
		router.route( /^\/coord\/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/, function ( lat, lon ) {
			$icon.hide();
			// Search with coordinates
			refresh( $.extend( {}, options, {
				latitude: lat,
				longitude: lon
			} ) );
		} );

		/*
		 * #/page/PageTitle
		 */
		router.route( /^\/page\/(.+)$/, function ( pageTitle ) {
			$icon.hide();
			refresh( $.extend( {}, options, {
				pageTitle: mw.Uri.decode( pageTitle )
			} ) );
		} );

		/**
		 * Refresh the current view using browser geolocation api
		 * @ignore
		 */
		function refreshCurrentLocation() {
			$icon.show();
			refresh( $.extend( {}, options, {
				useCurrentLocation: true
			} ) );
		}

		/*
		 * Anything else search with current location
		 * FIXME: The regex has to negate the rest of the routes because every time we
		 * define a route with router.route that route gets matched against the
		 * current hash.
		 */
		router.route( /^(?!.coord|.page).*$/, refreshCurrentLocation );
		router.checkRoute();

	} );

}( mw.mobileFrontend, jQuery ) );
