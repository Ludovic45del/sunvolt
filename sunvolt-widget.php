<?php
/**
 * Plugin Name: Sunvolt Solar Widget
 * Description: A premium React widget for visualizing solar energy data. Use [sunvolt_widget] to display.
 * Version: 1.0.0
 * Author: Sunvolt
 * Author URI: https://sunvolt.ie
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

function sunvolt_enqueue_scripts() {
    // Only load scripts if the shortcode is present on the page (optional optimization)
    // global $post;
    // if (!has_shortcode($post->post_content, 'sunvolt_widget')) return;

    // Define build directory paths
    $plugin_url = plugin_dir_url(__FILE__);
    $plugin_dir = plugin_dir_path(__FILE__);
    
    // Path to the React build's asset manifest
    $manifest_path = $plugin_dir . 'build/asset-manifest.json';

    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);
        
        // Find main JS and CSS files
        $js_file = isset($manifest['files']['main.js']) ? $manifest['files']['main.js'] : null;
        $css_file = isset($manifest['files']['main.css']) ? $manifest['files']['main.css'] : null;

        // Enqueue CSS
        if ($css_file) {
            wp_enqueue_style(
                'sunvolt-widget-style', 
                $plugin_url . 'build' . $css_file, 
                array(), 
                '1.0.0'
            );
        }

        // Enqueue JS
        if ($js_file) {
            wp_enqueue_script(
                'sunvolt-widget-react', 
                $plugin_url . 'build' . $js_file, 
                array(), 
                '1.0.0', 
                true // Load in footer
            );

            // Pass the plugin URL to React so it can find images
            wp_add_inline_script(
                'sunvolt-widget-react',
                'window.sunvoltWidgetBaseUrl = "' . $plugin_url . 'build";',
                'before'
            );
        }
    }
}
add_action('wp_enqueue_scripts', 'sunvolt_enqueue_scripts');

// Shortcode to display the widget
function sunvolt_widget_shortcode() {
    return '<div id="sunvolt-widget-container"></div>';
}
add_shortcode('sunvolt_widget', 'sunvolt_widget_shortcode');
