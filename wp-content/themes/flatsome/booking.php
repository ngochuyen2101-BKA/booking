<?php 
/* Template Name: Booking Page */

get_header();
?>
<div class="booking-page">
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
                <i class="fas fa-calendar-alt"></i> Nhận phòng: <span><input type="date" class="date-checkin" value="<?php echo date('Y-m-d'); ?>"></span>
            </div>
            <div class="check-out info">
                <i class="fas fa-calendar-alt"></i> Trả phòng: <span><input type="date" class="date-checkout" value="<?php echo date("Y-m-d", strtotime("+1 day")); ?>"></span>
            </div>
            <div class="number-of-date info">
                <i class="fas fa-hotel"></i> <span class="room-number">1</span> phòng
            </div>
            <div class="number-of-customer info">
                <i class="fas fa-user"></i> <span class="number-adults">1</span> người lớn - <span class="number-childs">1</span> trẻ em
            </div>
            <div class="add-room">
                <p class="btn-show">Thêm phòng</p>
                <div class="popup-add">
                    <div class="adults">
                        <div class="label">Người lớn</div>
                        <input type="number" id="numberAdult">
                    </div>
                    <div class="childs">
                        <div class="label">Trẻ em</div>
                        <input type="number" id="numberChild">
                    </div>
                    <div class="add-btn">Áp dụng</div>
                </div>
            </div>
        </div>
    </div>
    <div class="booking-content">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="choose-room">
                        <h2 class="title">Chọn phòng cho chuyến đi của bạn</h2>
                        <p class="description">Quý khách sẽ được đặt phòng ở mức giá tốt nhất do không phải qua đơn vị trung gian:
                        Quý khách đang ghé thăm trang web của khu nghỉ dưỡngs</p>
                        <div class="list-room">
                        <?php  
                        $args = array(
                            'post_type'      => 'product',
                            'posts_per_page' => -1,
                            'product_cat'    => 'hang-phong',
                            'post_status'    => 'publish'
                        );

                        $loop = new WP_Query( $args );

                        while ( $loop->have_posts() ) : $loop->the_post();
                            global $product;
                            $room_status = get_field('tinh_trang', $product->id)['value'];
                            if($room_status == 'hetphong') continue;
                            $image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->id ), 'single-post-thumbnail' );
                            $area = $product->get_attribute( 'area' );
                            $adult = $product->get_attribute( 'adults' );
                            $child = $product->get_attribute( 'childs' );
                            $date = $product->get_attribute( 'number-of-date' );
                            $regular_price = $product->get_regular_price();
                            $sale_price = $product->get_sale_price();
                        ?>
                        <form class="cart" action="" method="post" enctype="multipart/form-data" data-product_id="<?php echo $product->id; ?>">
                            <div class="product-booking">
                                <img src="<?php  echo $image[0]; ?>" data-id="<?php echo $product->id; ?>">
                                <input type="hidden" name="add-to-cart" value="<?php echo $product->id; ?>" />
                                <input type="hidden" name="product_id" value="<?php echo $product->id; ?>" />
                                <input type="hidden" name="quantity" value="1" />
                                <div class="room-title">
                                    <?php echo $product->get_title(); ?>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="room-area">Diện tích: <?php echo $area; ?></div>
                                        <div class="room-change">Không hủy và thay đổi</div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="room-user"><?php echo $adult; ?> người lớn - <?php echo $child; ?> trẻ em</div>
                                        <div class="room-deposit">Đặt cọc và đảm bảo</div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="regular-price"><?php echo $regular_price; ?> VNĐ</div>
                                        <div class="sale-price"><?php echo $sale_price; ?> VNĐ</div>
                                        <button type="submit" class="single_add_to_cart_button button alt btn-select select-room" data-product_id="<?php echo $product->id; ?>">Lựa chọn</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <?php
                        endwhile;
                        ?>
                        </div>
                    </div>
                    <div class="choose-service" style="display:none;">
                        <h2 class="title">Lựa chọn dịch vụ tại Bamboo</h2>
                        <p class="description">Quý khách sẽ được đặt phòng ở mức giá tốt nhất do không phải qua đơn vị trung
                        gian: Quý khách đang ghé thăm trang web của khu nghỉ dưỡng.</p>
                        <div class=""></div>
                        <?php  
                        $args = array(
                            'post_type'      => 'product',
                            'posts_per_page' => -1,
                            'product_cat'    => 'dich-vu',
                            'post_status'    => 'publish'
                        );

                        $loop = new WP_Query( $args );

                        while ( $loop->have_posts() ) : $loop->the_post();
                            global $product;
                            $image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->id ), 'single-post-thumbnail' );
                            $regular_price = $product->get_regular_price();
                        ?>
                        <form class="cart" action="" method="post" enctype="multipart/form-data" data-product_id="<?php echo $product->id; ?>">
                            <div class="booking-service">
                                <div class="row">
                                    <div class="col-md-2">
                                        <img src="<?php  echo $image[0]; ?>" data-id="<?php echo $product->id; ?>">
                                        <input type="hidden" name="add-to-cart" value="<?php echo $product->id; ?>" />
                                        <input type="hidden" name="product_id" value="<?php echo $product->id; ?>" />
                                    </div>
                                    <div class="col-md-7">
                                        <div class="servive-name"><?php echo $product->get_title(); ?></div>
                                        <div class="servive-price"><?php echo $regular_price; ?> VNĐ</div>
                                        <div class="servive-quatity">
                                            <div class="increase">-</div>
                                            <div class="quatity"><input type="text" name="quantity" /></div>
                                            <div class="decrease">+</div>
                                        </div>
                                        <div class="description"><?php echo $product->get_short_description(); ?></div>
                                    </div>
                                    <div class="col-md-3 service-select">
                                        <button type="submit" class="single_add_to_cart_button button alt select-service">Lựa chọn</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <?php
                        endwhile;
                        ?>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="info-selected">
                        <h2 class="title">Lựa chọn của bạn</h2>
                        <div class="list-selected">
                        <?php if (!WC()->cart->is_empty()) : 
                            foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
                                $_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
                                $category_name = get_the_terms ( $_product->id, 'product_cat' )[0]->slug;
                                $_product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);
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
                                        <div class="gr-edit">
                                            <div class="price"><?php echo $_product->get_sale_price(); ?></div>
                                            <?php
                                            echo apply_filters('woocommerce_cart_item_remove_link', sprintf(
                                                '<a href="%s" class="remove remove_from_cart_button" aria-label="%s" data-product_id="%s" data-cart_item_key="%s" data-product_sku="%s" target="_blank"><i class="fa fa-times" aria-hidden="true"></i></a>',
                                                esc_url(wc_get_cart_remove_url($cart_item_key)),
                                                esc_html__('Remove this item', 'woocommerce'),
                                                esc_attr($_product_id),
                                                esc_attr($cart_item_key),
                                                esc_attr($_product->get_sku())
                                            ), $cart_item_key);
                                            ?>
                                        </div>
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
                                        <div class="gr-edit">
                                            <div class="price"><?php echo $_product->get_regular_price(); ?></div>
                                            <?php
                                            echo apply_filters('woocommerce_cart_item_remove_link', sprintf(
                                                '<a href="%s" class="remove remove_from_cart_button" aria-label="%s" data-product_id="%s" data-cart_item_key="%s" data-product_sku="%s" target="_blank"><i class="fa fa-times" aria-hidden="true"></i></a>',
                                                esc_url(wc_get_cart_remove_url($cart_item_key)),
                                                esc_html__('Remove this item', 'woocommerce'),
                                                esc_attr($_product_id),
                                                esc_attr($cart_item_key),
                                                esc_attr($_product->get_sku())
                                            ), $cart_item_key);
                                            ?>
                                        </div>
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
                    <a class="btn-booking" href="/booking/thanh-toan/">Đặt phòng</a>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
get_footer();