<?php
require dirname(__FILE__) . '/../vendor/autoload.php';

define('ABSPATH', dirname(__FILE__) . '/../');

//require_once ABSPATH . 'wp-load.php';
if (!function_exists('plugin_dir_path')) {
    function plugin_dir_path($file)
    {
        return ABSPATH;
    }
}
