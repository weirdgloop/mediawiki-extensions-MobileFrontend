<?php

/**
 * Helper methods for generating parts of the UI.
 *
 * @internal not for use outside MobileFrontend.
 */
class MobileUI {
	/**
	 * Renders a icon using Codex markup styled with Codex mixins
	 *
	 * @param string $iconName
	 * @param string $className
	 * @return string
	 */
	public static function icon( $iconName, $className = '' ) {
		return Html::element( 'span', [
			'class' => trim( 'mw-mf-icon mw-mf-icon-' . $iconName . ' ' . $className ),
		] );
	}

	/**
	 * Mark some html as being content
	 * @param string $html HTML content
	 * @param string $className additional class names
	 * @return string of html
	 */
	public static function contentElement( $html, $className = '' ) {
		$templateParser = new TemplateParser( __DIR__ . '/templates' );
		return $templateParser->processTemplate( 'ContentBox', [
			'className' => $className,
			'html' => $html,
		] );
	}
}
