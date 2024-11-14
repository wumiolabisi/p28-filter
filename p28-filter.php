<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://example.com
 * @since             1.0.0
 * @package           P28_Filter
 *
 * @wordpress-plugin
 * Plugin Name:       P28 Filter
 * Description:       Un plugin WordPress permettant de filtrer le contenu d'une archive selon ses taxonomies et/ou champs personnalisés.
 * Version:           1.0.0
 * Author:            Omowumi OLABISI
 * Author URI:        http://example.com/
 * License:           License MIT
 * Text Domain:       p28-filter
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (! defined('WPINC')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('P28_FILTER_VERSION', '1.0.0');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-p28-filter-activator.php
 */
function enqueue_p28_filter_assets()
{
	wp_enqueue_script(
		'p28-filter-script',
		plugin_dir_url(__FILE__) . 'build/js/main.min.js',
		[],
		'1.0.0',
		true
	);
	wp_enqueue_style(
		'p28-filter-style',
		plugin_dir_url(__FILE__) . 'build/css/main.min.css',
		[],
		'1.0.0'
	);
}
add_action('wp_enqueue_scripts', 'enqueue_p28_filter_assets');

function activate_p28_filter()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-p28-filter-activator.php';
	P28_Filter_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-p28-filter-deactivator.php
 */
function deactivate_p28_filter()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-p28-filter-deactivator.php';
	P28_Filter_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_p28_filter');
register_deactivation_hook(__FILE__, 'deactivate_p28_filter');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-p28-filter.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_p28_filter()
{

	$plugin = new P28_Filter();
	$plugin->run();
}
run_p28_filter();
