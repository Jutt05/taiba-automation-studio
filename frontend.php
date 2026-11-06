<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * [taiba_ai_automation header="no" smooth="yes" schema="yes"]
 *  header : "yes" shows the page's own floating header (default "no": your WordPress header is used)
 *  smooth : "no" turns off Lenis smooth scrolling
 *  schema : "no" removes the FAQ structured data (use it if your SEO plugin already prints one)
 */
function taiba_ai_shortcode( $atts ) {
	$atts = shortcode_atts(
		array(
			'header' => 'no',
			'smooth' => 'yes',
			'schema' => 'yes',
		),
		$atts,
		'taiba_ai_automation'
	);

	taiba_ai_enqueue_assets();

	$html = sprintf(
		'<div class="taiba-ai-host" data-taiba-ai-automation data-header="%s" data-smooth="%s" style="display:block;min-height:60vh"></div>',
		esc_attr( 'yes' === strtolower( $atts['header'] ) ? 'yes' : 'no' ),
		esc_attr( 'no' === strtolower( $atts['smooth'] ) ? 'no' : 'yes' )
	);

	if ( 'no' !== strtolower( $atts['schema'] ) ) {
		$html .= taiba_ai_faq_schema();
	}
	return $html;
}
add_shortcode( 'taiba_ai_automation', 'taiba_ai_shortcode' );

function taiba_ai_enqueue_assets() {
	$js = TAIBA_AI_DIR . 'assets/taiba-ai.js';
	if ( ! file_exists( $js ) ) {
		return; // build output missing
	}

	// Fonts used by the design (loaded on the page, available inside the shadow root).
	wp_enqueue_style( 'taiba-ai-font-bricolage', 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&display=swap', array(), null );
	wp_enqueue_style( 'taiba-ai-font-clash', 'https://api.fontshare.com/v2/css?f%5B%5D=clash-display@400,500,600&display=swap', array(), null );

	wp_enqueue_script( 'taiba-ai', TAIBA_AI_URL . 'assets/taiba-ai.js', array(), (string) filemtime( $js ), true );

	$ov      = taiba_ai_get_overrides();
	$images  = array();
	foreach ( $ov['images'] as $key => $url ) {
		if ( is_string( $url ) && '' !== $url ) {
			$images[ $key ] = esc_url_raw( $url );
		}
	}
	$payload = array(
		'content' => (object) $ov['content'],
		'images'  => (object) $images,
	);
	wp_add_inline_script(
		'taiba-ai',
		'window.TAIBA_CONTENT = ' . wp_json_encode( $payload, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE ) . ';',
		'before'
	);
}

// The bundle is an ES module.
add_filter(
	'script_loader_tag',
	function ( $tag, $handle, $src ) {
		if ( 'taiba-ai' === $handle ) {
			return '<script type="module" src="' . esc_url( $src ) . '" id="taiba-ai-js"></script>' . "\n"; // phpcs:ignore WordPress.WP.EnqueuedResources
		}
		return $tag;
	},
	10,
	3
);

function taiba_ai_faq_schema() {
	$content = taiba_ai_merged_content();
	if ( empty( $content['faqs'] ) || ! is_array( $content['faqs'] ) ) {
		return '';
	}
	$entities = array();
	foreach ( $content['faqs'] as $f ) {
		if ( empty( $f['q'] ) || empty( $f['a'] ) ) {
			continue;
		}
		$entities[] = array(
			'@type'          => 'Question',
			'name'           => $f['q'],
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => $f['a'],
			),
		);
	}
	if ( ! $entities ) {
		return '';
	}
	$schema = array(
		'@context'   => 'https://schema.org',
		'@type'      => 'FAQPage',
		'mainEntity' => $entities,
	);
	return '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_HEX_TAG | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) . '</script>';
}
