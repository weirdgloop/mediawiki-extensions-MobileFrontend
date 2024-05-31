var EditorOverlayBase = require( './EditorOverlayBase' ),
	util = require( '../mobile.startup/util' ),
	icons = require( '../mobile.startup/icons' ),
	Section = require( '../mobile.startup/Section' ),
	saveFailureMessage = require( './saveFailureMessage' ),
	EditorGateway = require( './EditorGateway' ),
	fakeToolbar = require( '../mobile.init/fakeToolbar' ),
	MessageBox = require( '../mobile.startup/MessageBox' ),
	mfExtend = require( '../mobile.startup/mfExtend' ),
	setPreferredEditor = require( './setPreferredEditor' ),
	VisualEditorOverlay = require( './VisualEditorOverlay' ),
	currentPage = require( '../mobile.startup/currentPage' );

/**
 * Overlay that shows an editor
 *
 * @class SourceEditorOverlay
 * @uses Section
 * @uses EditorGateway
 * @uses VisualEditorOverlay
 * @extends EditorOverlayBase
 *
 * @param {Object} options Configuration options
 * @param {jQuery.Promise} [dataPromise] Optional promise for loading content
 */
function SourceEditorOverlay( options, dataPromise ) {
	this.isFirefox = /firefox/i.test( window.navigator.userAgent );
	this.gateway = new EditorGateway( {
		api: options.api,
		title: options.title,
		sectionId: options.sectionId,
		oldId: options.oldId,
		fromModified: !!dataPromise,
		preload: options.preload,
		preloadparams: options.preloadparams,
		editintro: options.editintro
	} );
	this.readOnly = !!options.oldId; // If old revision, readOnly mode
	this.dataPromise = dataPromise || this.gateway.getContent();
	this.currentPage = currentPage();
	if ( this.currentPage.isVEVisualAvailable() ) {
		options.editSwitcher = true;
	}
	if ( this.readOnly ) {
		options.readOnly = true;
		options.editingMsg = mw.msg( 'mobile-frontend-editor-viewing-source-page', options.title );
	} else {
		options.editingMsg = mw.msg( 'mobile-frontend-editor-editing-page', options.title );
	}
	options.previewingMsg = mw.msg( 'mobile-frontend-editor-previewing-page', options.title );
	EditorOverlayBase.call(
		this,
		util.extend( true,
			{ events: { 'input .wikitext-editor': 'onInputWikitextEditor' } },
			options
		)
	);
}

