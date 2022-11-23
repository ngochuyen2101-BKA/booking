<?php
/**
 * Checkout Form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-checkout.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrapper_classes = array();
$row_classes     = array();
$main_classes    = array();
$sidebar_classes = array();

$layout = get_theme_mod( 'checkout_layout' );

if ( ! $layout ) {
	$sidebar_classes[] = 'has-border';
}

if ( $layout == 'simple' ) {
	$sidebar_classes[] = 'is-well';
}

$wrapper_classes = implode( ' ', $wrapper_classes );
$row_classes     = implode( ' ', $row_classes );
$main_classes    = implode( ' ', $main_classes );
$sidebar_classes = implode( ' ', $sidebar_classes );
 echo do_shortcode('[block id="banner"]');
do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and not logged in, the user cannot checkout.
if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
	return;
}

// Social login.
if ( flatsome_option( 'facebook_login_checkout' ) && get_option( 'woocommerce_enable_myaccount_registration' ) == 'yes' && ! is_user_logged_in() ) {
	wc_get_template( 'checkout/social-login.php' );
}
?>

<div class="checkout-page checkout-page-booking">
    <div class="progress-booking">
        <div class="container">
            <div class="row align-center row-collapse justify-content-center">
                <div class="col large-10 col-lg-10">
                    <div class="col-inner d-flex">
                        <div class="step-1">
                            <p class="number-step">1</p>
                            <p class="text-step">Chọn phòng</p>
                        </div>
                        <div class="step-2">
                            <p class="number-step">2</p>
                            <p class="text-step">Lựa chọn bổ sung</p>
                        </div>
                        <div class="step-3">
                            <p class="number-step active1">3</p>
                            <p class="text-step">Đặt phòng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="info-booking">
        <div class="container">
            <div class="row align-center row-collapse justify-content-center">
                <div class="col large-10 col-lg-10">
                    <div class="col-inner d-flex">
                        <div class="check-in info">
                            <img src="/wp-content/uploads/2022/11/outline-calendar-check.svg"> Nhận phòng: <span><input type="date" class="date-checkin" readonly><span class="open-button">
                  <button type="button"><i class="fas fa-caret-down"></i></button>
                </span></span>
                        </div>
                        <div class="check-out info">
                            <img src="/wp-content/uploads/2022/11/outline-calendar-check.svg"> Trả phòng: <span><input type="date" class="date-checkout" readonly><span class="open-button">
                  <button type="button"><i class="fas fa-caret-down"></i></button>
                </span></span>
                        </div>
                        <div class="number-of-date info">
                            <img src="/wp-content/uploads/2022/11/icon-room.svg"> <span class="room-number">1</span> phòng
                        </div>
                        <div class="number-of-customer info">
                            <img src="/wp-content/uploads/2022/11/outline-user-2.svg"> <span class="number-adults">1</span> người lớn - <span class="number-childs">1</span> trẻ em
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="checkout-content">
        <form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data">
            <div class="container">
                <div class="row justify-content-center row-thong-tin-don-hang">
                    <div class="col col-md-10 col-title-success">
                        <div class="description">
                            <h2>Hoàn tất đặt phòng</h2>
                            <p>Quý khách sẽ được đặt phòng ở mức giá tốt nhất do không phải qua đơn vị trung
                            gian: Quý khách đang ghé thăm trang web của khu nghỉ dưỡng.</p>
                        </div>
                    </div>
                    <div class="col col-md-5 col-hotel-info">
                        <div class="hotel-info">
                            <h2>Bamboo Sapa Hotel</h2>
                            <div class="info">
                                <strong>Địa chỉ: </strong>
                                <p>Số 18, Đường Mường Hoa, Thị xã Sapa, Huyện Sapa, Tỉnh Lào Cai</p>
                            </div>
                            <div class="info">
                                <strong>Lễ tân đang làm việc: </strong>
                                <p>24/7</p>
                            </div>
                            <div class="info">
                                <strong>Nhận phòng từ: </strong>
                                <p>14: 00</p>
                            </div>
                            <div class="info">
                                <strong>Trả phòng trước: </strong>
                                <p>12: 00</p>
                            </div>
                            <div class="info">
                                <strong>Liên hệ: </strong>
                                <p>091 5510689</p>
                            </div>
                            <div class="info">
                                <strong>Website: </strong>
                                <p>bamboosapahotel.com.vn</p>
                            </div>
                        </div>
                    </div>
                    <div class="col col-md-5 col-thong-tin-phong">
                        <div class="booking-info">
                            <h2>Thông tin đặt phòng</h2>
                            <div class="list-selected">
                                <?php if (!WC()->cart->is_empty()) : 
                                    foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
                                        $_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
                                        $category_name = get_the_terms ( $_product->id, 'product_cat' )[0]->slug;
                                        if($category_name == 'hang-phong') {
                                ?>
                                    <div class="detail-selected room-selected">
                                        <div class="row">
                                            <div class="col-md-6 cart-info-label">
                                                <div class="title"><?php echo $_product->get_title(); ?></div>
                                                <div class="label">Nhận phòng</div>
                                                <div class="label">Trả phòng</div>
                                                <div class="label">Người lớn</div>
                                                <div class="label">Trẻ em</div>
                                                <div class="label">Số lượng</div>
                                            </div>
                                            <div class="col-md-6 cart-item-info">
                                                <div class="price-gr"><span class="price"><?php echo $_product->get_sale_price() ? number_format($_product->get_sale_price()) : number_format($_product->get_regular_price()); ?></span> VNĐ</div>
                                                <div class="info info-checkin"><?php echo date_format(date_create($cart_item['customData']['custom_date_checkin']),"d/m/Y"); ?></div>
                                                <div class="info info-checkout"><?php echo date_format(date_create($cart_item['customData']['custom_date_checkout']),"d/m/Y"); ?></div>
                                                <div class="info info-adult "><?php echo $cart_item['customData']['custom_adult']; ?></div>
                                                <div class="info info-child"><?php echo $cart_item['customData']['custom_child']; ?></div>
                                                <div class="info quantity info-qty"><?php echo $cart_item['quantity']; ?></div>
                                            </div>
                                        </div>
                                    </div>
                                <?php 
                                        } 
                                    }
                                endif; ?>
                                <?php if (!WC()->cart->is_empty()) : 
                                    foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
                                        $_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
                                        $category_name = get_the_terms ( $_product->id, 'product_cat' )[0]->slug;
                                        if($category_name == 'dich-vu') {
                                ?>
                                    <div class="detail-selected">
                                        <div class="row">
                                            <div class="col-md-6 cart-info-label">
                                                <div class="title"><?php echo $_product->get_title(); ?></div>
                                                <div class="label">Số lượng</div>
                                            </div>
                                            <div class="col-md-6 cart-item-info">
                                                <div class="price-gr"><span class="price"><?php echo number_format($_product->get_regular_price()); ?></span>VNĐ</div>
                                                <div class="info quantity info-qty"><?php echo $cart_item['quantity']; ?></div>
                                            </div>
                                        </div>
                                    </div>
                                <?php
                                        }
                                    }
                                endif; ?>
                                </div>
                                <div class="total row">
                                    <div class="col-md-6"><p class="label">Tổng</p></div>
                                    <div class="col-md-6"><p class="total-price"><?php echo number_format(WC()->cart->cart_contents_total); ?> VNĐ</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center row-thong-tin-khach-hang">
                        <div class="col col-md-5 col-thong-tin-khach-hang">
                            <div class="infor-customer-input">
                                <h2>Thông tin khách hàng</h2>
    							<label for="fname">Tên<p class="icon-require">*</p></label>
    							<input type="text" class="input-text " name="billing_first_name" id="billing_first_name" value="" autocomplete="given-name">
    							<div class="error-name error-notice" style="display:none;">Please fill in information</div>
    							<label for="fname">Email<p class="icon-require">*</p></label>
    							<input type="email" class="input-text " name="billing_email" id="billing_email" value="" autocomplete="email username">
    							<div class="error-email error-notice" style="display:none;">Please fill in information</div>
    							<div class="error-format error-notice" style="display:none;">Please fill in correct email</div>
    							<label for="fname">Số điện thoai<p class="icon-require">*</p></label>
    							<input type="tel" class="input-text " name="billing_phone" id="billing_phone" value="" autocomplete="tel">
    							<div class="error-phone error-notice" style="display:none;">Please fill in information</div>
    						</div>
    						<div class="woocommerce-additional-fields__field-wrapper">
                                <p class="form-row notes" id="order_comments_field" data-priority="">
                                    <label for="order_comments" class="">Thông tin bổ sung <span class="optional">(không bắt buộc)</span></label>
                                    <span class="woocommerce-input-wrapper">
                                        <textarea name="order_comments" class="input-text " id="order_comments" placeholder="" rows="2" cols="5"></textarea>
                                    </span>
                                </p>
                            </div>
                            <div class="check-condition">
                                <input type="checkbox" id="condition" name="condition">
                                <label for="condition">Tôi đã đọc và chấp nhận <a href="/dieu-khoan-va-dieu-kien">điều khoản và điều kiện</a>.</label>
                            </div>
                        </div>
                        <div class="col col-md-5 col-hinh-thuc-thanh-toan">
                            <h2>Lựa chọn hình thức thanh toán</h2>
                            <?php 
    							$available_gateways = WC()->payment_gateways()->get_available_payment_gateways();
    
    							wc_get_template(
    								'checkout/payment.php',
    								array(
    									'checkout'           => WC()->checkout(),
    									'available_gateways' => $available_gateways,
    									'order_button_text'  => apply_filters( 'woocommerce_order_button_text', __( 'Place order', 'woocommerce' ) ),
    								)
    							);
    						?>
                        </div>
                        <div class="col col-md-10 col-bo-sung">
                            <div class="btn-dat-phong-box dissable"><div class="button btn-dat-phong">Đặt phòng</div></div>
                            <p class="text-center">Bamboo Sapa Hotel xử lý các dữ liệu thu thập để quản lý việc đặt phòng của bạn. Để biết thêm về việc quản lý các dữ liệu cá nhân và việc thực hiện các quyền của bạn, đề nghị tham khảo khoản <a href="/chinh-sach-bao-mat">chính sách bảo mật</a> của chúng tôi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>