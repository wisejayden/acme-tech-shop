(function() {

		var container = document.getElementById( 'container' ),
			trigger = container.querySelector( 'button.catalog' );


		function toggleContent() {
			if( classie.has( container, 'container--open' ) ) {
				classie.remove( container, 'container--open' );
				classie.remove( trigger, 'trigger--active' );
				window.addEventListener( 'scroll', noscroll );
			}
			else {
				classie.add( container, 'container--open' );
				classie.add( trigger, 'trigger--active' );
				window.removeEventListener( 'scroll', noscroll );
			}
		}

		function noscroll() {
			window.scrollTo( 0, 0 );
		}

		// reset scrolling position
		document.body.scrollTop = document.documentElement.scrollTop = 0;

		// disable scrolling
		window.addEventListener( 'scroll', noscroll );

		trigger.addEventListener( 'click', toggleContent {
			console.log("HELLo")
		} );

	})();
