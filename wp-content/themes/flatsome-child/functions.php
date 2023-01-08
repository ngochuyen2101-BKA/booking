<?php
// Add custom Theme Functions here
function add_css(){
 	$version1=uniqid();
	wp_register_style( 'thang_css', get_theme_root_uri().'/flatsome-child/thang.css',true,$version1,'all'); 
	wp_enqueue_style( 'thang_css' );
	wp_enqueue_script('thangver2_js', get_theme_root_uri().'/flatsome-child/thangver2.js', array(), $version1, true);
	wp_register_style( 'core-css', get_theme_root_uri().'/flatsome-child/style.css',true,$version1,'all'); 
	wp_enqueue_style( 'core-css' );
	wp_enqueue_script('thang_js', get_theme_root_uri().'/flatsome-child/thang.js', array(), $version1, true);
	wp_enqueue_style( 'font-awesome-free', esc_url_raw( 'https://kit-free.fontawesome.com/releases/latest/css/free.min.css?ver=5.5.4' ), array(), null );
  	wp_enqueue_style( 'noptin_front','/wp-content/plugins/newsletter-optin-box/includes/assets/css/frontend.css',false );
	$currentURL = $_SERVER['REQUEST_URI'];
	$bookingPage = strpos($currentURL,'/booking-page') > -1;
	$checkoutPage = strpos($currentURL,'/thanh-toan') > -1;
	if($bookingPage || $checkoutPage) {
		wp_register_style( 'bootstrap-css', get_theme_root_uri().'/flatsome/assets/css/bootstrap-grid.min.css',true,$version1,'all'); 
		wp_enqueue_style( 'bootstrap-css' );
		wp_enqueue_script('moment', get_theme_root_uri().'/flatsome-child/moment.js', array(), $version1, true);
	}
 }
 add_action( 'wp_enqueue_scripts', 'add_css',1000 );

// add_filter( 'jpeg_quality', create_function( '', 'return 100;' ) );


add_filter( 'excerpt_length', 'smile_prefix_excerpt_length' );
function smile_prefix_excerpt_length() {
return 150;
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
	$standard = (int)$_POST['standard'];
	$count5 = (int)$_POST['count5'];
	$count10 = (int)$_POST['count10'];
	$count11 = (int)$_POST['count11'];

	$diff = 0;
	if($standard <  ($adult + $count11)) {
		$diff = $adult + $count11 - $standard;
	}
	if(($adult + $count11 + $count10 + $count5) > 4 || ( (($adult + $count11) == 4 ) && $standard == 2 ) ) {
		echo "empty";
		die();
	}

	$custom_data = array( 'customData'=> array( 
		'custom_adult' => $adult,
		'custom_child' => $child,
		'custom_date_checkin' => $date_checkin,
		'custom_date_checkout' => $date_checkout,
		'child_under5' => $count5,
		'child_under10' => $count10,
		'child_over10' => $count11,
	) );
	
	$list_key = array_keys(WC()->cart->get_cart());
	$product_item_key = WC()->cart->add_to_cart( (int)$product_id , 1, 0, array(), $custom_data );
	// if (in_array($product_item_key, $list_key)) {
	// 	echo $product_id;
	// 	die();
	// }
	$item_bed_key = false;
	foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
		$_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
		$_product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);
		if($_product_id == 1738) {
			$item_bed_key = true;
			WC()->cart->set_quantity($cart_item_key,$cart_item['quantity'] + $diff);
		}
		if($product_id == $_product_id) {
			echo apply_filters('woocommerce_cart_item_remove_link', sprintf(
				'<a href="%s" class="remove remove_from_cart_button" aria-label="%s" data-product_id="%s" data-cart_item_key="%s" data-product_sku="%s" target="_blank"><i class="fa fa-times" aria-hidden="true"></i></a>',
				esc_url(wc_get_cart_remove_url($cart_item_key)),
				esc_html__('Remove this item', 'woocommerce'),
				esc_attr($_product_id),
				esc_attr($cart_item_key),
				esc_attr($_product->get_sku())
			), $cart_item_key);
			break;
		}
	}
	if(!$item_bed_key && $diff > 0) {
		WC()->cart->add_to_cart( 1738 , $diff );
	}
	die();
}

add_action('wp_ajax_remove_bed', 'removeBed');
add_action('wp_ajax_nopriv_remove_bed', 'removeBed');

