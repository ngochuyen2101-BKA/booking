
(function($) {
	
    $(document).on('click','.single_add_to_cart_button.select-room', function() {
        $('.popup-add').removeClass('active');
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
            success: function(res) {
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
                html +=                 '<div class="gr-edit">' 
                html +=                     '<div class="price">'+price+'</div>'
                html +=                      res
                html +=                 '</div>' 
                html +=                 '<div class="info">'+date_checkin+'</div>' 
                html +=                 '<div class="info">'+date_checkout+'</div>' 
                html +=                 '<div class="info">'+adults+'</div>' 
                html +=                 '<div class="info">'+childs+'</div>'   
                html +=             '</div>'
                html +=         '</div>' 
                html +=      '</div>'
                html += '</div>'  
                $('.list-selected').prepend(html);
                updateTotalPrice();
                setBBCookie('step',2,864000);
                $('.step-1').find('.number-step').removeClass('active');
                $('.step-1').find('.text-step').removeClass('active');
                $('.step-2').find('.number-step').addClass('active');
                $('.step-2').find('.text-step').addClass('active');
            },

        });
    });

    $(document).on('click','.single_add_to_cart_button.select-service', function() {
        $('.popup-add').removeClass('active');
        var price = $(this).closest('.booking-service').find('.servive-price').text();
        var title = $(this).closest('.booking-service').find('.servive-name').text();
        var qty = $(this).closest('.booking-service').find('#qty').val();
        var total = parseInt(price)*qty;

        var html = '';
        html += '<div class="detail-selected">'
        html +=     '<div class="row">'
        html +=         '<div class="col-md-6 cart-info-label">'
        html +=             '<div class="title">'+title+'</div>'
        html +=             '</div>'
        html +=             '<div class="col-md-6 cart-item-info">' 
        html +=                 '<div class="price">'+total+'</div>' 
        html +=             '</div>'
        html +=         '</div>' 
        html +=      '</div>'
        html += '</div>'  
        $('.list-selected').append(html);
        updateTotalPrice();
    });

    $(document).on('click','.btn-show', function() {
        $('#numberAdult').val('');
        $('#numberChild').val('');
        if($('.popup-add').hasClass('active')) {
            $('.popup-add').removeClass('active');
        } else {
            $('.popup-add').addClass('active');
        }
    });

    $(document).on('click','.add-btn', function() {
        var number_adult = $('#numberAdult').val();
        var number_child = $('#numberChild').val();
        $.ajax({
            url: '/booking/wp-admin/admin-ajax.php',
            method: 'POST',
            data: {
                adult: number_adult,
                child: number_child,
                action: 'get_data_room'
            },
            success: function(res) {
                $('.popup-add').removeClass('active');
                $('.choose-room').css('display','block');
                $('.choose-service').css('display','none');
                $('.list-room').html(res);
                setBBCookie('step',1,864000);
                $('.step-1').find('.number-step').addClass('active');
                $('.step-1').find('.text-step').addClass('active');
                $('.step-2').find('.number-step').removeClass('active');
                $('.step-2').find('.text-step').removeClass('active');
            },

        });
    });

    $(document).on('click','.increase', function() {
        var qty = $(this).closest('.servive-quatity').find('#qty').val();
        var newQty = parseInt(qty) + 1;
        $(this).closest('.servive-quatity').find('#qty').val(newQty);
    });

    $(document).on('click','.decrease', function() {
        var qty = $(this).closest('.servive-quatity').find('#qty').val();
        var newQty = parseInt(qty) - 1;
        $(this).closest('.servive-quatity').find('#qty').val(newQty);
    });

    function updateTotalPrice() {
        var prices = $('.list-selected').find('.price');
        var price = 0;
        prices.each(function( index ) {
            var qty = $(this).closest('.cart-item-info').find('.quantity').text();
            if(qty) {
                price += ( parseInt($(this).text())*parseInt(qty) );
            } else {
            price += parseInt($(this).text());
            }
        });
        $('.total-price').html(price + ' Đ');
    }

    function setBBCookie(name, value, expireSeconds = 0) {
        var expires = '';
        if (expireSeconds > 0) {
            var today = new Date();
            var time = today.getTime();
            time += expireSeconds * 1000;
            today.setTime(time);
            expires = '; expires=' + today.toUTCString();
        }
        var cookie = [name, '=', JSON.stringify(value), expires, '; path=/;'].join('');
        document.cookie = cookie;
    }
    
    function getBBCookie(name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(decodeURIComponent(result[1].replace(/\+/g, '%20'))));
        return result;
    }

    $( document ).ready(function() {
        updateTotalPrice();
        var step = getBBCookie('step');
        if(step == 1 || step ==null) {
            $('.choose-room').css('display','block');
            $('.choose-service').css('display','none');
            $('.step-1').find('.number-step').addClass('active');
            $('.step-1').find('.text-step').addClass('active');
            $('.step-2').find('.number-step').removeClass('active');
            $('.step-2').find('.text-step').removeClass('active');
        } else {
            $('.choose-room').css('display','none');
            $('.choose-service').css('display','block');
            $('.step-1').find('.number-step').removeClass('active');
            $('.step-1').find('.text-step').removeClass('active');
            $('.step-2').find('.number-step').addClass('active');
            $('.step-2').find('.text-step').addClass('active');
        }
    });
})(jQuery);
