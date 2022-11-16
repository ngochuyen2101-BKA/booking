<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'bamboo' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'V{4Hw^Hs ^N;6{Y>lhOFG)+zlq0Yeh<gganjKIX6+jB*g(==7=NR_otfzP_2].RG' );
define( 'SECURE_AUTH_KEY',  'h31xz(?y6%&/p<XjfEa-~ k]/OhkSkUAQ9!PdyVr5%&^!V^LUi<TRbbr4hVeO7q>' );
define( 'LOGGED_IN_KEY',    'xZgGjh?Gm~IN9v^eYhrggP$CaT(y0Ju8uRW!Q9rj,z%hUo>r`PuV>J-Ag<:y18H!' );
define( 'NONCE_KEY',        'yS2C-P)o$re<#Rym8p?n$H;N~e ]!k<}re#;?O^:nfb#UY?B< w/+Ip_8jY1eRB[' );
define( 'AUTH_SALT',        'EK?+{Hs8-{*sm`V=</:}i|:.&Wq$4pm>_L>AVC OtabtGr_6;:}l:U{Z`5~RWI5g' );
define( 'SECURE_AUTH_SALT', '`JQ~[)!)co^=q }-gw.b*?mb2N^yEzA9JD{8JY;Y.%*?x-TZw0rsiht.t*a*%G_i' );
define( 'LOGGED_IN_SALT',   ']3fJsg&FS+![nws?S0]CQLnIZn2{#3+u/+e:7.})+P~eZ~;8 rA<o&<-_Qbwa%/5' );
define( 'NONCE_SALT',       'hI,|-b-mae;F2*|3nE^zV(KXYrQBkokA;4Vx`G*K|[rN#G=Xj-,~}8|O*x,f<Ip5' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'diwe_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

define( 'SMTP_USER',   'dia.brightsoft@gmail.com' );    
define( 'SMTP_PASS',   'xyorklawcyirrrud' );      
define( 'SMTP_HOST',   'smtp.gmail.com' );    
define( 'SMTP_FROM',   'dia.brightsoft@gmail.com' ); 
define( 'SMTP_NAME',   'Test' );    
define( 'SMTP_PORT',   '587' );                  
define( 'SMTP_SECURE', 'TLS' );                 
define( 'SMTP_AUTH',    true );                 
define( 'SMTP_DEBUG',   0 );  