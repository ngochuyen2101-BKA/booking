
(function($) {
	
    $(document).on('click','.single_add_to_cart_button.select-room', function() {
        var date_checkin = $('.date-checkin').val();
        var date_checkout = $('.date-checkout').val();
        var adults = $('.number-adults').text();
        var childs = $('.number-childs').text();
        var product_id = $(this).data('product_id');
        var price = $(this).closest('.product-booking').find('.sale-price').text();
        var title = $(this).closest('.product-booking').find('.room-title').text();

        $.ajax({
            url: '/booking/wp-admin/admin-ajax.php',
            method: 'POST',
            data: {
                adult: adults,
                child: childs,
                date_checkin:date_checkin,
                date_checkout:date_checkout,
                product_id: product_id,
                action: 'custom_data_product'
            },
            success: function() {
                $('.choose-room').css('display','none');
                $('.choose-service').css('display','block');
                var html = '';
                html += '<div class="detail-selected">'
                html +=     '<div class="row">'
                html +=         '<div class="col-md-6 cart-info-label">'
                html +=             '<div class="title">'+title+'</div>'
                html +=                 '<div class="label">Nhận phòng</div>'
                html +=                 '<div class="label">Trả phòng</div>'
                html +=                 '<div class="label">Người lớn</div>'
                html +=                 '<div class="label">Trẻ em</div>'
                html +=             '</div>'
                html +=             '<div class="col-md-6 cart-item-info">' 
                html +=                 '<div class="price">'+price+'</div>' 
                html +=                 '<div class="info">'+date_checkin+'</div>' 
                html +=                 '<div class="info">'+date_checkout+'</div>' 
                html +=                 '<div class="info">'+adults+'</div>' 
                html +=                 '<div class="info">'+childs+'</div>'   
                html +=             '</div>'
                html +=         '</div>' 
                html +=      '</div>'
                html += '</div>'  
                $('.list-selected').prepend(html);
            },

        });
    });

    $(document).on('click','.single_add_to_cart_button.select-service', function() {
        var price = $(this).closest('.booking-service').find('.servive-price').text();
        var title = $(this).closest('.booking-service').find('.servive-name').text();

        var html = '';
        html += '<div class="detail-selected">'
        html +=     '<div class="row">'
        html +=         '<div class="col-md-6 cart-info-label">'
        html +=             '<div class="title">'+title+'</div>'
        html +=             '</div>'
        html +=             '<div class="col-md-6 cart-item-info">' 
        html +=                 '<div class="price">'+price+'</div>' 
        html +=             '</div>'
        html +=         '</div>' 
        html +=      '</div>'
        html += '</div>'  
        $('.list-selected').append(html);
    });

    $( document ).ready(function() {
        var prices = $('.list-selected').find('.price');
        var price = 0;
        prices.each(function( index ) {
            price += parseInt($(this).text());
        });
        $('.total-price').html(price + ' Đ');
    });
})(jQuery);
