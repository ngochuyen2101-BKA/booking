<?php
/**
 * Themes
 *
 * @package NCSUCP
 */

/**
 * Return all themes.
 *
 * @since 1.0.0
 *
 * @return array Themes array.
 */
function nifty_cs_get_themes() {
	return array(
		'charity'        => array(
			'label'       => esc_html__( 'Charity', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/charity/',
			'new'         => true,
		),
		'furniture'      => array(
			'label'       => esc_html__( 'Furniture', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/furniture/',
			'new'         => true,
		),
		'skin-care'      => array(
			'label'       => esc_html__( 'Skin Care', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/skin-care/',
			'new'         => true,
		),
		'minimal'        => array(
			'label'       => esc_html__( 'Minimal', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/minimal/',
		),
		'digital-agency' => array(
			'label'       => esc_html__( 'Digital Agency', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/digital-agency/',
		),
		'app'            => array(
			'label'       => esc_html__( 'App', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/app/',
		),
		'cake-shop'      => array(
			'label'       => esc_html__( 'Cake Shop', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/cake-shop/',
		),
		'coffee-shop'    => array(
			'label'       => esc_html__( 'Coffee Shop', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/coffee-shop/',
		),
		'construction'   => array(
			'label'       => esc_html__( 'Construction', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/construction/',
		),
		'dental'         => array(
			'label'       => esc_html__( 'Dental', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/dental/',
		),
		'fitness'        => array(
			'label'       => esc_html__( 'Fitness', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/fitness/',
		),
		'fruits'         => array(
			'label'       => esc_html__( 'Fruits', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/fruits/',
		),
		'kennel-club'    => array(
			'label'       => esc_html__( 'Kennel Club', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/kennel-club/',
		),
		'yoga'           => array(
			'label'       => esc_html__( 'Yoga', 'nifty-coming-soon-and-under-construction-page' ),
			'preview_url' => 'https://ncsucp.wpconcern.net/yoga/',
		),
	);
}
