<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'admin_menu',
	function () {
		add_menu_page(
			'AI Automation Page',
			'AI Automation Page',
			'manage_options',
			'taiba-ai-automation',
			'taiba_ai_render_admin',
			'dashicons-edit-page',
			58
		);
	}
);

add_action(
	'admin_enqueue_scripts',
	function ( $hook ) {
		if ( 'toplevel_page_taiba-ai-automation' !== $hook ) {
			return;
		}
		wp_enqueue_media();
		wp_enqueue_style( 'taiba-ai-admin', TAIBA_AI_URL . 'admin/admin.css', array(), TAIBA_AI_VERSION );
		wp_enqueue_script( 'taiba-ai-admin', TAIBA_AI_URL . 'admin/admin.js', array( 'jquery' ), TAIBA_AI_VERSION, true );
	}
);

function taiba_ai_section_labels() {
	return array(
		'hero'       => 'Hero',
		'overview'   => 'Overview',
		'pain'       => 'Pain points',
		'chatbots'   => 'Chatbots',
		'workflows'  => 'Workflows',
		'example'    => 'Before and after example',
		'tools'      => 'Tools',
		'midCta'     => 'Middle call to action',
		'process'    => 'Process',
		'industries' => 'Industries',
		'faqs'       => 'FAQ',
		'finalCta'   => 'Final call to action',
		'LINKS'      => 'Button links (booking and case studies)',
	);
}

function taiba_ai_label( $path ) {
	$parts = explode( '/', $path );
	array_shift( $parts ); // section name is the heading already
	$out = array();
	foreach ( $parts as $p ) {
		$out[] = ctype_digit( $p ) ? '#' . ( (int) $p + 1 ) : $p;
	}
	return implode( ' › ', $out );
}

function taiba_ai_get_path( $arr, array $parts ) {
	foreach ( $parts as $p ) {
		if ( ! is_array( $arr ) || ! array_key_exists( $p, $arr ) ) {
			return '';
		}
		$arr = $arr[ $p ];
	}
	return is_string( $arr ) ? $arr : '';
}

