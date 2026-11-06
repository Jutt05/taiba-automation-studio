<?php
/**
 * Plugin Name: TAIBA AI Automation Page
 * Description: Shows the TAIBA Creations AI Automation page (original React design and animations) with the shortcode [taiba_ai_automation]. Text, links and images are editable from the dashboard.
 * Version:     1.0.0
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * Author:      TAIBA Creations
 * Text Domain: taiba-ai
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TAIBA_AI_VERSION', '1.0.0' );
define( 'TAIBA_AI_DIR', plugin_dir_path( __FILE__ ) );
define( 'TAIBA_AI_URL', plugin_dir_url( __FILE__ ) );
define( 'TAIBA_AI_OPTION', 'taiba_ai_overrides' );

require_once TAIBA_AI_DIR . 'includes/helpers.php';
require_once TAIBA_AI_DIR . 'includes/frontend.php';

if ( is_admin() ) {
	require_once TAIBA_AI_DIR . 'includes/admin.php';
}
