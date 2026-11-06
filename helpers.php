<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Original copy shipped with the plugin (generated from src/content/ai-automation.ts). */
function taiba_ai_default_content() {
	static $cache = null;
	if ( null === $cache ) {
		$raw   = file_get_contents( TAIBA_AI_DIR . 'default-content.json' );
		$cache = json_decode( $raw, true );
		if ( ! is_array( $cache ) ) {
			$cache = array();
		}
	}
	return $cache;
}

/** Saved dashboard edits: only values that differ from the default are stored. */
function taiba_ai_get_overrides() {
	$o = get_option( TAIBA_AI_OPTION, array() );
	return array(
		'content' => isset( $o['content'] ) && is_array( $o['content'] ) ? $o['content'] : array(),
		'images'  => isset( $o['images'] ) && is_array( $o['images'] ) ? $o['images'] : array(),
	);
}

/** Image slots = file names in src/assets (same keys the React build uses). */
function taiba_ai_image_keys() {
	return array(
		'ai-core'            => 'Hero image',
		'ai-employee'        => 'Overview image',
		'voice-wave'         => 'Chatbots: voice image',
		'workflow-network'   => 'Workflows image',
		'ind-clinic'         => 'Industry: Clinics and Healthcare',
		'ind-realestate'     => 'Industry: Real Estate',
		'ind-homeservices'   => 'Industry: Home Services',
		'ind-ecommerce'      => 'Industry: E-commerce',
		'ind-restaurant'     => 'Industry: Restaurants and Hospitality',
		'ind-professional'   => 'Industry: Professional Services',
		'ind-saas'           => 'Industry: SaaS and Tech Startups',
	);
}

/** Same rules as the JS merge: keep the default unless a non-empty string override exists. */
function taiba_ai_merge( $base, $over ) {
	if ( null === $over ) {
		return $base;
	}
	if ( is_array( $base ) ) {
		if ( ! is_array( $over ) ) {
			return $base;
		}
		$out = array();
		foreach ( $base as $k => $v ) {
			$out[ $k ] = array_key_exists( $k, $over ) ? taiba_ai_merge( $v, $over[ $k ] ) : $v;
		}
		return $out;
	}
	if ( is_string( $base ) ) {
		return ( is_string( $over ) && '' !== trim( $over ) ) ? $over : $base;
	}
	return $base;
}

function taiba_ai_merged_content() {
	$ov = taiba_ai_get_overrides();
	return taiba_ai_merge( taiba_ai_default_content(), $ov['content'] );
}

/** [ 'hero/title' => '...', 'faqs/0/q' => '...' ] */
function taiba_ai_flatten( $data, $prefix = '' ) {
	$out = array();
	foreach ( (array) $data as $k => $v ) {
		$path = '' === $prefix ? (string) $k : $prefix . '/' . $k;
		if ( is_array( $v ) ) {
			$out += taiba_ai_flatten( $v, $path );
		} elseif ( is_string( $v ) ) {
			$out[ $path ] = $v;
		}
	}
	return $out;
}

function taiba_ai_set_path( array &$arr, array $parts, $value ) {
	$key = array_shift( $parts );
	if ( empty( $parts ) ) {
		$arr[ $key ] = $value;
		return;
	}
	if ( ! isset( $arr[ $key ] ) || ! is_array( $arr[ $key ] ) ) {
		$arr[ $key ] = array();
	}
	taiba_ai_set_path( $arr[ $key ], $parts, $value );
}