function removeBed() {
	$diff = $_POST['diff'];

	foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
		$_product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);
		if($_product_id == 1738) {
			if($cart_item['quantity'] == $diff) {
				WC()->cart->remove_cart_item(1738);
			} else {
				WC()->cart->set_quantity($cart_item_key,$cart_item['quantity'] - $diff);
			}
		}
	}
}

add_action('wp_ajax_get_data_room', 'getDataRoom');
add_action('wp_ajax_nopriv_get_data_room', 'getDataRoom');

function getDataRoom() {
	$adult = $_POST['adult'];
	$count5 = $_POST['count5'];
	$count10 = $_POST['count10'];
    $count11 = $_POST['count11'];
	
	$saveFilter = $_COOKIE['saveFilter'];
	$args = array(
		'post_type'      => 'product',
		'posts_per_page' => -1,
		'product_cat'    => 'hang-phong',
		'post_status'    => 'publish'
	);

	$loop = new WP_Query( $args );
	$html = '';
	$i = 1;
	$has_product = false;
	while ( $loop->have_posts() ) : $loop->the_post();
		global $product;
		$room_status = get_field('tinh_trang', $product->id)['value'];
		if($room_status == 'hetphong') continue;

		$image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->id ), 'single-post-thumbnail' );
		$area = get_field('dien_tich', $product->id);
		// $number_adult = get_field('so_nguoi_lon', $product->id);
		// $number_child = get_field('so_tre_em', $product->id);
		$standard = get_field('tieu_chuan_phong',$product->id);
		$date = $product->get_attribute( 'number-of-date' );
		$regular_price = $product->get_regular_price();
		$sale_price = $product->get_sale_price();
		$attachment_ids = $product->get_gallery_image_ids();
		if($regular_price!=""){
			$has_sale_price = "has-sale-price";
		}

		if( ( (int)$standard ) >= ( (int)$adult + (int)$count11 - 1 ) && ( ( (int)$adult  + (int)$count5 + (int)$count10 + (int)$count11 ) <= 4 ) ) {
			$has_product = true;
			$html .= '<div class="cart" data-product_id="'.$product->id.'">';
			$html .= 	'<div class="product-booking">';
			// $html .= 		'<img src="'.$image[0].'" data-id="'.$product->id.'">';
			$html .= 	'<div class="slideshow-container">';
			foreach( $attachment_ids as $attachment_id ) {
				$image_link = wp_get_attachment_url( $attachment_id );
			
			$html .= 			'<div class="mySlides fade slide-room'.$i.'">';
			$html .= 			'	<img src="'.$image_link.'" style="width:100%">';
			$html .= 			'</div>';
			}
			$html .= 			'<a class="prev" onclick="plusSlides(-1,'.$i.')">❮</a>';
			$html .= 			'<a class="next" onclick="plusSlides(1,'.$i.')">❯</a>';
			$i++;
			$html .= 		'</div>';
			$html .= 		'<input type="hidden" name="add-to-cart" value="'.$product->id.'">';
			$html .= 		'<input type="hidden" name="product_id" value="'.$product->id.'">';
			$html .= 		'<input type="hidden" name="quantity" value="'.$product->id.'">';
			$html .= 		'<div class="room-title">'.$product->get_title().'</div>';
            $html .= 		'<div class="row">';                
            $html .= 			'<div class="col-md-4">';                    
            $html .= 				'<div class="room-area"><img src="/wp-content/uploads/2022/11/dien-tich.svg" width="20px" height="20px">'.$area.'</div>';
			$html .= 				'<div class="room-change"><img src="/wp-content/uploads/2022/11/huy.svg" width="20px" height="20px">Không hủy và thay đổi</div>';
            $html .= 			'</div>';                            
            $html .= 			'<div class="col-md-4">';                        
            $html .= 				'<div class="room-user" data-standard="'.$standard.'"><img src="/wp-content/uploads/2022/11/nguoi.svg" width="20px" height="20px">Tiêu chuẩn: '.$standard.'</div>';                        
            $html .= 				'<div class="room-deposit"><img src="/wp-content/uploads/2022/11/coc.svg" width="20px" height="20px">Đặt cọc và đảm bảo</div>';
			$html .= 			'</div>';                            
            $html .= 			'<div class="col-md-4 price-col '.$has_sale_price.'">';
			$html .= 				'<div class="date-gr"><span>1</span> đêm</div>';
			$html .= 				'<div class="booking-price-box"><div class="regular-price-gr"><span class="regular-price-cal" style="display: none;">'.($sale_price ? $regular_price : '').'</span><span class="regular-price">';
			if ($sale_price) {
				$html .= number_format($regular_price);
			} else {
				$html .= '';
			}
			$html .= 				'</span>'.($sale_price ? ' VNĐ' : '').'</div>';
			$html .= 				'<div class="sale-price-gr"><span class="sale-price-cal" style="display: none;">'.($sale_price ? $sale_price : $regular_price).'</span><span class="sale-price">'.number_format($sale_price ? $sale_price : $regular_price).'</span> VNĐ / <div class="date-gr show"><span> 1</span> đêm</div></div></div>';
			$html .= 				'<button type="submit" class=" button alt btn-select select-room" data-product_id="'.$product->id.'">Lựa chọn</button>';
            $html .= 			'</div>';
			$html .= 		'</div>';
			$html .= 	'</div>';
			$html .= '</div>';
		}

	endwhile;
	if(str_contains($saveFilter, 'standard2')) {
		$has_product = false;
	}
	if(!$has_product) {
		$html = '';
		$html .= '<p>Rất tiếc, không có phòng nghỉ phù hợp với tiêu chí tìm kiếm của Quý khách.</p><p>Quý khách vui lòng thay đổi lựa chọn!</p>';
		$html .='<script>';
		$html .='jQuery("document").ready(function(){jQuery(".add-room").appendTo(jQuery(".booking-content .col-md-8")); jQuery(".booking-content .col-md-8 .add-room .btn-show").click(function(){jQuery(".booking-content .col-md-8 .add-room .popup-add").toggle()});});';
		$html .='</script>';
		echo $html;
	} else {
		$title = '<h2 class="title">Chọn phòng cho chuyến đi của bạn</h2>';
		$desc = '<p class="description">Quý khách sẽ được đặt phòng ở mức giá tốt nhất do không phải qua đơn vị trung gian:<br>Quý khách đang ghé thăm trang web của khu nghỉ dưỡng</p>';
		$html .='<script>';
		$html .='jQuery("document").ready(function(){jQuery(".mySlides img").css("height",jQuery(".mySlides img").width() * 9 / 16 + "px");});';
		$html .='</script>';
		echo $title.$desc.$html;
	}
}

