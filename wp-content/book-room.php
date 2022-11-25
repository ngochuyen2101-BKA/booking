<?php
$dien_tich = get_field("dien_tich");
$so_nguoi_lon = get_field("so_nguoi_lon");
$so_tre_em = get_field("so_tre_em");
$tien_nghi_khach_san = get_field('tien_nghi_khach_san');
$tinh_trang = get_field('tinh_trang');
$gia_goc = get_field('gia_goc');
$so_nguoi_toi_da = get_field('so_nguoi_toi_da');
global $product;
$attachment_ids = $product->get_gallery_image_ids();
?>

<section class="section sec-detail-room">
    <div class="bg section-bg fill bg-fill bg-loaded"></div>

    <div class="section-content relative">
        <div class='product-banner'>
            <img src="<?php echo wp_get_attachment_url($product->get_image_id()); ?>" />
        </div>
        <div class="row row-product-top">
            <div class="col large-5 thong-tin">
                <div class="col-inner">
                    <h3 class="product-title"><?php echo $product->get_title(); ?></h3>
                    <div class="main-info">
                        <div class="dien-tich"><b>Diện tích:</b> <?php echo $dien_tich; ?></div>
                        <div class="so-nguoi" data-nguoi-lon="<?php echo $so_nguoi_lon; ?>" data-tre-em="<?php echo $so_tre_em; ?>"><b>Tối đa:</b> <?php echo ($so_nguoi_lon) ? $so_nguoi_lon . " Người lớn " : "";
                                                        echo ($so_tre_em) ? " - " . $so_tre_em . " Trẻ em " : ""; ?></div>
                    </div>
                    <p class="product-short-des"><?php echo $product->post->post_excerpt; ?></p>
                    <p class="detail-room-price"><span class="gia-phong"><?php echo $product->get_price(); ?></span><span class="don-vi">VND / đêm</span></p>
<form action="" method="GET">
<div class="form-input ngay-den"><input type="date" class="datePickerPlaceHolder"placeholder="Nhận phòng" name="arrival"><span class="open-button"><button type="button"><i class="fas fa-caret-down"></i></button></span></div>
<div class="form-input ngay-di"><input type="date" class="datePickerPlaceHolder"placeholder="Trả phòng" name="departure"><span class="open-button"><button type="button"><i class="fas fa-caret-down"></i></button></span></div>
<div class="form-input nguoi-lon"><select name="adults1" class="select-adults"></select><span class="open-button"><button type="button"><i class="fas fa-caret-down"></i></button></span></div>
<div class="form-input tre-em"><select name="children1" class="select-child"></select><span class="open-button"><button type="button"><i class="fas fa-caret-down"></i></button></span></div>
<div class="form-input btn-submit <?php echo ($tinh_trang['value']=="hetphong") ? "het-phong" : "" ;?>"><button type="submit"  class="btn-booking-detail"><img src="/wp-content/uploads/2022/11/book-icon.png"><span><?php echo ($tinh_trang['value']=="hetphong") ? "Hết phòng" : "Đặt phòng ngay" ;?></span></button></div>
<div class="input-roomname"><input type="text" class="roomname" name="roomname" value="<?php echo $product->get_title(); ?>"></div>
</form>
                </div>
            </div>
            <div class="col large-6 tien-ich">
                <div class="col-inner">
                    <?php
                    if ($tien_nghi_khach_san) : ?>
                        <ul>
                            <?php foreach ($tien_nghi_khach_san as $tien_ich) : ?>
                                <li class="<?php echo $tien_ich['value']; ?>"><img src='/wp-content/uploads/2022/11/<?php echo $tien_ich['value']; ?>.png'><p><?php echo $tien_ich['label']; ?></p></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <div class="main-carousel">
            <?php
            foreach ($attachment_ids as $attachment_id) {
                $image_link = wp_get_attachment_url($attachment_id);
            ?>
                <div class="carousel-cell">
                    <div style="background-image:url(<?php echo  $image_link; ?>)"> </div>
                </div>
            <?php } ?>
        </div>
        <div class="row align-center row-product-botom">
            <div class="col large-8">
                <div class="col-inner">
                    <h2>Dịch vụ và Tiện ích</h2>
                    <ul class="room_covenient_services">
                        <li>Xe đưa đón khách tại sân bay</li>
                        <li>Dịch vụ hỗ trợ khách 24/24</li>
                        <li>Dịch vụ Lễ Tân 24/24</li>
                        <li>Dịch vụ phòng 24/24</li>
                        <li>Dịch vụ hỗ trợ kỹ thuật</li>
                        <li>Ngoại hối </li>
                        <li>Dịch vụ giặt ủi </li>
                        <li>Nhà hàng </li>
                        <li>Dịch vụ tiệc cưới</li>
                        <li>Trung tâm dịch vụ văn phòng </li>
                        <li>Bar hồ bơi và Bar sân thượng </li>
                        <li>Gym &amp; Bể bơi </li>
                        <li>Spa </li>
                        <li>Cho thuê xe</li>
                        <li>Dịch vụ Tour Du Lịch</li>
                    </ul>
                </div>
            </div>
            <div class="col large-12 share-col">
                <div class="col-inner">
                    <?php echo do_shortcode('[share title="Chia sẻ:"]'); ?>
                </div>
            </div>
        </div>
        <?php echo do_shortcode('[block id="san-pham-lien-quan"]'); ?>
        <script>
            jQuery("document").ready(function() {
                jQuery('.main-carousel').flickity({
                    // options
                    accessibility: true,
                    cellAlign: 'center',
                    pageDots: true,
                    wrapAround: true
                });
            });
        </script>
    </div>
</section>

</div>