mfExtend( SourceEditorOverlay, EditorOverlayBase, {
	/**
	 * @inheritdoc
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	templatePartials: util.extend( {}, EditorOverlayBase.prototype.templatePartials, {
		content: util.template( `
<div lang="{{contentLang}}" dir="{{contentDir}}" class="editor-container content">
	<textarea class="wikitext-editor" id="wikitext-editor" cols="40" rows="10" placeholder="{{placeholder}}"></textarea>
	<div class="preview collapsible-headings-expanded"></div>
</div>
		` )
	} ),
	/**
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	editor: 'wikitext',
	/**
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	sectionLine: '',

	/**
	 * @inheritdoc
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	show: function () {
		EditorOverlayBase.prototype.show.apply( this, arguments );
		// Ensure we do this after showing the overlay, otherwise it doesn't work.
		this._resizeEditor();
	},
	/**
	 * Wikitext Editor input handler
	 *
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	onInputWikitextEditor: function () {
		this.gateway.setContent( this.$el.find( '.wikitext-editor' ).val() );
		this.$el.find( '.continue, .submit' ).prop( 'disabled', false );
	},
	/**
	 * @inheritdoc
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	onClickBack: function () {
		EditorOverlayBase.prototype.onClickBack.apply( this, arguments );
		this._hidePreview();
	},
	/**
	 * @inheritdoc
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	postRender: function () {
		var self = this;

		// log edit attempt
		this.log( { action: 'ready' } );
		this.log( { action: 'loaded' } );

		if ( this.currentPage.isVEVisualAvailable() ) {
			mw.loader.using( 'ext.visualEditor.switching' ).then( function () {
				var switchToolbar,
					toolFactory = new OO.ui.ToolFactory(),
					toolGroupFactory = new OO.ui.ToolGroupFactory();

				toolFactory.register( mw.libs.ve.MWEditModeVisualTool );
				toolFactory.register( mw.libs.ve.MWEditModeSourceTool );
				switchToolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory, {
					classes: [ 'editor-switcher' ]
				} );

				switchToolbar.on( 'switchEditor', function ( mode ) {
					if ( mode === 'visual' ) {
						if ( !self.gateway.hasChanged ) {
							self._switchToVisualEditor();
						} else {
							// Pass wikitext if there are changes.
							self._switchToVisualEditor( self.gateway.content );
						}
					}
				} );

				switchToolbar.setup( [
					{
						name: 'editMode',
						type: 'list',
						icon: 'edit',
						title: mw.msg( 'visualeditor-mweditmode-tooltip' ),
						include: [ 'editModeVisual', 'editModeSource' ]
					}
				] );

				self.$el.find( '.switcher-container' ).html( switchToolbar.$element );
				switchToolbar.emit( 'updateState' );
			} );
		}

		EditorOverlayBase.prototype.postRender.apply( this );

		// This spinner is still used when displaying save/preview panel
		this.$el.find( '.overlay-content' ).append( icons.spinner().$el );
		this.hideSpinner();

		this.$preview = this.$el.find( '.preview' );
		this.$content = this.$el.find( '.wikitext-editor' );
		// The following classes can be used here:
		// * mw-editfont-monospace
		// * mw-editfont-sans-serif
		// * mw-editfont-serif
		this.$content.addClass( 'mw-editfont-' + mw.user.options.get( 'editfont' ) );

		// make license links open in separate tabs
		this.$el.find( '.license a' ).attr( 'target', '_blank' );

		// If in readOnly mode, make textarea readonly
		if ( this.readOnly ) {
			this.$content.prop( 'readonly', true );
		}

		this.$content
			.on( 'input', this._resizeEditor.bind( this ) )
			.one( 'input', function () {
				self.log( { action: 'firstChange' } );
			} );

		if ( this.isFirefox ) {
			this.$content.on( 'mousedown', function () {
				// Support: Firefox Mobile
				// Firefox scrolls back to the top of the page *every time*
				// you tap on the textarea. This makes things slightly
				// more usable by restoring your scroll offset every time
				// the page scrolls for the next 1000ms.
				// The page will still flicker every time the user touches
				// to place the cursor, but this is better than completely
				// losing your scroll offset. (T214880)
				var docEl = document.documentElement,
					scrollTop = docEl.scrollTop;
				function blockScroll() {
					docEl.scrollTop = scrollTop;
				}
				window.addEventListener( 'scroll', blockScroll );
				setTimeout( function () {
					window.removeEventListener( 'scroll', blockScroll );
				}, 1000 );
			} );
		}

		// Render edit summary
		this.summaryTextArea = new OO.ui.MultilineTextInputWidget( {
			placeholder: this.options.summaryMsg,
			classes: [ 'summary' ],
			value: '',
			maxRows: 2
		} );
		this.$el.find( '.summary-input' ).append(
			this.summaryTextArea.$element
		);

		this._loadContent();
	},

	/**
	 * Handles click on "Edit without login" in anonymous editing warning.
	 *
	 * @memberof SourceEditorOverlay
	 * @instance
	 * @private
	 */
	onClickAnonymous: function () {
		this.$anonWarning.hide();
		this.$anonTalkWarning.hide();
		// reenable "Next" button
		this.$anonHiddenButtons.show();
		this.$content.show();
		this._resizeEditor();
	},

	/**
	 * Prepares the preview interface and reveals the save screen of the overlay
	 *
	 * @inheritdoc
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	onStageChanges: function () {
		var self = this,
			params = {
				text: this.getContent()
			};

		this.scrollTop = util.getDocument().find( 'body' ).scrollTop();
		this.$content.hide();
		this.showSpinner();

		if ( mw.config.get( 'wgIsMainPage' ) ) {
			params.mainpage = 1; // Setting it to 0 will have the same effect
		}

		function hideSpinnerAndShowPreview() {
			self.hideSpinner();
			self.$preview.show();
			mw.hook( 'wikipage.content' ).fire( self.$preview );
		}

		this.gateway.getPreview( params ).then( function ( result ) {
			var parsedText = result.text,
				parsedSectionLine = result.line;

			self.sectionId = result.id;
			// On desktop edit summaries strip tags. Mimic this behavior on mobile devices
			self.sectionLine = self.parseHTML( '<div>' ).html( parsedSectionLine ).text();
			new Section( {
				el: self.$preview,
				text: parsedText
			} ).$el.find( 'a' ).on( 'click', false );

			hideSpinnerAndShowPreview();
		}, function () {
			self.$preview.replaceWith(
				new MessageBox( {
					type: 'error',
					msg: mw.msg( 'mobile-frontend-editor-error-preview' )
				} ).$el
			);
			hideSpinnerAndShowPreview();
		} );

		EditorOverlayBase.prototype.onStageChanges.apply( this, arguments );
	},

	/**
	 * Hides the preview and reverts back to initial screen.
	 *
	 * @memberof SourceEditorOverlay
	 * @instance
	 * @private
	 */
	_hidePreview: function () {
		this.gateway.abortPreview();
		this.hideSpinner();
		// FIXME: Don't rely on internals - we re-render template instead.
		this.$preview.removeClass(
			'cdx-message--error'
		).hide();
		this.$content.show();
		window.scrollTo( 0, this.scrollTop );
		this.showHidden( '.initial-header' );
	},

	/**
	 * Resize the editor textarea, maintaining scroll position in iOS
	 *
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	_resizeEditor: function () {
		var scrollTop, container, $scrollContainer;

		if ( !this.$scrollContainer ) {
			container = OO.ui.Element.static
				.getClosestScrollableContainer( this.$content[ 0 ] );
			// The scroll container will be either within the view
			// or the document element itself.
			$scrollContainer = this.$el.find( container ).length ?
				this.$el.find( container ) : util.getDocument();
			this.$scrollContainer = $scrollContainer;
			this.$content.css( 'padding-bottom', this.$scrollContainer.height() * 0.6 );
		} else {
			$scrollContainer = this.$scrollContainer;
		}

		// Only do this if scroll container exists
		if ( this.$content.prop( 'scrollHeight' ) && $scrollContainer.length ) {
			scrollTop = $scrollContainer.scrollTop();
			this.$content
				.css( 'height', 'auto' )
				// can't reuse prop( 'scrollHeight' ) because we need the current value
				.css( 'height', ( this.$content.prop( 'scrollHeight' ) + 2 ) + 'px' );
			$scrollContainer.scrollTop( scrollTop );
		}
	},

	/**
	 * Set content to the user input field.
	 *
	 * @memberof SourceEditorOverlay
	 * @instance
	 * @param {string} content The content to set.
	 */
	setContent: function ( content ) {
		this.$content
			.show()
			.val( content );
		this._resizeEditor();
	},

	/**
	 * Returns the content of the user input field.
	 *
	 * @memberof SourceEditorOverlay
	 * @instance
	 * @return {string}
	 */
	getContent: function () {
		return this.$content.val();
	},

	/**
	 * Requests content from the API and reveals it in UI.
	 *
	 * @memberof SourceEditorOverlay
	 * @instance
	 * @private
	 */
	_loadContent: function () {
		var self = this;

		this.$content.hide();

		this.getLoadingPromise()
			.then( function ( result ) {
				var content = result.text;

				self.setContent( content );

				// If the loaded content is not the default content, enable the save button
				if ( self.hasChanged() ) {
					self.$el.find( '.continue, .submit' ).prop( 'disabled', false );
				}

				var options = self.options;
				var showAnonWarning = options.isAnon && !options.switched;

				if ( showAnonWarning ) {
					self.$anonWarning = self.createAnonWarning( options );
					self.$anonTalkWarning = self.createAnonTalkWarning();
					self.$el.find( '.editor-container' ).append( [ self.$anonTalkWarning, self.$anonWarning ] );
					self.$content.hide();
					// the user has to click login, signup or edit without login,
					// disable "Next" button on top right
					self.$anonHiddenButtons = self.$el.find( '.overlay-header .continue' ).hide();
				}

				if ( self.gateway.fromModified ) {
					// Trigger intial EditorGateway#setContent and update save button
					self.onInputWikitextEditor();
				}

				self.showEditNotices();
			} );
	},

	/**
	 * Loads a {VisualEditorOverlay} and replaces the existing SourceEditorOverlay with it
	 * based on the current option values.
	 *
	 * @memberof SourceEditorOverlay
	 * @instance
	 * @private
	 * @param {string} [wikitext] Wikitext to pass to VE
	 */
	_switchToVisualEditor: function ( wikitext ) {
		var self = this;
		this.log( {
			action: 'abort',
			type: 'switchnochange',
			mechanism: 'navigate'
		} );
		this.logFeatureUse( {
			feature: 'editor-switch',
			action: 'visual-mobile'
		} );

		// Save a user setting indicating that this user prefers using the VisualEditor
		setPreferredEditor( 'VisualEditor' );

		this.$el.addClass( 'switching' );
		this.$el.find( '.overlay-header-container' ).hide();
		this.$el.append( fakeToolbar() );
		this.$content.prop( 'readonly', true );

		mw.loader.using( 'ext.visualEditor.targetLoader' ).then( function () {
			mw.libs.ve.targetLoader.addPlugin( 'ext.visualEditor.mobileArticleTarget' );
			return mw.libs.ve.targetLoader.loadModules( 'visual' );
		} ).then(
			function () {
				var newOverlay, options = self.getOptionsForSwitch();
				options.SourceEditorOverlay = SourceEditorOverlay;
				if ( wikitext ) {
					options.dataPromise = mw.libs.ve.targetLoader.requestPageData( 'visual', mw.config.get( 'wgRelevantPageName' ), {
						section: options.sectionId,
						oldId: options.oldId || mw.config.get( 'wgRevisionId' ),
						targetName: 'mobile',
						modified: true,
						wikitext: wikitext
					} );
				} else {
					delete options.dataPromise;
				}
				newOverlay = new VisualEditorOverlay( options );
				newOverlay.getLoadingPromise().then( function () {
					self.switching = true;
					self.overlayManager.replaceCurrent( newOverlay );
					self.switching = false;
				} );
			},
			function () {
				self.$el.removeClass( 'switching' );
				self.$el.find( '.overlay-header-container' ).show();
				self.$el.find( '.ve-mobile-fakeToolbar-container' ).remove();
				self.$content.prop( 'readonly', false );
				// FIXME: We should show an error notification, but right now toast
				// notifications are not dismissible when shown within the editor.
			}
		);
	},

	/**
	 * Get the current edit summary.
	 *
	 * @return {string}
	 */
	getEditSummary: function () {
		return this.summaryTextArea.getValue();
	},

	/**
	 * Executed when the editor clicks the save/publish button. Handles logging and submitting
	 * the save action to the editor API.
	 *
	 * @inheritdoc
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	onSaveBegin: function () {
		var self = this,
			options = {
				summary: this.getEditSummary()
			};

		if ( self.sectionLine !== '' ) {
			options.summary = '/* ' + self.sectionLine + ' */' + options.summary;
		}
		EditorOverlayBase.prototype.onSaveBegin.apply( this, arguments );
		if ( this.confirmAborted ) {
			return;
		}
		if ( this.captchaId ) {
			options.captchaId = this.captchaId;
			options.captchaWord = this.$el.find( '.captcha-word' ).val();
		}

		this.showHidden( '.saving-header' );

		this.gateway.save( options )
			.then( function ( newRevId, redirectUrl, tempUserCreated ) {
				var title = self.options.title;
				// Special case behaviour of main page
				if ( mw.config.get( 'wgIsMainPage' ) && !redirectUrl ) {
					// FIXME: Blocked on T189173
					// eslint-disable-next-line no-restricted-properties
					window.location = mw.util.getUrl( title );
					return;
				}

				self.onSaveComplete( newRevId, redirectUrl, tempUserCreated );
			}, function ( data ) {
				self.onSaveFailure( data );
			} );
	},

	/**
	 * @inheritdoc
	 * @memberof SourceEditorOverlay
	 * @instance
	 * @param {number|null} newRevId ID of the newly created revision, or null if it was a
	 * null edit.
	 * @param {string} [redirectUrl] URL to redirect to, if different than the current URL.
	 * @param {boolean} [tempUserCreated] Whether a temporary user was created
	 */
	onSaveComplete: function ( newRevId, redirectUrl ) {
		EditorOverlayBase.prototype.onSaveComplete.apply( this, arguments );

		// The parent class changes the location hash in a setTimeout, so wait
		// for that to happen before reloading.
		setTimeout( function () {
			if ( redirectUrl ) {
				// eslint-disable-next-line no-restricted-properties
				window.location.href = redirectUrl;
			} else if ( newRevId ) {
				// Set a notify parameter similar to venotify in VisualEditor.
				var url = new URL( location.href );
				url.searchParams.set( 'mfnotify', this.isNewPage ? 'created' : 'saved' );
				// eslint-disable-next-line no-restricted-properties
				window.location.search = url.search;
			} else {
				// Null edit; do not add notify parameter.
				// Note the "#" may be in the URL.
				// If so, using window.location alone will not reload the page
				// we need to forcefully refresh
				// eslint-disable-next-line no-restricted-properties
				window.location.reload();
			}
		} );
	},

	/**
	 * @inheritdoc
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	showSaveCompleteMsg: function ( action, tempUserCreated ) {
		__non_webpack_require__( 'mediawiki.action.view.postEdit' ).fireHookOnPageReload( action, tempUserCreated );
	},

	/**
	 * Executed when page save fails. Handles error display and bookkeeping,
	 * passes logging duties to the parent.
	 *
	 * @inheritdoc
	 * @memberof SourceEditorOverlay
	 * @instance
	 */
	onSaveFailure: function ( data ) {
		var msg, noRetry;

		if ( data.edit && data.edit.captcha ) {
			this.captchaId = data.edit.captcha.id;
			this.handleCaptcha( data.edit.captcha );
		} else {
			msg = saveFailureMessage( data );
			this.reportError( msg );
			this.showHidden( '.save-header, .save-panel' );

			// Some errors may be temporary, but for others we know for sure that the save will
			// never succeed, so don't confuse the user by giving them the option to retry.
			noRetry = data.errors && data.errors.some( function ( error ) {
				return error.code === 'abusefilter-disallowed';
			} );

			if ( noRetry ) {
				// disable continue and save buttons, reenabled when user changes content
				this.$el.find( '.continue, .submit' ).prop( 'disabled', true );
			}
		}

		EditorOverlayBase.prototype.onSaveFailure.apply( this, arguments );
	},

	/**
	 * Checks whether the existing content has changed.
	 *
	 * @memberof SourceEditorOverlay
	 * @instance
	 * @return {boolean}
	 */
	hasChanged: function () {
		return this.gateway.hasChanged;
	}
} );

module.exports = SourceEditorOverlay;