add_action('wp_ajax_get_data_service', 'getDataService');
add_action('wp_ajax_nopriv_get_data_service', 'getDataService');

function getDataService() {
    $product_id = $_POST['product_id'];

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
			die();
		}
	}
	echo $product_id;
}

add_action('wp_ajax_decrease_service', 'decreaseService');
add_action('wp_ajax_nopriv_decrease_service', 'decreaseService');

function decreaseService() {
    $product_id = $_POST['product_id'];
	$qty = $_POST['qty'];
	$a = WC()->cart->get_cart();

	foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
		$_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
		$_product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);
		
		if( $product_id == $_product_id ){
            WC()->cart->set_quantity( $cart_item_key, $qty ); // Change quantity
        }
	}
}

add_action( 'woocommerce_checkout_create_order_line_item', 'save_cart_item_custom_meta_as_order_item_meta', 10, 4 );
function save_cart_item_custom_meta_as_order_item_meta( $item, $cart_item_key, $values, $order ) {
    if ( isset($values['customData']) && isset($values['customData']['custom_adult']) ) {
        $item->update_meta_data( 'Adults', $values['customData']['custom_adult'] );
    }
	if ( isset($values['customData']) && isset($values['customData']['custom_child']) ) {
        $item->update_meta_data( 'Childs', $values['customData']['custom_child'] );
    }
	if ( isset($values['customData']) && isset($values['customData']['custom_date_checkin']) ) {
        $item->update_meta_data( 'Date check in', $values['customData']['custom_date_checkin'] );
    }
	if ( isset($values['customData']) && isset($values['customData']['custom_date_checkout']) ) {
        $item->update_meta_data( 'Date check out', $values['customData']['custom_date_checkout'] );
    }
	if ( isset($values['customData']) && isset($values['customData']['child_under5']) ) {
        $item->update_meta_data( 'Child under 5', $values['customData']['child_under5'] );
    }
	if ( isset($values['customData']) && isset($values['customData']['child_under10']) ) {
        $item->update_meta_data( 'Child under 10', $values['customData']['child_under10'] );
    }
	if ( isset($values['customData']) && isset($values['customData']['child_over10']) ) {
        $item->update_meta_data( 'Child over 10', $values['customData']['child_over10'] );
    }
}

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

