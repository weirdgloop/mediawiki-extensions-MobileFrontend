<?php

use HtmlFormatter\HtmlFormatter;
use MediaWiki\Title\Title;
use MobileFrontend\Transforms\IMobileTransform;
use Wikimedia\Parsoid\Utils\DOMCompat;

/**
 * Converts HTML into a mobile-friendly version
 */
class MobileFormatter extends HtmlFormatter {
	/**
	 * Class name for collapsible section wrappers
	 */
	public const STYLE_COLLAPSIBLE_SECTION_CLASS = 'collapsible-block';

	/**
	 * @var Title
	 */
	protected $title;

	/**
	 * @var Config
	 */
	private $config;

	/**
	 * @var MobileContext
	 */
	private $context;

	/**
	 * @param string $html Text to process
	 * @param Title $title Title to which $html belongs
	 * @param Config $config
	 * @param MobileContext $context
	 */
	public function __construct(
		$html, Title $title, Config $config, MobileContext $context
	) {
		parent::__construct( $html );

		$this->title = $title;
		$this->context = $context;
		$this->config = $config;
	}

	/**
	 * Performs various transformations to the content to make it appropriate for mobile devices.
	 * @param array<IMobileTransform> $transforms lit of transforms to be sequentually applied
	 *   to html DOM
	 */
	public function applyTransforms( array $transforms ) {
		// Apply all removals before continuing with transforms (see T185040 for example)
		$this->filterContent();

		$doc = $this->getDoc();
		$body = DOMCompat::querySelector( $doc, 'body' );

		foreach ( $transforms as $transform ) {
			$transform->apply( $body );
		}
	}

	/**
	 * @inheritDoc
	 */
	protected function parseItemsToRemove(): array {
		$removals = parent::parseItemsToRemove();

		// Remove specified content in content namespaces
		if ( in_array( $this->title->getNamespace(), $this->config->get( 'ContentNamespaces' ), true ) ) {
			$mfRemovableClasses = $this->config->get( 'MFRemovableClasses' );
			$removableClasses = $mfRemovableClasses['base'];
			if ( $this->context->isBetaGroupMember() ) {
				$removableClasses = array_merge( $removableClasses, $mfRemovableClasses['beta'] );
			}

			foreach ( $removableClasses as $itemToRemove ) {
				$type = '';
				$rawName = '';
				if ( $this->parseSelector( $itemToRemove, $type, $rawName ) ) {
					$removals[$type][] = $rawName;
				}
			}
		}

		return $removals;
	}
}
