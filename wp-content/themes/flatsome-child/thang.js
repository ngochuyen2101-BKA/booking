
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
        $('.loading').css('display','block');
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
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
                if($.isNumeric( res )) {
                    $('.detail-room').each(function() {
                        var id = $(this).data('product_id');
                        var current_child = $(this).find('.info-custom-child').html();
                        var current_adult = $(this).find('.info-custom-adult').html();

                        if(id == res && current_adult == adults && current_child == childs) {
                            var amount_new = parseInt($(this).find('.quantity').html()) + 1;
                            $(this).find('.quantity').html(amount_new);
                            var price_new = parseInt(price) * amount_new;
                            $(this).find('.price').html(price_new);
                            
                        }
                    });
                } else {
                    $('.choose-room').css('display','none');
                    $('.choose-service').css('display','block');
                    var html = '';
                    html += '<div class="detail-selected detail-room" data-product_id="'+product_id+'">'
                    html +=     '<div class="row">'
                    html +=         '<div class="col-md-6 cart-info-label">'
                    html +=             '<div class="title">'+title+'</div>'
                    html +=                 '<div class="label">Nhận phòng</div>'
                    html +=                 '<div class="label">Trả phòng</div>'
                    html +=                 '<div class="label">Người lớn</div>'
                    html +=                 '<div class="label">Trẻ em</div>'
                    html +=                 '<div class="label">Số lượng</div>'
                    html +=             '</div>'
                    html +=             '<div class="col-md-6 cart-item-info">' 
                    html +=                 '<div class="gr-edit">' 
                    html +=                     '<div class="price">'+price+'</div>'
                    html +=                      res
                    html +=                 '</div>' 
                    html +=                 '<div class="info">'+date_checkin+'</div>' 
                    html +=                 '<div class="info">'+date_checkout+'</div>' 
                    html +=                 '<div class="info info-custom-adult">'+adults+'</div>' 
                    html +=                 '<div class="info info-custom-child">'+childs+'</div>'
                    html +=                 '<div class="info quantity">1</div>'   
                    html +=             '</div>'
                    html +=         '</div>' 
                    html +=      '</div>'
                    html += '</div>'  
                    $('.room-gr').append(html);
                }
                
                updateTotalPrice();
                setBBCookie('step',2,864000);
                $('.choose-room').css('display','none');
                $('.choose-service').css('display','block');
                // location.reload();
                $('.step-1').find('.number-step').removeClass('active');
                $('.step-1').find('.text-step').removeClass('active');
                $('.step-2').find('.number-step').addClass('active');
                $('.step-2').find('.text-step').addClass('active');
                $('.loading').css('display','none');
            },

        });
        $('.room-gr').find('.remove_from_cart_button').first().css('display','none');
    });

    $(document).on('click','#addService', function() {
        var qty = $(this).closest('.booking-service').find('.service-number').val();
        var product_id = $(this).data('product_id');
        if(parseInt(qty) < 1) {
            $(this).prop('checked', false);
            return;
        }
        if ($(this).is(':checked')) {
            var btn_add = $(this).closest('.service-select').find('.single_add_to_cart_button');
            btn_add.click();
        } else {
            $(this).closest('.booking-service').find('.service-number').val(1);
            $('.remove_from_cart_button').each(function() {
                var cur_id = $(this).data('product_id');
                if(cur_id == product_id) {
                    $(this).click();
                    $(this).closest('.detail-selected').remove();
                }
            });
            setTimeout(function() { 
                setBBCookie('step',2,864000);
            }, 2000);
        }
    });

    $(document).on('click','.single_add_to_cart_button.select-service', function() {
        $('.loading').css('display','block');
        $('.popup-add').removeClass('active');
        var price = $(this).closest('.booking-service').find('.servive-price').text();
        var title = $(this).closest('.booking-service').find('.servive-name').text();
        var qty = $(this).closest('.booking-service').find('.qty').val();
        var total = parseInt(price)*qty;
        var product_id = $(this).data('product_id');
        var off = false;

        $('.detail-selected').each(function() {
            var cur_id = $(this).data('product_id');
            if(cur_id == product_id) {
                var new_qty = parseInt($(this).find('.qty-service').html()) + 1;
                $(this).find('.qty-service').html(new_qty);

                var new_price = parseInt($(this).find('.price').html()) + parseInt(price);
                $(this).find('.price').html(new_price);
                off = true;
                return ;
            }
        });
        if(off) {
            return;
        }

        setTimeout(function() { 
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                method: 'POST',
                data: {
                    product_id: product_id,
                    action: 'get_data_service'
                },
                success: function(res) {
                    if($.isNumeric( res )) {

                    } else {
                        var html = '';
                        html += '<div class="detail-selected" data-product_id="'+product_id+'">'
                        html +=     '<div class="row">'
                        html +=         '<div class="col-md-6 cart-info-label">'
                        html +=             '<div class="title">'+title+'</div>'
                        html +=             '<div class="label">Số lượng</div>'
                        html +=         '</div>'
                        html +=         '<div class="col-md-6 cart-item-info">' 
                        html +=             '<div class="gr-edit">' 
                        html +=                 '<div class="price">'+total+'</div>'
                        html +=                  res
                        html +=             '</div>'
                        html +=             '<div class="info quantity qty-service" data-product_id="'+product_id+'">'+qty+'</div>'
                        html +=         '</div>'
                        html +=     '</div>' 
                        html += '</div>'  
                        $('.service-gr').append(html);
                    }
                    
                    updateTotalPrice();
                    $('.loading').css('display','none');
                },
    
            });
        }, 1000);
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

    $(document).on('click','.remove_from_cart_button', function(e) {
        e.preventDefault();
        $(this).closest('.service-gr').remove();
        updateTotalPrice();
    });

    $(document).on('click','.add-btn', function() {
        var number_adult = $('#numberAdult').val();
        var number_child = $('#numberChild').val();
        $('.loading').css('display','block');
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            method: 'POST',
            data: {
                adult: number_adult,
                child: number_child,
                action: 'get_data_room'
            },
            success: function(res) {
                $('.number-adults').html(number_adult);
                $('.number-childs').html(number_child);
                $('.popup-add').removeClass('active');
                $('.choose-room').css('display','block');
                $('.choose-service').css('display','none');
                $('.list-room').html(res);
                setBBCookie('step',1,864000);
                $('.step-1').find('.number-step').addClass('active');
                $('.step-1').find('.text-step').addClass('active');
                $('.step-2').find('.number-step').removeClass('active');
                $('.step-2').find('.text-step').removeClass('active');
                $('.loading').css('display','none');
            },

        });
    });

    $(document).on('click','.btn-booking', function() {
        var step = getBBCookie('step');
        if(step == 2) {
            setBBCookie('step',1,864000);
        }
    });

    $(document).on('click','.increase', function() {
        var qty = $(this).closest('.servive-quatity').find('.qty').val();
        var newQty = parseInt(qty) + 1;
        
        var cur_checkbox = $(this).closest('.booking-service').find('.add-service');
        if(cur_checkbox.is(':checked')) {
            $(this).closest('.servive-quatity').find('.qty').val(1);
            var btn_add = $(this).closest('.booking-service').find('.single_add_to_cart_button');
            btn_add.click();
            updateTotalPrice();
        }
        $(this).closest('.servive-quatity').find('.qty').val(newQty);
    });

    $(document).on('click','.decrease', function() {
        var qty = $(this).closest('.servive-quatity').find('.qty').val();
        if(qty == 1) { return ; }
        var newQty = parseInt(qty) - 1;
        var cur_checkbox = $(this).closest('.booking-service').find('.add-service');
        var product_id = $(this).closest('.cart').data('product_id');
        if(cur_checkbox.is(':checked')) {
            $('.loading').css('display','block');
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                method: 'POST',
                data: {
                    qty: newQty,
                    product_id: product_id,
                    action: 'decrease_service'
                }
    
            });
            $('.loading').css('display','none');            
        }
        $(this).closest('.servive-quatity').find('.qty').val(newQty);
        $('.detail-selected').each(function() {
            var cur_id = $(this).data('product_id');
            if(cur_id == product_id) {
                var new_qty = parseInt($(this).find('.qty-service').html()) - 1;
                $(this).find('.qty-service').html(new_qty);

                var new_price = parseInt($(this).find('.price').html()) - parseInt(price);
                $(this).find('.price').html(new_price);
                off = true;
                return ;
            }
        });
        updateTotalPrice();
    });
    
    $(document).on('click','.remove_from_cart_button', function() {
        var qty_room = $('.detail-room').length;
        if(qty_room < 2) {
            setBBCookie('step',1,864000);
        }
    });

    function updateTotalPrice() {
        var prices = $('.list-selected').find('.price');
        var price = 0;
        prices.each(function( index ) {
            price += parseInt($(this).text());
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

    $('#condition').change(function () {
        if($(this).is(":checked")) {
            $('#place_order').prop('disabled', false);
        } else {
            $('#place_order').prop('disabled', true);
        }
     });

    $( document ).ready(function() {
        
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

        $('.qty-service').each(function( index ) {
            var qty = $(this).text();
            var productidCart = $(this).data('product_id');
            $('.service-number').each(function() {
                var productid = $(this).data('product_id');
                if(productidCart == productid){
                    $(this).val(qty);
                }
            });
            $('.add-service').each(function() {
                var productid = $(this).data('product_id');
                if(productidCart == productid){
                    $(this).prop("checked", true);
                }
            });
        });

        setTimeout(function() { 
            $('#place_order').prop('disabled', true);
        }, 5000);

        var current_url = window.location.href;
        if(current_url.indexOf("thanh-toan") > -1) {
            var room_qty = $('.room-selected').length;
            $('.room-number').html(room_qty);

            var qty_child = 0;
            $('.info-child').each(function() {
                var data = parseInt($(this).html());
                qty_child += data;
            });
            $('.number-childs').html(qty_child);

            var qty_adult = 0;
            $('.info-adult').each(function() {
                var data = parseInt($(this).html());
                qty_adult += data;
            });
            $('.number-adults').html(qty_adult);

            var checkin = $('.info-checkin:first').html();
            $('.date-checkin').html(checkin);

            var checkout = $('.info-checkout:first').html();
            $('.date-checkout').html(checkout);

        }
        
    });
})(jQuery);