add_action( 'woocommerce_after_shop_loop_item_title', 'woo_show_detail_shop_page', 5 );
function woo_show_detail_shop_page() {
	global $product;
	$dien_tich = get_field("dien_tich");
	// $so_nguoi_lon = get_field("so_nguoi_lon");
	// $so_tre_em = get_field("so_tre_em");
	$standard = get_field("tieu_chuan_phong");
	echo "<div class='number-detail'><div class='number-dientich'>Diện tích: ".$dien_tich."</div><div class='so-nguoi'>Tiêu chuẩn: ".$standard."</div></div>";
}
add_action( 'woocommerce_after_shop_loop_item_title', 'woo_show_excerpt_shop_page', 5 );
function woo_show_excerpt_shop_page() {
	global $product;

	echo "<div class='short-des'>". $product->post->post_excerpt ."</div>";
}

add_action('wp_ajax_remove_cart', 'custom_empty_cart');
add_action('wp_ajax_nopriv_remove_cart', 'custom_empty_cart');
function custom_empty_cart() {
	global $woocommerce;
	$woocommerce->cart->empty_cart( true );
	setcookie('step',1,864000, "/");
}
function check_product_before_order () {
    global $woocommerce;
	$price = 0;
	foreach ($woocommerce->cart->get_cart() as $cart_item_key => $cart_item) {
		$_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
		$_product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);
		
		$additional_price = 0;
		if(isset($cart_item['customData'])) {
			$checkin = $cart_item['customData']['custom_date_checkin'];
			$checkout = $cart_item['customData']['custom_date_checkout'];
			$adult = $cart_item['customData']['custom_adult'];
			$count5 = $cart_item['customData']['child_under5'];
			$count10 = $cart_item['customData']['child_under10'];
			$count11 = $cart_item['customData']['child_over10'];
			$count_day = abs(strtotime($checkin)-strtotime($checkout))/86400;

			$standard = get_field('tieu_chuan_phong',$_product_id);
			if($standard >= ($adult + $count11) && $standard < ($adult + $count10 + $count11)) {
				$additional_price = 300000 * ($adult + $count10 + $count11 - $standard);
			} else if($standard < ($adult + $count11)) {
				$additional_price = 300000 * $count10;
			}
		}
		
		$price_sale = $_product->get_sale_price();
        $price_real = $_product->get_regular_price();
		$qty = $cart_item['quantity'];
		
		if($_product_id == 1738) {
			$price += $price_real * $qty * $count_day;
			continue;
		}
		if(isset($cart_item['customData'])) {
			if($price_sale) {
				$price += ($price_sale + $additional_price) * $qty * $count_day;
			} else {
				$price += ($price_real + $additional_price) * $qty * $count_day;
			}
		} else {
			$price += $price_real * $qty;
		}
		
	}
	$woocommerce->cart->cart_contents_total = $price;
}
add_action('woocommerce_calculate_totals', 'check_product_before_order');

