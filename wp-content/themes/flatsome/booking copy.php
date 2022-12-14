<?php 
/* Template Name: Booking Page */

get_header();
echo do_shortcode('[block id="banner"]');
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
                <img src="/wp-content/uploads/2022/11/Lich-icon.png"> Nhận phòng: <span><input type="date" class="date-checkin"><span class="open-button">
      <button type="button"><i class="fas fa-caret-down"></i></button>
    </span></span>
            </div>
            <div class="check-out info">
                <img src="/wp-content/uploads/2022/11/Lich-icon.png"> Trả phòng: <span><input type="date" class="date-checkout"><span class="open-button">
      <button type="button"><i class="fas fa-caret-down"></i></button>
    </span></span>
            </div>
            <div class="number-of-date info">
                <img src="/wp-content/uploads/2022/11/Artboard130.png"></i> <span class="room-number" style="display: none;">1</span><span class="room-number-cal">0</span> phòng
            </div>
            <div class="number-of-customer info">
                <img src="/wp-content/uploads/2022/11/Icon-feather-us.png"> <span class="number-adults" style="display: none;">1</span><span class="number-adults-cal"">1</span> người lớn - <span class="number-childs" style="display: none;">1</span><span class="number-childs-cal"">1</span> trẻ em
            </div>
            <div class="add-room">
                <p class="btn-show">Thêm phòng</p>
                <div class="popup-add">
                    <div class="adults">
                        <div class="label">Người lớn</div>
                        <input type="number" id="numberAdult" value="1">
                    </div>
                    <div class="childs">
                        <div class="label">Trẻ em</div>
                        <input type="number" id="numberChild" value="1">
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
                        <p class="description">Quý khách sẽ được đặt phòng ở mức giá tốt nhất do không phải qua đơn vị trung gian:<br>
                        Quý khách đang ghé thăm trang web của khu nghỉ dưỡng</p>
                        <div class="list-room">
                        <?php  
                        $args = array(
                            'post_type'      => 'product',
                            'posts_per_page' => -1,
                            'product_cat'    => 'hang-phong',
                            'post_status'    => 'publish'
                        );

                        $loop = new WP_Query( $args );
                        $i = 1;
                        while ( $loop->have_posts() ) : $loop->the_post();
                            
                            global $product;
                            $room_status = get_field('tinh_trang', $product->id)['value'];
                            if($room_status == 'hetphong') continue;
                            $image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->id ), 'single-post-thumbnail' );
                            $area = $product->get_attribute( 'area' );
                            $adult = get_field('so_nguoi_lon', $product->id);
                            $child = get_field('so_tre_em', $product->id);
                            $date = $product->get_attribute( 'number-of-date' );
                            $regular_price = $product->get_regular_price();
                            $sale_price = $product->get_sale_price();

                            $attachment_ids = $product->get_gallery_image_ids();
                            
                        ?>
                        <div class="cart" data-product_id="<?php echo $product->id; ?>">
                            <div class="product-booking">
                                <div class="slideshow-container">
                                    <?php 
                                        foreach( $attachment_ids as $attachment_id ) {
                                        $image_link = wp_get_attachment_url( $attachment_id );
                                     ?>
                                    <div class="mySlides fade slide-room<?php echo $i; ?>">
                                        <img src="<?php echo $image_link; ?>" style="width:100%">
                                    </div>
                                    
                                    <?php  } ?>
                                    <a class="prev" onclick="plusSlides(-1,<?php echo $i; ?>)">❮</a>
                                    <a class="next" onclick="plusSlides(1,<?php echo $i; ?>)">❯</a>
                                    <?php   $i++;  ?>
                                </div>
                                <input type="hidden" name="add-to-cart" value="<?php echo $product->id; ?>" />
                                <input type="hidden" name="product_id" value="<?php echo $product->id; ?>" />
                                <input type="hidden" name="quantity" value="1" />
                                <div class="room-title">
                                    <?php echo $product->get_title(); ?>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="room-area"><img src="/wp-content/uploads/2022/11/dien-tich.svg" width="20px" height="20px">Diện tích: <?php echo $area; ?></div>
                                        <div class="room-change"><img src="/wp-content/uploads/2022/11/huy.svg" width="20px" height="20px">Không hủy và thay đổi</div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="room-user"><img src="/wp-content/uploads/2022/11/nguoi.svg" width="20px" height="20px"><?php echo $adult; ?> người lớn - <?php echo $child; ?> trẻ em</div>
                                        <div class="room-deposit"><img src="/wp-content/uploads/2022/11/coc.svg" width="20px" height="20px">Đặt cọc và đảm bảo</div>
                                    </div>
                                    <div class="col-md-4 price-col <?php echo ($regular_price) ? 'has-sale-price' : ''; ?>">
                                        <div class="regular-price"><?php echo number_format($regular_price); ?> VNĐ</div>
                                        <div class="sale-price"><?php echo number_format($sale_price); ?> VNĐ</div>
                                        <button type="submit" class="button alt btn-select select-room" data-product_id="<?php echo $product->id; ?>">Lựa chọn</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        <div class="servive-price-quatity-box">
                                            <div class="servive-price-box"><span class="servive-price"><?php echo $regular_price; ?></span>VNĐ<p class="xct-dv">Chi tiết <i class="fas fa-caret-right"></i></p></div>
                                            <div class="servive-quatity">
                                                <div class="decrease">-</div>
                                                <div class="quatity"><input type="number" name="quantity" value="1" class="qty service-number" data-product_id="<?php echo $product->id; ?>" readonly/></div>
                                                <div class="increase">+</div>
                                            </div>
                                        </div>
                                        <div class="description description-service"><?php echo $product->get_short_description(); ?></div>
                                    </div>
                                    <div class="col-md-3 service-select">
                                        <button type="submit" class="single_add_to_cart_button button alt select-service" style="display:none;" data-product_id="<?php echo $product->id; ?>">Lựa chọn</button>
                                        <input type="checkbox" id="addService<?php echo $product->id; ?>" name="addService" class="add-service" data-product_id="<?php echo $product->id; ?>">
                                        <label for="addService<?php echo $product->id; ?>">Lựa chọn</label>
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
                            <div class="room-gr">
                        <?php if (!WC()->cart->is_empty()) : 
                            
                            foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
                                $_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
                                $category_name = get_the_terms ( $_product->id, 'product_cat' )[0]->slug;
                                $_product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);
                                $price_sale = $_product->get_sale_price();
                                $price_real = $_product->get_regular_price();
                                $qty = $cart_item['quantity'];

                                // $checkin = strtotime($cart_item['customData']['custom_date_checkin']);
                                // $checkout = strtotime($cart_item['customData']['custom_date_checkout']);
                                // $datediff = round(($checkout - $checkin) / (60 * 60 * 24) );
                                
                                if($price_sale) {
                                    $total = $price_sale*$qty;
                                } else {
                                    $total = $price_real*$qty;
                                }
                                if($category_name == 'hang-phong') {
                        ?>
                            <div class="detail-selected detail-room" data-product_id="<?php echo $_product_id; ?>">
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
                                        <div class="gr-edit">
                                            <div class="price"><?php echo $total; ?> VNĐ</div>
                                            
                                        </div>
                                        <div class="info info-date-checkin"><?php echo $cart_item['customData']['custom_date_checkin']; ?></div>
                                        <div class="info info-date-checkout"><?php echo $cart_item['customData']['custom_date_checkout']; ?></div>
                                        <div class="info info-custom-adult"><?php echo $cart_item['customData']['custom_adult']; ?></div>
                                        <div class="info info-custom-child"><?php echo $cart_item['customData']['custom_child']; ?></div>
                                        <div class="info quantity"><span><?php echo $cart_item['quantity']; ?></span><?php
                                            
                                                echo apply_filters('woocommerce_cart_item_remove_link', sprintf(
                                                    '<a href="%s" class="remove remove_from_cart_button" aria-label="%s" data-product_id="%s" data-cart_item_key="%s" data-product_sku="%s" target="_blank"><i class="fa fa-times" aria-hidden="true"></i></a>',
                                                    esc_url(wc_get_cart_remove_url($cart_item_key)),
                                                    esc_html__('Remove this item', 'woocommerce'),
                                                    esc_attr($_product_id),
                                                    esc_attr($cart_item_key),
                                                    esc_attr($_product->get_sku())
                                                ), $cart_item_key);
                                            ?></div>
                                    </div>
                                </div>
                            </div>
                        <?php 
                                } 
                            }
                        endif; ?>
                            </div>
                            <div class="service-gr">
                        <?php if (!WC()->cart->is_empty()) : 
                            foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
                                $_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
                                $category_name = get_the_terms ( $_product->id, 'product_cat' )[0]->slug;
                                $_product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);
                                $price_sale = $_product->get_sale_price();
                                $price_real = $_product->get_regular_price();
                                $qty = $cart_item['quantity'];
                                if($price_sale) {
                                    $total = $price_sale*$qty;
                                } else {
                                    $total = $price_real*$qty;
                                }
                                if($category_name == 'dich-vu') {
                        ?>
                            <div class="detail-selected" data-product_id="<?php echo $_product_id; ?>">
                                <div class="row">
                                    <div class="col-md-6 cart-info-label">
                                        <div class="title"><?php echo $_product->get_title(); ?></div>
                                        <div class="label">Số lượng</div>
                                    </div>
                                    <div class="col-md-6 cart-item-info">
                                        <div class="gr-edit">
                                            <div class="price"><?php echo $total; ?> VNĐ</div>
                                            
                                        </div>
                                        <div class="info quantity qty-service" data-product_id="<?php echo $_product_id; ?>"><span><?php echo $cart_item['quantity']; ?></span>
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
                        </div>
                        <div class="total">
                            <p class="label">Tổng</p>
                            <p class="total-price"><?php echo WC()->cart->cart_contents_total; ?></p>
                        </div>
                    </div>
                    <a class="btn-booking" href="/thanh-toan/">Đặt phòng</a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="loading-wait" style="display: none ;">Loading</div>
<script>
let slideIndex = 1;
showSlides(slideIndex,0);

function plusSlides(n, seq) {
    showSlides(slideIndex += n,seq);
}

function showSlides(n, seq) {
    var $ = jQuery;
    let i; 
    let slide_num = <?php echo $i ?>;
    if(seq == 0) {
        for (j = 1; j < slide_num; j++) {
            let slides = $(".slide-room"+j);
            if (n > slides.length) {slideIndex = 1}    
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides.css('display','none');  
            }
            $(".slide-room"+j).first().css('display','block'); 
        }
    } else {
        let slidesDiff = $(".slide-room"+seq);
        if (n > slidesDiff.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slidesDiff.length}
        for (i = 0; i < slidesDiff.length; i++) {
            slidesDiff.css('display','none');  
        }
        var selector = ".slide-room"+seq+':nth-child('+slideIndex+')';
        $(selector).css('display','block'); 
    }
   
}
</script>
<?php
get_footer();