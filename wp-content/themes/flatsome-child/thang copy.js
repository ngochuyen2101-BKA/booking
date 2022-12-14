
(function($) {
	var isloading = false;    
    $(document).on('click','.select-room', function() {
        $('.popup-add').removeClass('active');
        var date_checkin = $('.date-checkin').val();
        var date_checkout = $('.date-checkout').val();

        // var format_checkin = new Date(date_checkin);
        // var format_checkout = new Date(date_checkout);
        // var difference_in_iime = format_checkout.getTime() - format_checkin.getTime();
        // var total_day = difference_in_iime / (1000 * 3600 * 24);
        
        var adults = $('.number-adults').text();
        var childs = $('.number-childs').text();
        var product_id = $(this).data('product_id');
        var price = $(this).closest('.product-booking').find('.sale-price').text();
        price = parseInt(price.replace(/,/g, ''));
        var title = $(this).closest('.product-booking').find('.room-title').text();
        if(!isloading) {
            isloading = true;
            $('.loading-wait').css('display','block');
        }
        
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
                console.log('adults:'+adults+'childs:'+childs+'date_checkin:'+date_checkin+'date_checkout:'+date_checkout)
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
                    html +=                 '<div class="label">Nh???n ph??ng</div>'
                    html +=                 '<div class="label">Tr??? ph??ng</div>'
                    html +=                 '<div class="label">Ng?????i l???n</div>'
                    html +=                 '<div class="label">Tr??? em</div>'
                    html +=                 '<div class="label">S??? l?????ng</div>'
                    html +=             '</div>'
                    html +=             '<div class="col-md-6 cart-item-info">' 
                    html +=                 '<div class="gr-edit">' 
                    html +=                     '<div class="price">'+price+'</div>'
                    html +=                      res
                    html +=                 '</div>' 
                    html +=                 '<div class="info info-date-checkin">'+date_checkin+'</div>' 
                    html +=                 '<div class="info info-date-checkout">'+date_checkout+'</div>' 
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
                $('.loading-wait').css('display','none');
                isloading = false;
                checkBtnRemove();
                countRoomAndCustomer();
            },

        });
        
    });

    $(document).on('click','.add-service', function() {
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
        if(!isloading) {
            isloading = true;
            $('.loading-wait').css('display','block');
        }
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
            setTimeout(function() { 
                $('.loading-wait').css('display','none');  
                isloading = false;
            }, 1000);
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
                        html +=             '<div class="label">S??? l?????ng</div>'
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
                    $('.loading-wait').css('display','none');
                    isloading = false;
                },
    
            });
        }, 2000);
    });

    $(document).on('click','.btn-show', function() {
        $('#numberAdult').val(1);
        $('#numberChild').val(1);
        if($('.popup-add').hasClass('active')) {
            $('.popup-add').removeClass('active');
        } else {
            $('.popup-add').addClass('active');
        }
    });

    $(document).on('click','.remove_from_cart_button', function(e) {
        e.preventDefault();
        var product_id = $(this).closest('.detail-selected').data('product_id');
        $('.add-service').each(function() {
            var cur_id = $(this).data('product_id');
            if(cur_id == product_id) {
                $(this).prop('checked', false);
            }
        });
        $(this).closest('.detail-selected').remove();
        updateTotalPrice();
        checkBtnRemove();
        countRoomAndCustomer();
    });

    $(document).on('click','.add-btn', function() {
        var number_adult = $('#numberAdult').val();
        var number_child = $('#numberChild').val();
        if(number_adult == "") {
            number_adult = 1;
        }
        if(number_child == "") {
            number_child = 0;
        }
        if(!isloading) {
            isloading = true;
            $('.loading-wait').css('display','block');
        }
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            method: 'POST',
            data: {
                adult: number_adult,
                child: number_child,
                action: 'get_data_room'
            },
            success: function(res) {
                if(res.substr(res.length-1, 1) == '0') {
                    res = res.substr(0, res.length-1);
                }
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
                $('.loading-wait').css('display','none');
                isloading = false;
                showSlides(slideIndex,0);
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
            if(!isloading) {
                isloading = true;
                $('.loading-wait').css('display','block');
            }
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                method: 'POST',
                data: {
                    qty: newQty,
                    product_id: product_id,
                    action: 'decrease_service'
                }
    
            });
            setTimeout(function() { 
                $('.loading-wait').css('display','none');  
                isloading = false;
            }, 1000);
                      
        }
        var price = $(this).closest('.booking-service').find('.servive-price').html();
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
            price += parseInt($(this).text().replace(/,/g, ''));
        });
        $('.total-price').html(price + ' VN??');
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
     function checkBtnRemove() {
        var count_room = $('.room-gr').find('.remove_from_cart_button').length;
        if(count_room == 1) {
            $('.room-gr').find('.remove_from_cart_button').first().css('display','none');
        } else {
            $('.room-gr').find('.remove_from_cart_button').css('display','block');
        }
     }

     function countRoomAndCustomer() {
        var total_room = 0;
        $('.room-gr .quantity').each(function() {
            total_room += parseInt($(this).html());
        });
        $('.room-number-cal').html(total_room);
        var count = 0;
        var total_adult = 0;
        $('.list-selected .info-custom-adult').each(function() {
            count = $(this).closest('.detail-room').find('.quantity');
            total_adult += parseInt($(this).html()) * parseInt(count);
        });
        $('.number-adults-cal').html(total_adult);
        var total_child = 0;
        $('.list-selected .info-custom-child').each(function() {
            count = $(this).closest('.detail-room').find('.quantity');
            total_child += parseInt($(this).html())  * parseInt(count);
        });
        $('.number-childs-cal').html(total_child);
     }

     $(window).on('onbeforeunload ', function(event) {
        alert("pop");
       });

    $( document ).ready(function() {

        checkBtnRemove();

        var today = new Date();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var year = today.getFullYear();
        var date = year + '-' + month + '-' + day;
        $('.date-checkin').attr('min', date);
        $('.date-checkout').attr('min', date);

        var current_url = window.location.href;
        if(current_url.indexOf("/booking-page") > -1) {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars[hash[0]] = hash[1];
            }
            var total_cus = parseInt(vars['adults1']) + parseInt(vars['children1']);
            $('.date-checkin').val(vars['arrival']);
            $('.date-checkout').val(vars['departure']);
            $('.number-adults').html(vars['adults1']);
            $('.number-adults-cal').html(vars['adults1']);
            $('.number-childs').html(vars['children1']);
            $('.number-childs-cal').html(vars['children1']);
        }
        
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
            $('.date-checkin').val(checkin);

            var checkout = $('.info-checkout:first').html();
            $('.date-checkout').val(checkout);

        }
        if(current_url.indexOf("booking-page") > -1) {
            var number_adult = $('.number-adults').text();
            var number_child = $('.number-childs').text();
            if(number_adult == "") {
                number_adult = 1;
            }
            if(number_child == "") {
                number_child = 0;
            }
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                method: 'POST',
                data: {
                    adult: number_adult,
                    child: number_child,
                    action: 'get_data_room'
                },
                success: function(res) {
                    if(res.substr(res.length-1, 1) == '0') {
                        res = res.substr(0, res.length-1);
                    }
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
                    $('.loading-wait').css('display','none');
                    isloading = false;
                    showSlides(slideIndex,0);
                },

            });
        }
        if( !( (current_url.indexOf("thanh-toan") > -1) || (current_url.indexOf("booking-page") > -1) ) ) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                method: 'POST',
                data: {
                    action: 'remove_cart'
                }
            });
        }
        
    });
})(jQuery);