add_action('woocommerce_checkout_create_order', 'on_checkout_create_order', 20, 2);
function on_checkout_create_order( $order, $data ) {
	$sumTotal = 0;
	foreach( $order->get_items() as $item_id => $line_item ){
		$product_id = $line_item->get_product_id();
		if($product_id == 1738) {
			continue;
		}
		$subtotal = 0;
		$checkin = 0;
		$checkout = 0;
		$total_cart = 0;
		$count5 = 0;
		$count10 = 0;
		$count11 = 0;
		$total = $line_item->get_total();
		$qty = $line_item->get_quantity();
		$items_meta_data = $line_item->get_meta_data();
		foreach($items_meta_data as $item_meta) {
			$data = $item_meta->get_data();
			if($data['key'] == 'Date check in') {
				$checkin = $data['value'];
			}
			if($data['key'] == 'Date check out') {
				$checkout = $data['value'];
			}
			if($data['key'] == 'Child under 5') {
				$count5 = $data['value'];
			}
			if($data['key'] == 'Child under 10') {
				$count10 = $data['value'];
			}
			if($data['key'] == 'Child over 10') {
				$count11 = $data['value'];
			}
			if($data['key'] == 'Adults') {
				$adult = $data['value'];
			}
		}
		if($checkin && $checkout) {
			$count_day = abs(strtotime($checkin) - strtotime($checkout)) / 86400;

			$standard = get_field('tieu_chuan_phong',$product_id);
			if($standard >= ($adult + $count11) && $standard < ($adult + $count10 + $count11)) {
				$additional_price = 300000 * ($adult + $count10 + $count11 - $standard);
			} else if($standard < ($adult + $count11)) {
				$additional_price = 300000 * $count10;
			}

			$subtotal = ( $total + $additional_price ) * $qty * $count_day;
			$total_cart = ( $total + $additional_price ) * $qty * $count_day;
			$sumTotal += ( $total + $additional_price ) * $qty * $count_day;
		} else {
			$subtotal = $total;
			$total_cart = $total;
			$sumTotal += $total;
		}
		$order->items[$item_id]->set_subtotal($subtotal);
		$order->items[$item_id]->set_total($total_cart);
	}
	foreach( $order->get_items() as $item_id => $line_item ){ 
		$product_id = $line_item->get_product_id();
		if($product_id == 1738) {
			$total = $line_item->get_total();
			$qty = $line_item->get_quantity();
			$subtotal = $total * $count_day;
			$total_cart = $total * $count_day;
			$sumTotal += $total * $count_day;
			$order->items[$item_id]->set_subtotal($subtotal);
			$order->items[$item_id]->set_total($total_cart);
		}
	}
	$order->set_total($sumTotal);
}
function get_excerpt_by_id($post_id){
    $the_post = get_post($post_id); //Gets post ID
    $the_excerpt = ($the_post ? $the_post->post_content : null); //Gets post_content to be used as a basis for the excerpt
    $excerpt_length = 50; //Sets excerpt length by word count
    $the_excerpt = strip_tags(strip_shortcodes($the_excerpt)); //Strips tags and images
    $words = explode(' ', $the_excerpt, $excerpt_length + 1);

    if(count($words) > $excerpt_length) :
        array_pop($words);
        array_push($words, '…');
        $the_excerpt = implode(' ', $words);
    endif;

    return $the_excerpt;
}
function thang_related_post($content) {
    if(is_singular('post')) {
        global $post;
        ob_start();
        $categories = get_the_category($post->ID);
        if ($categories) {
            $category_ids = array();
            foreach($categories as $individual_category) $category_ids[] = $individual_category->term_id;
            $args=array(
                'category__in' => $category_ids,
                'post__not_in' => array($post->ID),
                'posts_per_page'=>3,
                'ignore_sticky_posts'=>1
            );

            $my_query = new wp_query( $args );
            if( $my_query->have_posts() ) {?>
				<div class="row related-post home-sec-7 row-bvlq row-small">
					<h3>Bài viết liên quan</h3>
					<?php while ($my_query->have_posts()):$my_query->the_post(); ?>
					<div class="col large-4">
						<div class="post-item">
							<div class="col-inner">
								<a href="<?php echo get_the_permalink(); ?>" class="plain">
									<div class="box box-normal box-text-bottom box-blog-post has-hover">
										<div class="box-image ">
											<div class="image-cover" style="padding-top:56.25%;">
												<img width="900" height="600" src="<?php echo get_the_post_thumbnail_url();?>" class="attachment-original size-original wp-post-image" alt="" decoding="async" loading="lazy">
											</div>
										</div>
										<div class="box-text text-left">
											<div class="box-text-inner blog-post-inner">
												<h5 class="post-title is-large "><?php echo get_the_title(); ?></h5>
												<p class="from_the_blog_excerpt "><?php echo get_excerpt_by_id($post->ID);; ?></p>
												<button href="" class="button secondary is-link is-small mb-0">Xem thêm </button>
											</div>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
					<?php endwhile; ?>
				</div>
            <?php } // end if has post
        } // end if $categories
        $related_post = ob_get_contents();
        ob_end_clean();
        return $content.$related_post;
    } //end if is single post
    else return $content;
}
add_shortcode('thang_related_post', 'thang_related_post');