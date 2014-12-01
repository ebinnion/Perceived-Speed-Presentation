function register_device_all_blogs() {
	console.log( "register_device_all_blogs: " + device.uuid);
	jQuery.post(
		apppCore.ajaxurl,
		{
			'action': 'register_device_all_blogs',
			'uuid':   device.uuid
		},
		function(response){
		//	alert('The server responded: ' + response);
		}
	).always(function() {
	//	alert( 'ajax finished' );
	});
}

// This function will fire after Phonegap has loaded.
function onDeviceReady() {

	jQuery( document ).ready( function( $ ){
		if( typeof( device ) != 'undefined' ) {

			// Get and set subscriptions when device is ready
			jQuery.post(
				apppCore.ajaxurl,
				{
					'action': 'get_subscriptions',
					'uuid':   device.uuid,
				},
				function( response ){

					// If there are subscriptions, set these on the front end
					if ( response ) {
						for ( var i in response ) {
							$( '#subscribes #' + response[ i ] ).prop( 'checked', true );
						}
					}

					// Set the event handler for de/registering
					$( '.cw-register-push' ).change(
						function( e ) {
							state = $( this ).is( ':checked' );
							target = $( this ).attr( 'data-site' );
							if ( 'undefined' !== typeof device && null !== device.uuid ) {
								var action = ( false == state ) ? 'deregister_device' : 'register_device';

								jQuery.post(
									apppCore.ajaxurl,
									{
										'action':  action,
										'uuid':    device.uuid,
										'blog_id': target
									},
									function( response ){
										console.log( response );
									}
								);
							}
						}
					);
				}, 'json'
			).always( function() {
				// alert( 'ajax finished' );
			}).fail( function( xhr, textStatus, errorThrown ){
				// alert(textStatus + ' : ' + errorThrown);
			});
		} else {
			console.log( 'no DEVICE object found' );
		}
	});
}

window.addEventListener( 'load', onDeviceReady, false );