function taiba_ai_render_admin() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$defaults = taiba_ai_flatten( taiba_ai_default_content() );
	$merged   = taiba_ai_merged_content();
	$ov       = taiba_ai_get_overrides();
	$labels   = taiba_ai_section_labels();

	$by_section = array();
	foreach ( $defaults as $path => $def ) {
		$section                  = explode( '/', $path )[0];
		$by_section[ $section ][] = $path;
	}
	?>
	<div class="wrap taiba-ai-admin">
		<h1>AI Automation Page</h1>
		<?php if ( isset( $_GET['saved'] ) ) : // phpcs:ignore WordPress.Security.NonceVerification ?>
			<div class="notice notice-success is-dismissible"><p>Saved. Hard-refresh the page to see changes (cache plugins: clear cache).</p></div>
		<?php elseif ( isset( $_GET['reset'] ) ) : // phpcs:ignore WordPress.Security.NonceVerification ?>
			<div class="notice notice-success is-dismissible"><p>All edits removed. The original text and images are back.</p></div>
		<?php endif; ?>

		<p>Page par lagane ke liye Elementor ke Shortcode widget mein ye likhein: <code>[taiba_ai_automation]</code></p>
		<p class="description">Optional: <code>header="yes"</code> (page ka apna header), <code>smooth="no"</code> (smooth scroll band), <code>schema="no"</code> (FAQ schema band).</p>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="taiba_ai_save">
			<?php wp_nonce_field( 'taiba_ai_save' ); ?>

			<h2>Images</h2>
			<p class="description">Khali chhorein to original image use hogi.</p>
			<div class="taiba-images">
				<?php foreach ( taiba_ai_image_keys() as $key => $label ) :
					$url     = isset( $ov['images'][ $key ] ) ? $ov['images'][ $key ] : '';
					$default = file_exists( TAIBA_AI_DIR . 'assets/' . $key . '.jpg' ) ? TAIBA_AI_URL . 'assets/' . $key . '.jpg' : '';
					?>
					<div class="taiba-image" data-default="<?php echo esc_url( $default ); ?>">
						<strong><?php echo esc_html( $label ); ?></strong>
						<img src="<?php echo esc_url( $url ? $url : $default ); ?>" alt="">
						<input type="hidden" name="taiba_img[<?php echo esc_attr( $key ); ?>]" value="<?php echo esc_attr( $url ); ?>">
						<button type="button" class="button taiba-pick">Choose image</button>
						<button type="button" class="button-link taiba-clear">Use original</button>
					</div>
				<?php endforeach; ?>
			</div>

			<h2>Text and links</h2>
			<?php foreach ( $labels as $section => $title ) :
				if ( empty( $by_section[ $section ] ) ) {
					continue;
				}
				?>
				<details class="taiba-section">
					<summary><?php echo esc_html( $title ); ?></summary>
					<table class="form-table" role="presentation">
						<?php foreach ( $by_section[ $section ] as $path ) :
							$value = taiba_ai_get_path( $merged, explode( '/', $path ) );
							$is_ta = strlen( $defaults[ $path ] ) > 90 || false !== strpos( $value, "\n" );
							?>
							<tr>
								<th scope="row"><label for="f-<?php echo esc_attr( $path ); ?>"><?php echo esc_html( taiba_ai_label( $path ) ); ?></label></th>
								<td>
									<?php if ( $is_ta ) : ?>
										<textarea id="f-<?php echo esc_attr( $path ); ?>" class="large-text" rows="<?php echo (int) min( 8, max( 3, ceil( strlen( $value ) / 90 ) ) ); ?>" name="taiba_f[<?php echo esc_attr( $path ); ?>]"><?php echo esc_textarea( $value ); ?></textarea>
									<?php else : ?>
										<input id="f-<?php echo esc_attr( $path ); ?>" type="text" class="large-text" name="taiba_f[<?php echo esc_attr( $path ); ?>]" value="<?php echo esc_attr( $value ); ?>">
									<?php endif; ?>
								</td>
							</tr>
						<?php endforeach; ?>
					</table>
				</details>
			<?php endforeach; ?>

			<p class="submit"><button type="submit" class="button button-primary button-large">Save changes</button></p>
		</form>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" onsubmit="return confirm('Saare edits hata kar original text aur images wapas lagayein?');">
			<input type="hidden" name="action" value="taiba_ai_reset">
			<?php wp_nonce_field( 'taiba_ai_reset' ); ?>
			<button type="submit" class="button">Reset everything to original</button>
		</form>
	</div>
	<?php
}

add_action(
	'admin_post_taiba_ai_save',
	function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Not allowed.' );
		}
		check_admin_referer( 'taiba_ai_save' );

		$defaults = taiba_ai_flatten( taiba_ai_default_content() );
		$posted   = isset( $_POST['taiba_f'] ) && is_array( $_POST['taiba_f'] ) ? wp_unslash( $_POST['taiba_f'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$content  = array();

		foreach ( $defaults as $path => $def ) {
			if ( ! isset( $posted[ $path ] ) || ! is_string( $posted[ $path ] ) ) {
				continue;
			}
			$val = str_replace( "\r\n", "\n", $posted[ $path ] );
			$val = ( 0 === strpos( $path, 'LINKS/' ) ) ? esc_url_raw( trim( $val ) ) : trim( sanitize_textarea_field( $val ) );
			if ( '' === $val || $val === $def ) {
				continue;
			}
			taiba_ai_set_path( $content, explode( '/', $path ), $val );
		}

		$images     = array();
		$img_posted = isset( $_POST['taiba_img'] ) && is_array( $_POST['taiba_img'] ) ? wp_unslash( $_POST['taiba_img'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		foreach ( array_keys( taiba_ai_image_keys() ) as $key ) {
			if ( ! empty( $img_posted[ $key ] ) && is_string( $img_posted[ $key ] ) ) {
				$images[ $key ] = esc_url_raw( $img_posted[ $key ] );
			}
		}

		update_option( TAIBA_AI_OPTION, array( 'content' => $content, 'images' => $images ), false );
		wp_safe_redirect( admin_url( 'admin.php?page=taiba-ai-automation&saved=1' ) );
		exit;
	}
);

add_action(
	'admin_post_taiba_ai_reset',
	function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Not allowed.' );
		}
		check_admin_referer( 'taiba_ai_reset' );
		delete_option( TAIBA_AI_OPTION );
		wp_safe_redirect( admin_url( 'admin.php?page=taiba-ai-automation&reset=1' ) );
		exit;
	}
);
