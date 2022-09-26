<?php

use HtmlFormatter\HtmlFormatter;
use MobileFrontend\Transforms\IMobileTransform;
use Wikimedia\Parsoid\Utils\DOMCompat;

/**
 * Converts HTML into a mobile-friendly version
 */
class MobileFormatter extends HtmlFormatter {

	/**
	 * @inheritDoc
	 */
	public function __construct( $html ) {
		// This is specific to HtmlFormatter, decouple it from callers.
		parent::__construct( self::wrapHTML( $html ) );
	}

	/**
	 * Performs various transformations to the content to make it appropriate for mobile devices.
	 * @param array<IMobileTransform> $transforms lit of transforms to be sequentually applied
	 *   to html DOM
	 */
	public function applyTransforms( array $transforms ) {
		$doc = $this->getDoc();
		$body = DOMCompat::querySelector( $doc, 'body' );

		foreach ( $transforms as $transform ) {
			$transform->apply( $body );
		}
	}
}
