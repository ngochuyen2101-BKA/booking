<?php
// Add custom Theme Functions here
function add_css(){
 	$version1=uniqid();
	wp_register_style( 'thang_css', get_theme_root_uri().'/flatsome-child/thang.css',true,$version1,'all'); 
	wp_enqueue_style( 'thang_css' );
	wp_register_style( 'core-css', get_theme_root_uri().'/flatsome-child/style.css',true,$version1,'all'); 
	wp_enqueue_style( 'core-css' );
	wp_register_style( 'bootstrap-css', get_theme_root_uri().'/flatsome/assets/css/bootstrap-grid.min.css',true,$version1,'all'); 
	wp_enqueue_style( 'bootstrap-css' );
	wp_enqueue_script('thang_js', get_theme_root_uri().'/flatsome-child/thang.js', array(), $version1, true);
	wp_enqueue_style( 'font-awesome-free', esc_url_raw( 'https://kit-free.fontawesome.com/releases/latest/css/free.min.css?ver=5.5.4' ), array(), null );
  	wp_enqueue_style( 'noptin_front','/wp-content/plugins/newsletter-optin-box/includes/assets/css/frontend.css',false );
 }
 add_action( 'wp_enqueue_scripts', 'add_css',1000 );

// add_filter( 'jpeg_quality', create_function( '', 'return 100;' ) );


add_filter( 'excerpt_length', 'smile_prefix_excerpt_length' );
function smile_prefix_excerpt_length() {
return 100;
}
add_action('admin_head', 'custom_css_backend');
function custom_css_backend() {?>
	<style>
		.error, #postbox-container-2 .yith-wcbk-order-related-booking__status--paid, #postbox-container-2 .yith-wcbk-order-related-booking__status--unpaid, #order_line_items .display_meta tbody tr:first-child, .woocommerce_order_items .quantity, .woocommerce_order_items .wc-order-edit-line-item, #postbox-container-2 .yith-wcbk-order-related-booking__services, .yith-wcbk-order-related-booking__loaikhach, #order_line_items .view, #yith-wcbk-order-related-bookings .yith-wcbk-order-related-booking__title__booking-link {
			display: none;
		}
		
	</style>;
<?php
}

add_action('wp_ajax_custom_data_product', 'saveCustomData');
add_action('wp_ajax_nopriv_custom_data_product', 'saveCustomData');

function saveCustomData() {
	$adult = $_POST['adult'];
    $child = $_POST['child'];
	$date_checkin = $_POST['date_checkin'];
	$date_checkout = $_POST['date_checkout'];
	$product_id = $_POST['product_id'];

	$custom_data = array( 'customData'=> array( 
		'custom_adult' => $adult,
		'custom_child' => $child,
		'custom_date_checkin' => $date_checkin,
		'custom_date_checkout' => $date_checkout,
	) );
	
	WC()->cart->add_to_cart( (int)$product_id , 1, 0, array(), $custom_data );

	foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
		$_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
		$_product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);
		if($product_id == $_product_id) {
			echo apply_filters('woocommerce_cart_item_remove_link', sprintf(
				'<a href="%s" class="remove remove_from_cart_button" aria-label="%s" data-product_id="%s" data-cart_item_key="%s" data-product_sku="%s" target="_blank"><i class="fa fa-times" aria-hidden="true"></i></a>',
				esc_url(wc_get_cart_remove_url($cart_item_key)),
				esc_html__('Remove this item', 'woocommerce'),
				esc_attr($_product_id),
				esc_attr($cart_item_key),
				esc_attr($_product->get_sku())
			), $cart_item_key);
		}
	}
}

add_action('wp_ajax_get_data_room', 'getDataRoom');
add_action('wp_ajax_nopriv_get_data_room', 'getDataRoom');

