<?php
/**
 * Plugin Name: Nifty Coming Soon & Maintenance Page
 * Plugin URI: https://wpconcern.com/plugins/nifty-coming-soon-and-under-construction-page/
 * Description: Easy to set up Coming Soon, Maintenance and Under Construction page. It features Responsive design, Countdown timer, Animations, Live Preview, Background Slider, Subscription form and more.
 * Version: 3.0.2
 * Author: WP Concern
 * Author URI: https://wpconcern.com/
 * Text Domain: nifty-coming-soon-and-under-construction-page
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package NCSUCP
 */

defined( 'ABSPATH' ) || exit;

define( 'NCSUCP_VERSION', '3.0.2' );
define( 'NCSUCP_SLUG', 'nifty-coming-soon-and-under-construction-page' );
define( 'NCSUCP_BASE_NAME', basename( dirname( __FILE__ ) ) );
define( 'NCSUCP_BASE_FILEPATH', __FILE__ );
define( 'NCSUCP_BASE_FILENAME', plugin_basename( __FILE__ ) );
define( 'NCSUCP_DIR', rtrim( plugin_dir_path( __FILE__ ), '/' ) );
define( 'NCSUCP_URL', rtrim( plugin_dir_url( __FILE__ ), '/' ) );
define( 'NCSUCP_UPGRADE_URL', 'https://checkout.freemius.com/mode/dialog/plugin/10939/plan/18571/' );

if ( ! defined( 'WP_WELCOME_DIR' ) ) {
	define( 'WP_WELCOME_DIR', NCSUCP_DIR . '/vendor/ernilambar/wp-welcome' );
}

if ( ! defined( 'WP_WELCOME_URL' ) ) {
	define( 'WP_WELCOME_URL', NCSUCP_URL . '/vendor/ernilambar/wp-welcome' );
}

// Init autoload.
if ( file_exists( NCSUCP_DIR . '/vendor/autoload.php' ) ) {
	require_once NCSUCP_DIR . '/vendor/autoload.php';
	require_once NCSUCP_DIR . '/vendor/wptt/webfont-loader/wptt-webfont-loader.php';
	require_once NCSUCP_DIR . '/vendor/ernilambar/ns-customizer-utilities/init.php';
	require_once NCSUCP_DIR . '/vendor/ernilambar/wp-welcome/init.php';
}

// Init plugin.
require_once NCSUCP_DIR . '/inc/init.php';
