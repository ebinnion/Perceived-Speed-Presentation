<?php

add_action( 'wp_enqueue_scripts', 'enqueue_app_child', 100 );
function enqueue_app_child() {
	wp_enqueue_script( 'javascript', plugins_url( 'app_subscribe.js', __FILE__ ), array('jquery'), '13', true );
}

add_action( 'wp_ajax_nopriv_register_device', 'register_device' );
add_action( 'wp_ajax_register_device', 'register_device' );
function register_device() {
	$blog_id = $_POST['blog_id'];
	$device  = $_POST['uuid'];

	$sport_devices = get_blog_option( $blog_id, 'registered_devices' );

	if ( is_array( $sport_devices ) ) {
		if ( ! in_array( $device, $sport_devices ) ) {
			$sport_devices[] = $device;
		}
	} else {
		$sport_devices = array( $device );
	}

	$udpated = update_blog_option( $blog_id, 'registered_devices', $sport_devices );

	exit;
}

add_action( 'wp_ajax_nopriv_deregister_device', 'deregister_device' );
add_action( 'wp_ajax_deregister_device', 'deregister_device' );
function deregister_device() {
	$blog_id = $_POST['blog_id'];
	$device  = $_POST['uuid'];

	$sport_devices = get_blog_option( $blog_id, 'registered_devices' );

	if ( is_array( $sport_devices ) ) {
		$found_keys = array();

		foreach ( $sport_devices as $key => $registered_device ) {
			if ( $device == $registered_device ) {
				$found_keys[] = $key;
			}
		}

		foreach ($found_keys as $key) {
			unset( $sport_devices[ $key ] );
		}
	}

	$udpated = update_blog_option( $blog_id, 'registered_devices', $sport_devices );

	exit;
}