function getDataRoom() {
	$adult = $_POST['adult'];
    $child = $_POST['child'];
	
	$args = array(
		'post_type'      => 'product',
		'posts_per_page' => -1,
		'product_cat'    => 'hang-phong',
		'post_status'    => 'publish'
	);

	$loop = new WP_Query( $args );
	$html = '';
	while ( $loop->have_posts() ) : $loop->the_post();
		global $product;
		$room_status = get_field('tinh_trang', $product->id)['value'];
		if($room_status == 'hetphong') continue;

		$image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->id ), 'single-post-thumbnail' );
		$area = $product->get_attribute( 'area' );
		$number_adult = $product->get_attribute( 'adults' );
		$number_child = $product->get_attribute( 'childs' );
		$date = $product->get_attribute( 'number-of-date' );
		$regular_price = $product->get_regular_price();
		$sale_price = $product->get_sale_price();

		if( ((int)$number_adult >= (int)$adult) && ((int)$number_child >= (int)$child) ) {

			$html .= '<form class="cart" action="" method="post" enctype="multipart/form-data" data-product_id="'.$product->id.'">';
			$html .= 	'<div class="product-booking">';
			$html .= 		'<img src="'.$image[0].'" data-id="'.$product->id.'">';
			$html .= 		'<input type="hidden" name="add-to-cart" value="'.$product->id.'">';
			$html .= 		'<input type="hidden" name="product_id" value="'.$product->id.'">';
			$html .= 		'<input type="hidden" name="quantity" value="'.$product->id.'">';
			$html .= 		'<div class="room-title">'.$product->get_title().'</div>';
            $html .= 		'<div class="row">';                
            $html .= 			'<div class="col-md-4">';                    
            $html .= 				'<div class="room-area">'.$area.'</div>';
			$html .= 				'<div class="room-change">Không hủy và thay đổi</div>';
            $html .= 			'</div>';                            
            $html .= 			'<div class="col-md-4">';                        
            $html .= 				'<div class="room-user">'.$number_adult.' người lớn - '.$number_child.' trẻ em</div>';                        
            $html .= 				'<div class="room-deposit">Đặt cọc và đảm bảo</div>';
			$html .= 			'</div>';                            
            $html .= 			'<div class="col-md-4">';
			$html .= 				'<div class="regular-price">'.$regular_price.' VNĐ</div>';
			$html .= 				'<div class="sale-price">'.$sale_price.' VNĐ</div>';
			$html .= 				'<button type="submit" class="single_add_to_cart_button button alt btn-select select-room" data-product_id="'.$product->id.'">Lựa chọn</button>';
            $html .= 			'</div>';
			$html .= 		'</div>';
			$html .= 	'</div>';
			$html .= '</div>';         
		}

	endwhile;
	echo $html;
}

add_action( 'woocommerce_checkout_create_order_line_item', 'save_cart_item_custom_meta_as_order_item_meta', 10, 4 );
function save_cart_item_custom_meta_as_order_item_meta( $item, $cart_item_key, $values, $order ) {
    if ( isset($values['customData']) && isset($values['customData']['custom_adult']) ) {
        $item->update_meta_data( 'custom_adult', $values['customData']['custom_adult'] );
    }
	if ( isset($values['customData']) && isset($values['customData']['custom_child']) ) {
        $item->update_meta_data( 'custom_child', $values['customData']['custom_child'] );
    }
	if ( isset($values['customData']) && isset($values['customData']['custom_date_checkin']) ) {
        $item->update_meta_data( 'custom_date_checkin', $values['customData']['custom_date_checkin'] );
    }
	if ( isset($values['customData']) && isset($values['customData']['custom_date_checkout']) ) {
        $item->update_meta_data( 'custom_date_checkout', $values['customData']['custom_date_checkout'] );
    }
}
// add_action('woocommerce_add_to_cart', 'refresh_function');

// function refresh_function(){
// 	header("Refresh:0");
// }
add_filter( 'woocommerce_checkout_fields', 'ybc_remove_default_validation' );

function ybc_remove_default_validation( $fields ){
    unset( $fields['billing']['billing_last_name']['required'] );
    unset( $fields['billing']['billing_country']['required'] );
    unset( $fields['billing']['billing_city']['required'] );
	unset( $fields['billing']['billing_address_1']['required'] );
	return $fields;
}

add_action( 'phpmailer_init', 'send_smtp_email' );
function send_smtp_email( $phpmailer ) {
  $phpmailer->isSMTP();
  $phpmailer->Host       = SMTP_HOST;
  $phpmailer->SMTPAuth   = SMTP_AUTH;
  $phpmailer->Port       = SMTP_PORT;
  $phpmailer->Username   = SMTP_USER;
  $phpmailer->Password   = SMTP_PASS;
  $phpmailer->SMTPSecure = SMTP_SECURE;
  $phpmailer->From       = SMTP_FROM;
  $phpmailer->FromName   = SMTP_NAME;
}