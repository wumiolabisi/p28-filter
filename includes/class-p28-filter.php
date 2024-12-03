<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    P28_Filter
 * @subpackage P28_Filter/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    P28_Filter
 * @subpackage P28_Filter/includes
 * @author     Omowumi OLABISI <wumi.olabisi@gmail.com>
 */
class P28_Filter
{
	// Instance statique
	private static $instance = null;

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      P28_Filter_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $p28_filter    The string used to uniquely identify this plugin.
	 */
	protected $p28_filter;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct()
	{
		if (defined('P28_FILTER_VERSION')) {
			$this->version = P28_FILTER_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->p28_filter = 'p28-filter';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_shortcodes();
		$this->register_rest_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - P28_Filter_Loader. Orchestrates the hooks of the plugin.
	 * - P28_Filter_i18n. Defines internationalization functionality.
	 * - P28_Filter_Admin. Defines all hooks for the admin area.
	 * - P28_Filter_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies()
	{

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-p28-filter-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-p28-filter-i18n.php';


		$this->loader = new P28_Filter_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the P28_Filter_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale()
	{

		$plugin_i18n = new P28_Filter_i18n();

		$this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
	}

	private function define_shortcodes()
	{
		$this->loader->add_action('init', $this, 'register_shortcodes');
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run()
	{
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_p28_filter()
	{
		return $this->p28_filter;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    P28_Filter_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader()
	{
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version()
	{
		return $this->version;
	}

	/**
	 * Get Singleton
	 */
	public static function get_instance()
	{
		// Si l'instance n'existe pas encore, on la crée
		if (self::$instance === null) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	/**
	 * Creation and registration of shortcode
	 */
	public function p28_filter_shortcode()
	{
		ob_start();
		include plugin_dir_path(dirname(__FILE__)) . '/templates/p28-filter-form.php';
		include plugin_dir_path(dirname(__FILE__)) . '/templates/p28-filter-content.php';
		return ob_get_clean();
	}

	public function register_shortcodes()
	{
		add_shortcode('p28_filter', [$this, 'p28_filter_shortcode']);
	}


	/**
	 * Filtrage de l'API REST avec
	 * les champs ACF
	 * 
	 * @return 	array	Les arguments pour la meta_query de la WP_Query	
	 */
	private function filterable_acf_fields($r)
	{
		$meta_query = array(
			'relation'  => 'AND'
		);

		if (isset($r['pays']) && $r['pays'] != null) {

			$meta_query[] =  array(
				'key'       => 'pays',
				'value'     => '"' . $r['pays'] . '"',
				'compare'   => 'LIKE'
			);
		}

		if (isset($r['duree']) && $r['duree'] != null) {

			$duree = [];

			foreach ($r['duree'] as $param) {
				$duree[] = strval($param);
			}

			$meta_query[] =  array(
				'key'       => 'duree',
				'value'     => $duree,
				'compare'   => 'IN'
			);
		}

		if (isset($r['date_de_sortie']) && $r['date_de_sortie'] != null) {
			$meta_query[] =  array(
				'key'       => 'date_de_sortie',
				'value'     => $r['date_de_sortie'],
				'compare'   => '='
			);
		}

		return $meta_query;
	}
	public function modify_rest_response($response, $post)
	{

		$affiche = get_field('affiche', $post->ID);

		if ($affiche) {

			$response->data['acf']['affiche_url'] = wp_get_attachment_url($affiche['id']);
		}




		return $response;
	}


	/**
	 * Filtrage par taxonomies
	 * 
	 * @return 	array	Les arguments pour la tax_query de la WP_Query	
	 */
	private function filterable_taxonomies($r)
	{
		$tax_query = array(
			'relation'  => 'AND'
		);

		if (isset($r['genre']) && $r['genre'] != null) {
			$tax_query[] =  array(
				'taxonomy' => 'genre',
				'field'    => 'term_id',
				'terms'    => intval($r['genre'][0])
			);
		}

		if (isset($r['format']) && $r['format'] != null) {
			$tax_query[] =  array(
				'taxonomy' => 'format',
				'field'    => 'term_id',
				'terms'    => intval($r['format'][0])
			);
		}

		if (isset($r['etiquette']) && $r['etiquette'] != null) {
			$tax_query[] =  array(
				'taxonomy' => 'etiquette',
				'field'    => 'term_id',
				'terms'    => intval($r['etiquette'][0])
			);
		}

		if (isset($r['realisation']) && $r['realisation'] != null) {
			$tax_query[] =  array(
				'taxonomy' => 'realisation',
				'field'    => 'term_id',
				'terms'    => intval($r['realisation'][0])
			);
		}

		return $tax_query;
	}


	/**
	 * Gère la requête REST et ajoute le filtrage par taxonomie et par champs ACF
	 * 
	 * @return 	array	Les arguments pour la WP_Query	
	 */
	public function filter_rest_query($args, $request)
	{

		$params = $request->get_params();


		$args['tax_query'] = $this->filterable_taxonomies($params);
		$args['meta_query'] = $this->filterable_acf_fields($params);

		return $args;
	}

	/**
	 * Enregistrement du hook REST, 
	 * du hook PREPARE REST pour récupérer le champs acf affiche,
	 * avec le post_type oeuvre
	 */
	public function register_rest_hooks()
	{
		$this->loader->add_filter("rest_oeuvre_query", $this, 'filter_rest_query', 1, 2);
		$this->loader->add_filter('rest_prepare_oeuvre', $this, 'modify_rest_response', 2, 3);
	}



	/**
	 * Get all taxonomies and terms from current queried object.
	 */
	public function p28_get_caracteristics()
	{
		$queried_object = get_queried_object();
		if (is_object($queried_object) && $queried_object instanceof WP_Post_Type) {
			return get_object_taxonomies($queried_object->name, 'objects');
		} else {
			return $queried_object;
		}
	}

	/**
	 * Get all ACF from current queried object.
	 * Requires the ACF plugin (the free version works with this plugin).
	 */
	public function p28_get_ACF()
	{
		if (class_exists('ACF')) {
			$queried_object = get_queried_object();
			$queried_obj_id = get_queried_object_id();
			$acf_stuff = [];

			if (is_object($queried_object)) {

				if ($queried_object instanceof WP_Post_Type) {
					$acf_groups = acf_get_field_groups(array('post_id' => $queried_obj_id));


					foreach ($acf_groups as $acf_group) {


						if (acf_get_fields($acf_group['key'])) {

							foreach (acf_get_fields($acf_group['key']) as $i => $field) {


								if ($field['name'] == 'date_de_sortie' || $field['name'] == 'pays') {
									array_push($acf_stuff, $field);
								}
							}
						}
					}
				}
			}
			return $acf_stuff;
		}
	}
}
