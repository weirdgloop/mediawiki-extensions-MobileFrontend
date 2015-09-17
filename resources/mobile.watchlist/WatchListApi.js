/**
 * API for WatchList
 * @extends Api
 * @class WatchListApi
 */
( function ( M, $ ) {

	var WatchListApi,
		time = M.require( 'mobile.modifiedBar/time' ),
		Api = M.require( 'mobile.startup/api' ).Api;

	/**
	 * @class WatchListApi
	 * @extends Api
	 */
	WatchListApi = Api.extend( {
		/** @inheritdoc */
		initialize: function ( lastTitle ) {
			Api.prototype.initialize.apply( this, arguments );
			// Try to keep it in sync with SpecialMobileWatchlist::LIMIT (php)
			this.limit = 50;

			if ( lastTitle ) {
				this.continueParams = {
					continue: 'gwrcontinue||',
					gwrcontinue: '0|' + lastTitle.replace( / /g, '_' )
				};
				this.shouldSkipFirstTitle = true;
			} else {
				this.continueParams = {
					continue: ''
				};
				this.shouldSkipFirstTitle = false;
			}

			this.canContinue = true;
		},
		/**
		 * Load the list of items on the watchlist
		 * @returns {jQuery.Deferred}
		 */
		load: function () {
			var self = this,
				params = $.extend( {
					action: 'query',
					prop: 'pageimages|info|revisions',
					piprop: 'thumbnail',
					pithumbsize: mw.config.get( 'wgMFThumbnailSizes' ).tiny,
					pilimit: this.limit,
					format: 'json',
					formatversion: 2,
					rvprop: 'timestamp|user',
					generator: 'watchlistraw',
					gwrnamespace: '0',
					gwrlimit: this.limit
				}, this.continueParams );

			if ( this.canContinue === false ) {
				return $.Deferred();
			}
			if ( this.shouldSkipFirstTitle ) {
				// If we are calling the api from the last item of the previous page
				// (like the first time when grabbing the last title from the HTML),
				// then request one extra element (make room for that last title) which
				// will be removed later when parsing data.
				params.gwrlimit += 1;
				params.pilimit += 1;
			}
			return this.get( params, {
				url: this.apiUrl
			} ).then( function ( data ) {
				if ( data.hasOwnProperty( 'continue' ) ) {
					self.continueParams = data.continue;
				} else {
					self.canContinue = false;
				}

				return self.parseData( data );
			} );
		},

		/**
		 * Parse api response data into pagelist item format
		 * @param {Object[]} data
		 */
		parseData: function ( data ) {
			var pages;

			if ( !data.hasOwnProperty( 'query' ) || !data.query.hasOwnProperty( 'pages' ) ) {
				return [];
			}

			// Convert the map to an Array.
			pages = $.map( data.query.pages, function ( page ) {
				return page;
			} );

			// Sort results alphabetically (the api map doesn't have any order). The
			// watchlist is ordered alphabetically right now.
			pages.sort( function ( p1, p2 ) {
				return p1.title === p2.title ? 0 : ( p1.title < p2.title ? -1 : 1 );
			} );

			// If we requested from the last item of the previous page, we shall
			// remove the first result (to avoid it being repeated)
			if ( this.shouldSkipFirstTitle ) {
				pages = pages.slice( 1 );
				this.shouldSkipFirstTitle = false;
			}

			// Transform the items to a sensible format
			return $.map( pages, function ( item ) {
				var revision, thumb, data;

				thumb = item.thumbnail;

				if ( thumb ) {
					thumb.isLandscape = thumb.width > thumb.height;
				}

				data = {
					isMissing: item.missing ? true : false,
					displayTitle: item.title,
					id: item.pageid,
					url: mw.util.getUrl( item.title ),
					thumbnail: thumb
				};

				// page may or may not exist.
				if ( item.revisions && item.revisions[0] ) {
					revision = item.revisions[0];
					data.lastModified = time.getLastModifiedMessage( new Date( revision.timestamp ).getTime() / 1000,
						revision.user );
				}

				return data;
			} );
		}

	} );

	M.define( 'mobile.watchlist/WatchListApi', WatchListApi )
		.deprecate( 'modules/watchlist/WatchListApi' );

}( mw.mobileFrontend, jQuery ) );
