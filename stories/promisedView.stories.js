import promisedView from '../src/mobile.startup/promisedView';
import View from '../src/mobile.startup/View';

export default {
	title: 'promisedView'
};

export const Normal = () => {
	const element = document.createElement( 'div' ),
		msg = document.createElement( 'div' ),
		promise = new Promise( function ( resolve ) {
			window.setTimeout( function () {
				msg.parentNode.removeChild( msg );
				resolve(
					new View( {
						el: $( '<div>' ).text( '🍌' ).css( {
							fontSize: '100px'
						} )
					} )
				);
			}, 5000 );
		} ),
		view = promisedView( promise );

	msg.textContent = 'promisedView will load in 5 seconds...';
	element.appendChild( msg );
	element.appendChild( view.$el[0] );
	return element;
};

Normal.story = {
	name: 'normal'
};
