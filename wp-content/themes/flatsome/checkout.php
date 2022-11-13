<?php 
/* Template Name: Checkout Page */

get_header();
?>
<div class="checkout-page">
    <div class="progress-booking">
        <div class="container">
            <div class="step-1">
                <p class="number-step">1</p>
                <p class="text-step">Chọn phòng</p>
            </div>
            <div class="step-2">
                <p class="number-step">2</p>
                <p class="text-step">Lựa chọn bổ sung</p>
            </div>
            <div class="step-3">
                <p class="number-step">3</p>
                <p class="text-step">Đặt phòng</p>
            </div>
        </div>
    </div>
    <div class="info-booking">
        <div class="container">
            <div class="check-in info">
                <i class="fas fa-calendar-alt"></i> Nhận phòng: <span class="date-checkin">10/10/2022</span>
            </div>
            <div class="check-out info">
                <i class="fas fa-calendar-alt"></i> Trả phòng: <span class="date-checkout">11/10/2022</span>
            </div>
            <div class="number-of-date info">
                <i class="fas fa-hotel"></i> <span class="room-number">1</span> phòng
            </div>
            <div class="number-of-customer info">
                <i class="fas fa-user"></i> <span class="number-adults">1</span> người lớn - <span class="number-childs">1</span> trẻ em
            </div>
        </div>
    </div>
    <div class="checkout-content">
        <form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data">
            <div class="container">
                <div class="row">
                    <div class="col-md-7">
                        <div class="description">
                            <h2>Hoàn tất đặt phòng</h2>
                            <p>Quý khách sẽ được đặt phòng ở mức giá tốt nhất do không phải qua đơn vị trung
                            gian: Quý khách đang ghé thăm trang web của khu nghỉ dưỡng.</p>
                        </div>
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
                        <div class="infor-customer-input">
                            <h2>Thông tin khách hàng</h2>
							<label for="fname">Tên<p class="icon-require">*</p></label>
							<input type="text" class="input-text " name="billing_first_name" id="billing_first_name" value="" autocomplete="given-name">
							<label for="fname">Email<p class="icon-require">*</p></label>
							<input type="email" class="input-text " name="billing_email" id="billing_email" value="" autocomplete="email username">
							<label for="fname">Số điện thoai<p class="icon-require">*</p></label>
							<input type="tel" class="input-text " name="billing_phone" id="billing_phone" value="" autocomplete="tel">
						</div>
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
                    <div class="col-md-5">
                        <div class="booking-info">
                            <h2>Thông tin đặt phòng</h2>
                            <div class="list-selected">
                                <?php if (!WC()->cart->is_empty()) : 
                                    foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
                                        $_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
                                        $category_name = get_the_terms ( $_product->id, 'product_cat' )[0]->slug;
                                        if($category_name == 'hang-phong') {
                                ?>
                                    <div class="detail-selected">
                                        <div class="row">
                                            <div class="col-md-6 cart-info-label">
                                                <div class="title"><?php echo $_product->get_title(); ?></div>
                                                <div class="label">Nhận phòng</div>
                                                <div class="label">Trả phòng</div>
                                                <div class="label">Người lớn</div>
                                                <div class="label">Trẻ em</div>
                                            </div>
                                            <div class="col-md-6 cart-item-info">
                                                <div class="price"><?php echo $_product->get_sale_price(); ?></div>
                                                <div class="info"><?php echo $cart_item['customData']['custom_date_checkin']; ?></div>
                                                <div class="info"><?php echo $cart_item['customData']['custom_date_checkout']; ?></div>
                                                <div class="info"><?php echo $cart_item['customData']['custom_adult']; ?></div>
                                                <div class="info"><?php echo $cart_item['customData']['custom_child']; ?></div>
                                            </div>
                                        </div>
                                    </div>
                                <?php 
                                        } else {
                                ?>
                                    <div class="detail-selected">
                                        <div class="row">
                                            <div class="col-md-6 cart-info-label">
                                                <div class="title"><?php echo $_product->get_title(); ?></div>
                                            </div>
                                            <div class="col-md-6 cart-item-info">
                                                <div class="price"><?php echo $_product->get_regular_price(); ?></div>
                                            </div>
                                        </div>
                                    </div>
                                <?php
                                        }
                                    }
                                endif; ?>
                                </div>
                                <div class="total">
                                    <p class="label">Tổng</p>
                                    <p class="total-price">0 Đ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
<?php
get_footer();