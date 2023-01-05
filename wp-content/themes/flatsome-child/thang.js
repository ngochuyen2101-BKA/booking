(function($) {
	var isloading = false;    
    $(document).on('click','.select-room', function() {
        var count_empty_room = $('.room-empty').length;
        if(!count_empty_room) {
            return ;
        }
        var date_checkin = $('.date-checkin').val();
        var date_checkout = $('.date-checkout').val();

        var format_checkin = new Date(date_checkin);
        var format_checkout = new Date(date_checkout);
        var difference_in_iime = format_checkout.getTime() - format_checkin.getTime();
        var total_day = parseInt(difference_in_iime / (1000 * 3600 * 24));

        var current_url = window.location.href;
        var urlParams = new URLSearchParams(window.location.search);
        
        if( (current_url.indexOf("booking-page") > -1 && !(urlParams.toString()) && !(date_checkin && date_checkout)) || date_checkin == date_checkout) {
            return ;
        }

        $('.popup-add').removeClass('active');
        
        var adults = parseInt($('.number-adults').text());
        var childs = parseInt($('.number-childs').text());
        childs = isNaN(childs) ? 0 : childs;

        var standard = $(this).closest('.product-booking').find('.room-user').data('standard');
        var selectedRoom = parseInt(getBBCookie('selectedRoom'));
        var nextRoom = selectedRoom + 1;
        var cur_filter = $('.filter-gr').eq(selectedRoom-1).find('.select-child-num');
        var count5 = 0;
        var count10 = 0;
        var count11 = 0;
        cur_filter.each(function() {
            var child_age = parseInt($(this).val());
            if(child_age <= 5) {
                count5++;
            } else if(child_age > 5 && child_age <=10) {
                count10++;
            } else {
                count11++;
            }
        })

        // var customer_amout = $(this).closest('.product-booking').find('.room-user');
        // var adults_amount = parseInt(customer_amout.data('number-adult'));
        // var childs_amount = parseInt(customer_amout.data('number-child'));
        // childs_amount = isNaN(childs_amount) ? 0 : childs_amount;

        var diff = adults + count11 - standard;
        diff = diff > 0 ? diff : 0;

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
                count5: count5,
                count10: count10,
                count11: count11,
                date_checkin:date_checkin,
                date_checkout:date_checkout,
                product_id: product_id,
                standard: standard,
                action: 'custom_data_product'
            },
            success: function(res) {
                $('.room-empty').first().remove();
                setBBCookie('selectedRoom',nextRoom,864000);
                var count_room_empty = $('.room-empty').length;
                
                // if($.isNumeric( res )) {
                //     $('.detail-room').each(function() {
                //         var id = $(this).data('product_id');
                //         var current_child = $(this).find('.info-custom-child').html();
                //         var current_adult = $(this).find('.info-custom-adult').html();

                //         if(id == res && current_adult == adults && current_child == childs) {
                //             var amount_new = parseInt($(this).find('.quantity').html()) + 1;
                //             $(this).find('.quantity').html(amount_new);
                //             var price_new = parseInt(price) * amount_new;
                //             $(this).find('.price').html(price_new.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                            
                //         }
                //     });
                // } else {
                    var html = '';
                    var ngoac = "'";
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
                    html +=                 '<div class="price-gr"><span class="price">'+price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'</span> VNĐ</div>'
                    html +=                 '<div class="info info-date-checkin">'+moment(date_checkin).format('DD/MM/YYYY')+'</div>' 
                    html +=                 '<div class="info info-date-checkout">'+moment(date_checkout).format('DD/MM/YYYY')+'</div>' 
                    html +=                 '<div class="info info-custom-adult">'+adults+'</div>' 
                    html +=                 '<div class="info info-custom-child">'+childs+'</div>'
                    html +=                 '<div class="info info-custom-child5" style="display:none">'+count5+'</div>'
                    html +=                 '<div class="info info-custom-child10" style="display:none">'+count10+'</div>'
                    html +=                 '<div class="info info-custom-child11" style="display:none">'+count11+'</div>'
                    html +=                 '<div class="info info-standard" style="display:none">'+standard+'</div>'
                    html +=                 '<div class="gr-edit">' 
                    html +=                 '<div><div class="info quantity">1</div><span> phòng / </span><span class="quatity-date">'+total_day+'</span><span> đêm</span></div>'
                    html +=                      res
                    html +=                 '</div>' 
                    html +=             '</div>'
                    html +=         '</div>' 
                    html +=      '</div>'
                    html += '</div>'
					html += '<script>'
					html += 'jQuery("document").ready(function(){jQuery(".detail-room[data-product_id='+ngoac+product_id+ngoac+'] .price-gr").css("height",jQuery(".detail-room[data-product_id='+ngoac+product_id+ngoac+'] .title").height()+"px");});'
					html += '</script>'  
                    $('.room-gr').append(html);
                // }
                if(count_room_empty > 0) {
                    $('.add-btn').click();
                }
                var hasBed = false;
                $('.service-gr .title').each(function() {
                    if($(this).text() == "Giường Phụ") {
                        hasBed = true;
                    }
                });
                if(diff > 0) {
                    if( !hasBed ) {
                        var total_bed = 600000 * diff * total_day;
                        var html = '';
                        var ngoac = "'";
                        html += '<div class="detail-selected detail-selected-service" data-product_id="1738">'
                        html +=     '<div class="row">'
                        html +=         '<div class="col-md-6 cart-info-label">'
                        html +=             '<div class="title">Giường Phụ</div>'
                        html +=             '<div class="label">Số lượng</div>'
                        html +=         '</div>'
                        html +=         '<div class="col-md-6 cart-item-info">' 
                        html +=             '<div class="price-gr"><span class="price">'+total_bed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'</span> VNĐ</div>'
                        html +=             '<div class="gr-edit giuong-phu-quantity">' 
                        html +=             '<div class="info quantity qty-service" data-product_id="1738">'+diff+'</div>giường/<span class="quatity-date">'+total_day+'</span><span> đêm</span>'
                        html +=             '</div>'
                        html +=         '</div>'
                        html +=     '</div>' 
                        html += '</div>'
                        html += '<script>'
                        html += 'jQuery("document").ready(function(){jQuery(".detail-selected-service[data-product_id='+ngoac+1738+ngoac+'] .price-gr").css("height",jQuery(".detail-selected-service[data-product_id='+ngoac+1738+ngoac+'] .title").height()+"px");});'
                        html += '</script>'
                        $('.service-gr').append(html);
                    } else {
                        $('.qty-service').each(function() {
                            if($(this).data('product_id') == 1738) {
                                var qty = parseInt($(this).html());
                                $(this).html(qty + diff);
                                var total = ( 600000 * (qty + diff) * total_day ).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                                $(this).closest('.cart-item-info').find('.price').html(total);
                            }
                        })
                    }
                    $('.message-notice').css('display','block');
                    setTimeout(function() { 
                        $(".message-notice").hide();
                    }, 4000);
                }
                
                updateTotalPrice();
                if(count_room_empty == 0) {
                    setBBCookie('step',2,864000);
                    $('.choose-room').css('display','none');
                    $('.choose-service').css('display','block');
                    $('.step-1').find('.number-step').removeClass('active');
                    $('.step-1').find('.text-step').removeClass('active');
                    $('.step-2').find('.number-step').addClass('active');
                    $('.step-2').find('.text-step').addClass('active');
                }
                
                $('.loading-wait').css('display','none');
                isloading = false;
                checkBtnRemove();
                countRoomAndCustomer();
                
                var saveFilter = JSON.parse(getBBCookie('saveFilter'));
                saveFilter[selectedRoom - 1]['room'] = title;
                setBBCookie('saveFilter',JSON.stringify(saveFilter),864000);
            },

        });
        jQuery('html, body').animate({scrollTop: '200px'}, 0);
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
        var price = $(this).closest('.booking-service').find('.servive-price').text().replace(/,/g, '');
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

                var new_price = parseInt($(this).find('.price').html().replace(/,/g, '')) + parseInt(price);
                $(this).find('.price').html(new_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
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
						var ngoac = "'";
                        html += '<div class="detail-selected detail-selected-service" data-product_id="'+product_id+'">'
                        html +=     '<div class="row">'
                        html +=         '<div class="col-md-6 cart-info-label">'
                        html +=             '<div class="title">'+title+'</div>'
                        html +=             '<div class="label">Số lượng</div>'
                        html +=         '</div>'
                        html +=         '<div class="col-md-6 cart-item-info">' 
						html +=             '<div class="price-gr"><span class="price">'+total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'</span> VNĐ</div>'
                        html +=             '<div class="gr-edit">' 
                        html +=             '<div class="info quantity qty-service" data-product_id="'+product_id+'">'+qty+'</div>'
                        html +=                  res
                        html +=             '</div>'
                        html +=         '</div>'
                        html +=     '</div>' 
                        html += '</div>'
						html += '<script>'
					html += 'jQuery("document").ready(function(){jQuery(".detail-selected-service[data-product_id='+ngoac+product_id+ngoac+'] .price-gr").css("height",jQuery(".detail-selected-service[data-product_id='+ngoac+product_id+ngoac+'] .title").height()+"px");});'
					html += '</script>'
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
        generateFIlter();
    });

    function generateFIlter() {
        var saveFilter = JSON.parse(getBBCookie('saveFilter'));
        if(saveFilter) {
            var html = '';
            $.each(saveFilter, function(index) {
                
                html += '<div class="filter-gr">'
                html +=     '<div class="number-room" data-number-room="'+(index+1)+'">Phòng '+(index+1)+'</div>'
                html +=     '<div class="adults">'
                html +=         '<div class="label">Người lớn</div>'
                html +=         '<select class="numberAdult">'
                html +=             '<option value="1" '+ ( $(this)[0].cur_adult == 1 ? 'selected' : '' ) +'>1</option>'
                html +=             '<option value="2" '+ ( $(this)[0].cur_adult == 2 ? 'selected' : '' ) +'>2</option>'
                html +=             '<option value="3" '+ ( $(this)[0].cur_adult == 3 ? 'selected' : '' ) +'>3</option>'
                html +=             '<option value="4" '+ ( $(this)[0].cur_adult == 4 ? 'selected' : '' ) +'>4</option>'
                html +=         '</select>'
                html +=     '</div>'
                html +=     '<div class="childs">'
                html +=         '<div class="label">Trẻ em</div>'
                html +=         '<select class="numberChild">'
                html +=             '<option value="0" '+ ( $(this)[0].cur_child == 0 ? 'selected' : '' ) +'>0</option>'
                html +=             '<option value="1" '+ ( $(this)[0].cur_child == 1 ? 'selected' : '' ) +'>1</option>'
                html +=             '<option value="2" '+ ( $(this)[0].cur_child == 2 ? 'selected' : '' ) +'>2</option>'
                html +=             '<option value="3" '+ ( $(this)[0].cur_child == 3 ? 'selected' : '' ) +'>3</option>'
                html +=         '</select>'
                html +=     '</div>'
                html +=     '<div class="text-filter" style="display: '+($(this)[0].cur_child != 0 ? 'block' : 'none')+';">Tuổi của trẻ</div>'
                html +=     '<div class="filter-child">'
                if($(this)[0].cur_child != 0) {
                    if($(this)[0].count5.count5 != 0) {
                        for(var i = 1; i <= $(this)[0].count5.count5; i++) {
                            html += '<select class="select-child-num">'
                            html +=     '<option value="0" '+ ( $(this)[0].count5['count5'+i] == 0 ? 'selected' : '' ) +'>0</option>'
                            html +=     '<option value="1" '+ ( $(this)[0].count5['count5'+i] == 1 ? 'selected' : '' ) +'>1</option>'
                            html +=     '<option value="2" '+ ( $(this)[0].count5['count5'+i] == 2 ? 'selected' : '' ) +'>2</option>'
                            html +=     '<option value="3" '+ ( $(this)[0].count5['count5'+i] == 3 ? 'selected' : '' ) +'>3</option>'
                            html +=     '<option value="4" '+ ( $(this)[0].count5['count5'+i] == 4 ? 'selected' : '' ) +'>5</option>'
                            html +=     '<option value="5" '+ ( $(this)[0].count5['count5'+i] == 5 ? 'selected' : '' ) +'>5</option>'
                            html +=     '<option value="6" '+ ( $(this)[0].count5['count5'+i] == 6 ? 'selected' : '' ) +'>6</option>'
                            html +=     '<option value="7" '+ ( $(this)[0].count5['count5'+i] == 7 ? 'selected' : '' ) +'>7</option>'
                            html +=     '<option value="8" '+ ( $(this)[0].count5['count5'+i] == 8 ? 'selected' : '' ) +'>8</option>'
                            html +=     '<option value="9" '+ ( $(this)[0].count5['count5'+i] == 9 ? 'selected' : '' ) +'>9</option>'
                            html +=     '<option value="10" '+ ( $(this)[0].count5['count5'+i] == 10 ? 'selected' : '' ) +'>10</option>'
                            html +=     '<option value="11" '+ ( $(this)[0].count5['count5'+i] == 11 ? 'selected' : '' ) +'>11</option>'
                            html += '</select>'
                        }
                    }
                    if($(this)[0].count10.count10 != 0) {
                        for(var i = 1; i <= $(this)[0].count10.count10; i++) {
                            html += '<select class="select-child-num">'
                            html +=     '<option value="0" '+ ( $(this)[0].count10['count10'+i] == 0 ? 'selected' : '' ) +'>0</option>'
                            html +=     '<option value="1" '+ ( $(this)[0].count10['count10'+i] == 1 ? 'selected' : '' ) +'>1</option>'
                            html +=     '<option value="2" '+ ( $(this)[0].count10['count10'+i] == 2 ? 'selected' : '' ) +'>2</option>'
                            html +=     '<option value="3" '+ ( $(this)[0].count10['count10'+i] == 3 ? 'selected' : '' ) +'>3</option>'
                            html +=     '<option value="4" '+ ( $(this)[0].count10['count10'+i] == 4 ? 'selected' : '' ) +'>5</option>'
                            html +=     '<option value="5" '+ ( $(this)[0].count10['count10'+i] == 5 ? 'selected' : '' ) +'>5</option>'
                            html +=     '<option value="6" '+ ( $(this)[0].count10['count10'+i] == 6 ? 'selected' : '' ) +'>6</option>'
                            html +=     '<option value="7" '+ ( $(this)[0].count10['count10'+i] == 7 ? 'selected' : '' ) +'>7</option>'
                            html +=     '<option value="8" '+ ( $(this)[0].count10['count10'+i] == 8 ? 'selected' : '' ) +'>8</option>'
                            html +=     '<option value="9" '+ ( $(this)[0].count10['count10'+i] == 9 ? 'selected' : '' ) +'>9</option>'
                            html +=     '<option value="10" '+ ( $(this)[0].count10['count10'+i] == 10 ? 'selected' : '' ) +'>10</option>'
                            html +=     '<option value="11" '+ ( $(this)[0].count10['count10'+i] == 11 ? 'selected' : '' ) +'>11</option>'
                            html += '</select>'
                        }
                    }
                    if($(this)[0].count11.count11 != 0) {
                        for(var i = 1; i <= $(this)[0].count11.count11; i++) {
                            html += '<select class="select-child-num">'
                            html +=     '<option value="0" '+ ( $(this)[0].count11['count11'+i] == 0 ? 'selected' : '' ) +'>0</option>'
                            html +=     '<option value="1" '+ ( $(this)[0].count11['count11'+i] == 1 ? 'selected' : '' ) +'>1</option>'
                            html +=     '<option value="2" '+ ( $(this)[0].count11['count11'+i] == 2 ? 'selected' : '' ) +'>2</option>'
                            html +=     '<option value="3" '+ ( $(this)[0].count11['count11'+i] == 3 ? 'selected' : '' ) +'>3</option>'
                            html +=     '<option value="4" '+ ( $(this)[0].count11['count11'+i] == 4 ? 'selected' : '' ) +'>5</option>'
                            html +=     '<option value="5" '+ ( $(this)[0].count11['count11'+i] == 5 ? 'selected' : '' ) +'>5</option>'
                            html +=     '<option value="6" '+ ( $(this)[0].count11['count11'+i] == 6 ? 'selected' : '' ) +'>6</option>'
                            html +=     '<option value="7" '+ ( $(this)[0].count11['count11'+i] == 7 ? 'selected' : '' ) +'>7</option>'
                            html +=     '<option value="8" '+ ( $(this)[0].count11['count11'+i] == 8 ? 'selected' : '' ) +'>8</option>'
                            html +=     '<option value="9" '+ ( $(this)[0].count11['count11'+i] == 9 ? 'selected' : '' ) +'>9</option>'
                            html +=     '<option value="10" '+ ( $(this)[0].count11['count11'+i] == 10 ? 'selected' : '' ) +'>10</option>'
                            html +=     '<option value="11" '+ ( $(this)[0].count11['count11'+i] == 11 ? 'selected' : '' ) +'>11</option>'
                            html += '</select>'
                        }
                    }
                }
                html +=     '</div>'
                html += '</div>'
            }) ;
            $('.filters').html(html);
            addRemoveBtn();
        }
        
        $('.popup-add').toggleClass('active');
    }

    $(document).on('click','.remove_from_cart_button', function(e) {
        e.preventDefault();
        if(!isloading) {
            isloading = true;
            $('.loading-wait').css('display','block');
        }
        var product_id = $(this).closest('.detail-selected').data('product_id');
        $('.add-service').each(function() {
            var cur_id = $(this).data('product_id');
            if(cur_id == product_id) {
                $(this).prop('checked', false);
            }
        });
        var parent = $(this).closest('.cart-item-info');
        var adult = parseInt(parent.find('.info-custom-adult').html());
        var count5 = parseInt(parent.find('.info-custom-child5').html());
        var count10 = parseInt(parent.find('.info-custom-child10').html());
        var count11 = parseInt(parent.find('.info-custom-child11').html());
        var standard = parseInt(parent.find('.info-custom-child').html());

        $.ajax({
            async: false,
            url: '/wp-admin/admin-ajax.php',
            method: 'POST',
            data: {
                adult: adult,
                count5: count5,
                count10: count10,
                count11: count11,
                action: 'get_data_room'
            },
            success: function(res) {
                if(res.substr(res.length-1, 1) == '0') {
                    res = res.substr(0, res.length-1);
                }
                $('.choose-room').html(res);
            },

        });
        var diff = (adult + count11) - standard;

        if(diff > 0) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                method: 'POST',
                data: {
                    diff: diff,
                    action: 'remove_bed'
                },
                success: function() {
                    $('.service-gr .title').each(function() {
                        if($(this).text() == "Giường Phụ") {
                            var parent = $(this).closest('.detail-selected-service')
                            var qty = parseInt(parent.find('.quantity').html());
                            if(qty == diff) {
                                parent.remove();
                            } else {
                                parent.find('.quantity').html(qty - diff);
                                var price = parseInt(parent.find('.price').text().replace(/,/g, ''));
                                parent.find('.price').html((price*(qty - diff)/qty).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
                            }
                        }
                    });
                },
    
            });
        }
        $(this).closest('.detail-selected').remove();
        var selectedRoom = parseInt(getBBCookie('selectedRoom'));
        setBBCookie('selectedRoom',selectedRoom - 1,864000);
        select = '<div class="room-empty" data-room-number="'+(selectedRoom - 1)+'"><span class="text-select">Select accommodation </span><span>'+(selectedRoom - 1)+'</span></div>';
        $('.selected-filters').html(select);

        $('.choose-room').css('display','block');
        $('.choose-service').css('display','none');
        setBBCookie('step',1,864000);
        $('.step-1').find('.number-step').addClass('active');
        $('.step-1').find('.text-step').addClass('active');
        $('.step-2').find('.number-step').removeClass('active');
        $('.step-2').find('.text-step').removeClass('active');
        showSlides(slideIndex,0);

        updateTotalPrice();
        checkBtnRemove();
        countRoomAndCustomer();
        $('.loading-wait').css('display','none');
    });

    $(document).on('click','.add-btn', function() {
        var number_adult = '';
        var count5 = 0;
        var count10 = 0;
        var count11 = 0;

        var has_filter = false;
        var count_room_empty = $('.room-empty').length;
        var count_cur_filter = $('.filter-gr').length;
        var count_cur_room = $('.detail-room').length;
        if((count_cur_room + count_room_empty ) > count_cur_filter) {
            if((count_cur_room + count_room_empty - count_cur_filter) <= count_room_empty ) {
                var count_remove = count_cur_room + count_room_empty - count_cur_filter;
                for( var i = 1; i <= count_remove; i++) {
                    $('.room-empty').last().remove();
                }
            } else {
                $('.room-empty').remove();
                var count_remove_room = count_cur_room - count_cur_filter;
                for( var i = 1; i <= count_remove_room; i++) {
                    $('.detail-room').last().find('.remove_from_cart_button').click();
                    $('.detail-room').last().remove();
                }
            }
            return ;
        } else if(count_room_empty > 0) {
            has_filter = true;

            var has_change = false;
            $('.detail-room').each(function(index) {
                var item_adult = $(this).find('.info-custom-adult').text();
                var item_child = $(this).find('.info-custom-child').text();
                var item_child5 = $(this).find('.info-custom-child5').text();
                var item_child10 = $(this).find('.info-custom-child10').text();
                var item_child11 = $(this).find('.info-custom-child11').text();

                var filter_child5 = 0;
                var filter_child10 = 0;
                var filter_child11 = 0;

                var filter = $('.filter-gr').eq(index);
                var filter_adult = filter.find('.numberAdult').val();
                var filter_child = filter.find('.numberChild').val();
                
                filter.find('.select-child-num').each(function() {
                    var child_age = parseInt($(this).val());
                    if(child_age <= 5) {
                        filter_child5++;
                    } else if(child_age > 5 && child_age <=10) {
                        filter_child10++;
                    } else {
                        filter_child11++;
                    }
                });

                if(item_adult != filter_adult || item_child != filter_child || item_child5 != filter_child5 || item_child10 != filter_child10 || item_child11 != filter_child11) {
                    has_change = true;
                }
            })

            if(has_change) {
                $.ajax({
                    url: '/wp-admin/admin-ajax.php',
                    method: 'POST',
                    data: {
                        action: 'remove_cart'
                    }
                });
                $('.room-gr').empty();
                $('.selected-filters').empty();
                $('.service-gr').empty();
                has_filter = false;
                setBBCookie('selectedRoom',1,864000);
            }

            var selectedRoom = parseInt(getBBCookie('selectedRoom'));

            number_adult = $('.numberAdult').eq(selectedRoom - 1).val();
            number_child = $('.numberChild').eq(selectedRoom - 1).val();

            $('.filter-gr').eq(selectedRoom - 1).find('.select-child-num').each(function() {
                var child_age = parseInt($(this).val());
                if(child_age <= 5) {
                    count5++;
                } else if(child_age > 5 && child_age <=10) {
                    count10++;
                } else {
                    count11++;
                }
            });

        } else {
            number_adult = $('.numberAdult').first().val();
            number_child = $('.numberChild').first().val();
            
            var stop = false;
            
            if(count_cur_room == count_cur_filter) {
                stop = true;
            }
            $('.filter-gr').each(function() {
                count5 = 0;
                count10 = 0;
                count11 = 0;
                var cur_adult = $(this).find('.numberAdult').val();
                $(this).find('.select-child-num').each(function() {
                    var child_age = parseInt($(this).val());
                    if(child_age <= 5) {
                        count5++;
                    } else if(child_age > 5 && child_age <=10) {
                        count10++;
                    } else {
                        count11++;
                    }
                });
                var total_customer = parseInt(cur_adult) + parseInt(count5) + parseInt(count10) + parseInt(count11);
                if(total_customer > 4 || (cur_adult == 2 && count11 == 2)) {
                    $(this).find('.numberAdult').css('border','1px solid red');
                    $(this).find('.numberChild').css('border','1px solid red');
                    stop = true;
                }
            });
            if(stop) {
                return ;
            }
            
            count5 = 0;
            count10 = 0;
            count11 = 0;
            
            var show_room = false;
            if(count_cur_room > 0) {
                var selectedRoom = parseInt(getBBCookie('selectedRoom'));
                
                number_adult = $('.numberAdult').eq(selectedRoom - 1).val();
                number_child = $('.numberChild').eq(selectedRoom - 1).val();

                $('.filter-gr').eq(selectedRoom - 1).find('.select-child-num').each(function() {
                    var child_age = parseInt($(this).val());
                    if(child_age <= 5) {
                        count5++;
                    } else if(child_age > 5 && child_age <=10) {
                        count10++;
                    } else {
                        count11++;
                    }
                });
                show_room = true;
            } else {
                var first_filter = $('.filter-gr').first();
                first_filter.find('.select-child-num').each(function() {
                    var child_age = parseInt($(this).val());
                    if(child_age <= 5) {
                        count5++;
                    } else if(child_age > 5 && child_age <=10) {
                        count10++;
                    } else {
                        count11++;
                    }
                });
                setBBCookie('selectedRoom',1,864000);
                
            }
        }

        var save_filter = [];
        $('.filter-gr').each(function() {
            var data = {};
            count5 = 0;
            count10 = 0;
            count11 = 0;
            data['count5'] = {};
            data['count10'] = {};
            data['count11'] = {};
            var cur_adult = $(this).find('.numberAdult').val();
            var cur_child = $(this).find('.numberChild').val();
            $(this).find('.select-child-num').each(function() {
                var child_age = parseInt($(this).val());
                if(child_age <= 5) {
                    count5++;
                    data['count5']['count5'+count5] = child_age;
                } else if(child_age > 5 && child_age <=10) {
                    count10++;
                    data['count10']['count10'+count10] = child_age;
                } else {
                    count11++;
                    data['count11']['count11'+count11] = child_age;
                }
            });
            data['cur_adult'] = cur_adult;
            data['cur_child'] = cur_child;
            data['count5']['count5'] = count5;
            data['count10']['count10'] = count10;
            data['count11']['count11'] = count11;
            
            save_filter.push(data)
        });
        setBBCookie('saveFilter',JSON.stringify(save_filter),864000);

        if(!isloading) {
            isloading = true;
            $('.loading-wait').css('display','block');
        }
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            method: 'POST',
            data: {
                adult: number_adult,
                count5: count5,
                count10: count10,
                count11: count11,
                action: 'get_data_room'
            },
            success: function(res) {
                if(res.substr(res.length-1, 1) == '0') {
                    res = res.substr(0, res.length-1);
                }
                $('.number-adults').html(number_adult);
                $('.number-childs').html(number_child);
                $('.popup-add').removeClass('active');
                if(show_room) {
                    $('.choose-room').css('display','block');
                    $('.choose-service').css('display','none');
                    setBBCookie('step',1,864000);
                    $('.step-1').find('.number-step').addClass('active');
                    $('.step-1').find('.text-step').addClass('active');
                    $('.step-2').find('.number-step').removeClass('active');
                    $('.step-2').find('.text-step').removeClass('active');
                }
                
                $('.choose-room').html(res);
                
                $('.loading-wait').css('display','none');
                isloading = false;
                showSlides(slideIndex,0);
                // changePriceRoom();
                // $('.numberAdult').val(1);
                // $('.numberChild').val(0);

                if(!has_filter) {
                    var select = '';
                    var selectedRoom = parseInt(getBBCookie('selectedRoom'));
                    $('.filter-gr').each(function(index) {
                        if(selectedRoom - 1 > index) {
                            return true;
                        } else {
                            var number = index + 1;
                            select += '<div class="room-empty" data-room-number="'+number+'"><span class="text-select">Select accommodation </span><span>'+number+'</span></div>';
                        }
                    })
                    $('.selected-filters').html(select);
                }
                changePriceRoom(number_adult, count5, count10, count11);
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
        var price = $(this).closest('.booking-service').find('.servive-price').html().replace(/,/g, '');
        $(this).closest('.servive-quatity').find('.qty').val(newQty);
        $('.detail-selected').each(function() {
            var cur_id = $(this).data('product_id');
            if(cur_id == product_id) {
                var new_qty = parseInt($(this).find('.qty-service').html()) - 1;
                $(this).find('.qty-service').html(new_qty);

                var new_price = parseInt($(this).find('.price').html().replace(/,/g, '')) - parseInt(price);
                $(this).find('.price').html(new_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                off = true;
                return ;
            }
        });
        updateTotalPrice();
    });
    
    // $(document).on('click','.remove_from_cart_button', function() {
    //     var qty_room = $('.detail-room').length;
    //     if(qty_room < 2) {
    //         setBBCookie('step',1,864000);
    //     }
    // });

    $(document).on('change','.numberAdult', function() {
        $('.numberAdult').css('border','1px solid #ddd');
        $('.numberChild').css('border','1px solid #ddd');
        // $('.validate-customer').css('display','none');
//         var number_adult = $(this).val();
//         $('.numberChild option').css('display','none');
//         for(var i = 1; i <= 6 - parseInt(number_adult); i++) {
//             $('.numberChild option:nth-of-type('+i+')').css('display','block');
//         }
    });

    $(document).on('click','.btn-add-more', function() {
        var count_room = $('.filter-gr').length;
        if(count_room == 4 ) {
            $('.btn-add-more').remove();
        }
        var new_room = parseInt(count_room) + 1;
        var html = '';
        html += '<div class="filter-gr">'
        html +=     '<div class="number-room" data-number-room="'+new_room+'">Phòng '+new_room+'</div>'
        html +=     '<div class="adults">'
        html +=         '<div class="label">Người lớn</div>'
        html +=         '<select class="numberAdult">'
        html +=             '<option value="1" selected="">1</option>'
        html +=             '<option value="2">2</option>'
        html +=             '<option value="3">3</option>'
        html +=             '<option value="4">4</option>'
        html +=         '</select>'
        html +=     '</div>'
        html +=     '<div class="childs">'
        html +=         '<div class="label">Trẻ em</div>'
        html +=         '<select class="numberChild">'
        html +=             '<option value="0" selected="">0</option>'
        html +=             '<option value="1">1</option>'
        html +=             '<option value="2">2</option>'
        html +=             '<option value="3">3</option>'
        html +=         '</select>'
        html +=     '</div>'
        html +=     '<div class="text-filter" style="display: none;">Tuổi của trẻ</div>'
        html +=     '<div class="filter-child"></div>'
        html += '</div>'

        $('.filters').append(html);
        addRemoveBtn();
    });

    function addRemoveBtn() {
        $('.remove-filter').remove();
        var count_room = $('.filter-gr').length;
        if(count_room == 1 ) {
            return ;
        }
        $('.filter-gr').last().prepend('<i class="fas fa-trash remove-filter"></i>');
    }

    $(document).on('click','.remove-filter', function() {
        $('.filter-gr').last().remove();
        addRemoveBtn()
    });

    $(document).on('change','.numberChild', function() {
        $('.numberAdult').css('border','1px solid #ddd');
        $('.numberChild').css('border','1px solid #ddd');
        // $('.validate-customer').css('display','none');
        var html = '';
        var child_number = $(this).val();
        var has_child = true;
        if(child_number == 0) {
            has_child = false;
        } else if(child_number == 1) {
            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';
        }
        else if(child_number == 2) {
            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';

            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';
        }
        else if(child_number == 3) {
            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';

            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';

            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';
        }
        if(has_child) {
            $(this).closest('.filter-gr').find('.text-filter').css('display','block');
        } else {
            $(this).closest('.filter-gr').find('.text-filter').css('display','none');
        }
        $(this).closest('.filter-gr').find('.filter-child').html(html);
    });
    $(document).on('change','.select-child', function() {
        var html = '';
        var child_number = $(this).val();
        if(child_number == 0) {
        } else if(child_number == 1) {
            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';
        }
        else if(child_number == 2) {
            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';

            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';
        }
        else if(child_number == 3) {
            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';

            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';

            html += '<select class="select-child-num">';
            html +=     '<option value="0">0</option>';
            html +=     '<option value="1">1</option>';
            html +=     '<option value="2">2</option>';
            html +=     '<option value="3">3</option>';
            html +=     '<option value="4">4</option>';
            html +=     '<option value="5">5</option>';
            html +=     '<option value="6">6</option>';
            html +=     '<option value="7">7</option>';
            html +=     '<option value="8">8</option>';
            html +=     '<option value="9">9</option>';
            html +=     '<option value="10">10</option>';
            html +=     '<option value="11">11</option>';
            html += '</select>';
        }
        $('.tuoi-tre-em').html(html);
    });
    $(document).on('click','.btn-booking-detail', function(e) {
        e.preventDefault();
        $('.loading-wait').css('display', 'block');
        var current_url = window.location.href;
        if(current_url.indexOf("/list-room") > -1) {
            var checkin = $('.checkin').val();
            var checkout = $('.checkout').val();
            var adults = parseInt($('.select-adults').val());
            var childs = parseInt($('.select-child').val());
            childs = isNaN(childs) ? 0 : childs;
            var product_id = $(this).data('product_id');

            var standard = parseInt($('.tieu-chuan').data('nguoi-lon'));
            var count5 = 0;
            var count10 = 0;
            var count11 = 0;
            $('.select-child-num').each(function() {
                var child_age = parseInt($(this).val());
                if(child_age <= 5) {
                    count5++;
                } else if(child_age > 5 && child_age <=10) {
                    count10++;
                } else {
                    count11++;
                }
            })

            var diff = adults + count11 - standard ;
            diff = diff > 0 ? diff : 0;
        }
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            method: 'POST',
            data: {
                adult: adults,
                child: childs,
                count5: count5,
                count10: count10,
                count11: count11,
                date_checkin:checkin,
                date_checkout:checkout,
                product_id: product_id,
                standard: standard,
                action: 'custom_data_product'
            },
            success: function(res) { 
                setBBCookie('step',2,864000);
                $('.loading-wait').css('display', 'none');
                var hasextrabed = diff > 0 ? true : false;
                
                var save_filter = [];
                var data = {};
                count5 = 0;
                count10 = 0;
                count11 = 0;
                data['count5'] = {};
                data['count10'] = {};
                data['count11'] = {};
                $('.select-child-num').each(function() {
                    var child_age = parseInt($(this).val());
                    if(child_age <= 5) {
                        count5++;
                        data['count5']['count5'+count5] = child_age;
                    } else if(child_age > 5 && child_age <=10) {
                        count10++;
                        data['count10']['count10'+count10] = child_age;
                    } else {
                        count11++;
                        data['count11']['count11'+count11] = child_age;
                    }
                });
                data['cur_adult'] = adults;
                data['cur_child'] = childs;
                data['count5']['count5'] = count5;
                data['count10']['count10'] = count10;
                data['count11']['count11'] = count11;
                
                save_filter.push(data)
            
                setBBCookie('saveFilter',JSON.stringify(save_filter),864000);

                window.location.href = 'https://'+window.location.host+'/booking-page/?arrival='+checkin+'&departure='+checkout+'&adults1='+adults+'&children1='+childs+'&fromdetail=true&hasextrabed='+hasextrabed;
            }
        }); 
        
    });

    function updateTotalPrice() {
        var prices = $('.list-selected').find('.price');
        var price = 0;
        prices.each(function( index ) {
            price += parseInt($(this).text().replace(/,/g, ''));
        });
        $('.total-price').html(price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' VNĐ');
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
            $('.room-gr').find('.remove_from_cart_button').css('display','none');
            $('.room-gr').find('.remove_from_cart_button').last().css('display','block');
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
            count = $(this).closest('.detail-room').find('.quantity').text();
            total_adult += parseInt($(this).html()) * parseInt(count);
        });
        $('.number-adults-cal').html(total_adult);
        var total_child = 0;
        $('.list-selected .info-custom-child').each(function() {
            count = $(this).closest('.detail-room').find('.quantity').text();
            total_child += parseInt($(this).html())  * parseInt(count);
        });
        $('.number-childs-cal').html(total_child);
     }

     $(document).on('change','.date-checkin, .date-checkout', function() {
        
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            method: 'POST',
            data: {
                action: 'remove_cart'
            }
        });
        $('.add-service').prop('checked', false);
        $('.service-number').each(function() {
            $(this).val(1);
        })
        setBBCookie('step',1,864000);
        setBBCookie('selectedRoom',1,864000);
        $('.choose-room').css('display','block');
        $('.choose-service').css('display','none');
        $('.room-gr').empty();
        $('.service-gr').empty();
        $('.room-empty').remove();
        $('.total-price').html('0 VNĐ')
        var date_checkin = $('.date-checkin').val();
        var date_checkout = $('.date-checkout').val();

        if(date_checkin && date_checkout) {
            var cur_filter = $('filter-gr').eq(0);
            var adult = cur_filter.find('.numberAdult').val();
            var count5 = 0;
            var count10 = 0;
            var count11 = 0;
            cur_filter.find('.select-child-num').each(function() {
                var child_age = parseInt($(this).val());
                if(child_age <= 5) {
                    count5++;
                } else if(child_age > 5 && child_age <=10) {
                    count10++;
                } else {
                    count11++;
                }
            })
            changePriceRoom(adult, count5, count10, count11);
        }
     });

    function changePriceRoom(adult, count5, count10, count11) {
        var date_checkin = $('.date-checkin').val();
        var date_checkout = $('.date-checkout').val();
        if(!date_checkin || !date_checkout || date_checkout <= date_checkin) {
            return ;
        }
        var format_checkin = new Date(date_checkin);
        var format_checkout = new Date(date_checkout);
        var difference_in_iime = format_checkout.getTime() - format_checkin.getTime();
        var total_day = parseInt(difference_in_iime / (1000 * 3600 * 24));

        $('.regular-price').each(function() {
            var regular_price = parseInt($(this).closest('.regular-price-gr').find('.regular-price-cal').text().replace(/,/g, ''));
            if(regular_price) {
                $(this).html((regular_price*total_day).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
            }
        });
        
        $('.sale-price').each(function() {
            var sale_price = parseInt($(this).closest('.sale-price-gr').find('.sale-price-cal').text().replace(/,/g, ''));
            var standard = parseInt($(this).closest('.row').find('.room-user').data('standard'));
            var additional_price = 0;
            if(standard >= (adult + count10 + count11)) {
                additional_price = 0;
            } else if(standard >= (adult + count11) && standard < (adult + count10 + count11)) {
                additional_price = 300000 * (adult + count10 + count11 - standard);
            } else if(standard < (adult + count11)) {
                additional_price = 300000 * count10;
            }

            $(this).html((( sale_price + additional_price ) * total_day).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
        });
        $('.date-gr span').each(function() {
            $(this).html(total_day);
        });
        $('.quatity-date').each(function() {
            $(this).html(total_day);
        })
    }

    function changePriceCart() {
        var date_checkin = $('.date-checkin').val();
        var date_checkout = $('.date-checkout').val();
        var format_checkin = new Date(date_checkin);
        var format_checkout = new Date(date_checkout);
        var difference_in_iime = format_checkout.getTime() - format_checkin.getTime();
        var total_day = parseInt(difference_in_iime / (1000 * 3600 * 24));
        if(total_day == 0) {
            return ;
        }

        $('.detail-room .price').each(function() {
            var regular_price = parseInt($(this).text().replace(/,/g, ''));
            if(regular_price) {
                $(this).html((regular_price*total_day).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
            }
        });

        $('.detail-selected-service .price').each(function() {
            var price = parseInt($(this).text().replace(/,/g, ''));
            var qty_service = parseInt($(this).closest('.cart-item-info').find('.quantity').text());
            var title = $(this).closest('.detail-selected-service').find('.title').text();
            if(title == "Giường Phụ") {
                $(this).html((price*total_day).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
            }
        });
    }

    function changePriceCartCheckout() {

        var date_checkin = $('.info-checkin:first').html().split("/");
        var format_checkin = new Date(+date_checkin[2], date_checkin[1] - 1, +date_checkin[0]);
        
        var date_checkout = $('.info-checkout:first').html().split("/");
        var format_checkout = new Date(+date_checkout[2], date_checkout[1] - 1, +date_checkout[0]);

        var difference_in_time = format_checkout.getTime() - format_checkin.getTime();
        var total_day = parseInt(difference_in_time / (1000 * 3600 * 24));
        if(total_day == 0) {
            return ;
        }
        
        $('.room-selected .price').each(function() {
            var regular_price = parseInt($(this).text().replace(/,/g, ''));
            var qty = parseInt($(this).closest('.cart-item-info').find('.quantity').text());

            var standard = parseInt($(this).closest('.cart-item-info').find('.info-standard').text());
            var adult = parseInt($(this).closest('.cart-item-info').find('.info-standard').text());
            var count5 = parseInt($(this).closest('.cart-item-info').find('.info-child5').text());
            var count10 = parseInt($(this).closest('.cart-item-info').find('.info-child10').text());
            var count11 = parseInt($(this).closest('.cart-item-info').find('.info-child11').text());

            var additional_price = 0;
            if(standard >= (adult + count10 + count11)) {
                additional_price = 0;
            } else if(standard >= (adult + count11) && standard < (adult + count10 + count11)) {
                additional_price = 300000 * (adult + count10 + count11 - standard);
            } else if(standard < (adult + count11)) {
                additional_price = 300000 * count10;
            }

            if(regular_price) {
                $(this).html(((regular_price+additional_price)*total_day*qty).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
            }
        });
        $('.service-selected .price').each(function() {
            var price = parseInt($(this).text().replace(/,/g, ''));
            var qty_service = parseInt($(this).closest('.cart-item-info').find('.quantity').text());
            var title = $(this).closest('.service-selected').find('.title').text();
            if(title == "Giường Phụ") {
                $(this).html((price*qty_service*total_day).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
            } else {
                $(this).html((price*qty_service).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
            }
        });
        $('.quatity-date').each(function() {
            $(this).html(total_day);
        })
    }

    $( document ).ready(function() {

        checkBtnRemove();

        var today = new Date();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var year = today.getFullYear();
        var date = year + '-' + month + '-' + day;
        $('.date-checkin').attr('min', date);
        
        var tomorrow =  new Date()
        tomorrow.setDate(today.getDate() + 1)
        
        var dayTomorrow = ('0' + tomorrow.getDate()).slice(-2);
        var monthTomorrow = ('0' + (tomorrow.getMonth() + 1)).slice(-2);
        var yearTomorrow = tomorrow.getFullYear();
        
        var dateTomorrow = yearTomorrow + '-' + monthTomorrow + '-' + dayTomorrow;
        $('.date-checkout').attr('min', dateTomorrow);

        var current_url = window.location.href;
        if(current_url.indexOf("/booking-page") > -1) {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars[hash[0]] = hash[1];
            }
            if(vars['hasextrabed'] == true) {
                $('.message-notice').css('display','block');
                setTimeout(function() { 
                    $(".message-notice").hide();
                }, 4000);
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
        }, 3000);

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

            // var checkin = $('.info-checkin:first').html();
            // $('.date-checkin').val(moment(Date(checkin)).format('YYYY-MM-DD'));

            // var checkout = $('.info-checkout:first').html();
            // $('.date-checkout').val(moment(Date(checkout)).format('YYYY-MM-DD'));

            var date_checkin = $('.info-checkin:first').html().split("/");
            var format_checkin = new Date(+date_checkin[2], date_checkin[1] - 1, +date_checkin[0]);
            $('.date-checkin').val(moment(format_checkin).format('YYYY-MM-DD'));
            
            var date_checkout = $('.info-checkout:first').html().split("/");
            var format_checkout = new Date(+date_checkout[2], date_checkout[1] - 1, +date_checkout[0]);
            $('.date-checkout').val(moment(format_checkout).format('YYYY-MM-DD'));
            changePriceCartCheckout();
        }
        if(current_url.indexOf("booking-page") > -1) {
            generateFIlter();
            $('.popup-add').removeClass('active');
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars[hash[0]] = hash[1];
            }
            if($('.info-date-checkin:first').html()) {
                var date_checkin = $('.info-date-checkin:first').html().split("/");
                var format_checkin = moment(new Date(+date_checkin[2], date_checkin[1] - 1, +date_checkin[0])).format('YYYY-MM-DD');
                
                var date_checkout = $('.info-date-checkout:first').html().split("/");
                var format_checkout = moment(new Date(+date_checkout[2], date_checkout[1] - 1, +date_checkout[0])).format('YYYY-MM-DD');

                var arrival = vars['arrival'];
                var departure = vars['departure'];
                if(arrival != format_checkin || departure != format_checkout) {
                    $.ajax({
                        url: '/wp-admin/admin-ajax.php',
                        method: 'POST',
                        data: {
                            action: 'remove_cart'
                        }
                    });
                    $('.add-service').prop('checked', false);
                    $('.service-number').each(function() {
                        $(this).val(1);
                    })
                    $('.room-gr').empty();
                    $('.service-gr').empty();
                    $('.total-price').html('0 VNĐ')
                    $('.choose-room').css('display','block');
                    $('.choose-service').css('display','none');
                    setBBCookie('step',1,864000);
                    $('.step-1').find('.number-step').addClass('active');
                    $('.step-1').find('.text-step').addClass('active');
                    $('.step-2').find('.number-step').removeClass('active');
                    $('.step-2').find('.text-step').removeClass('active');
                }
            }
            var saveFilter = JSON.parse(getBBCookie('saveFilter'));
            $('.detail-room .quantity').each(function() {
                var quantity = parseInt($(this).text());
                if(quantity > 1) {
                    $(this).html(1);
                    var title = $(this).closest('.detail-room').find('.title').text();
                    var html = '';
                    $.each(saveFilter, function(index) {
                        var filter_title = $(this)[0].room;
                        if(title == filter_title) {
                            console.log(title)
                            if(index == 0) {
                                html = $('.detail-room').eq(index).clone();
                                console.log(html)
                            } else {
                                $('.detail-room').eq(index - 1).after(html);
                                console.log(html)
                                console.log($('.detail-room').eq(index))
                            }
                        }
                    });
                }
            });

            var count_room = $('.detail-room').length;
            var count_cur_filter = $('.filter-gr').length;
            var selectedRoom = parseInt(getBBCookie('selectedRoom'));

            if(count_room != count_cur_filter) {
                var filter = $('.filter-gr').eq(selectedRoom - 1);
                var adult = filter.filter('.numberAdult').val();
                var child = filter.filter('.numberChild').val();
                var count5 = 0;
                var count10 = 0;
                var count11 = 0;
                filter.find('.select-child-num').each(function() {
                    var child_age = parseInt($(this).val());
                    if(child_age <= 5) {
                        count5++;
                    } else if(child_age > 5 && child_age <=10) {
                        count10++;
                    } else {
                        count11++;
                    }
                });
                var select = '';
                $('.filter-gr').each(function(index) {
                    if(selectedRoom - 1 > index) {
                        return true;
                    } else {
                        var number = index + 1;
                        select += '<div class="room-empty" data-room-number="'+number+'"><span class="text-select">Select accommodation </span><span>'+number+'</span></div>';
                    }
                })
                $('.selected-filters').html(select);
                $.ajax({
                    url: '/wp-admin/admin-ajax.php',
                    method: 'POST',
                    data: {
                        adult: adult,
                        count5: count5,
                        count10: count10,
                        count11: count11,
                        action: 'get_data_room'
                    },
                    success: function(res) {
                        if(res.substr(res.length-1, 1) == '0') {
                            res = res.substr(0, res.length-1);
                        }
                        $('.number-adults').html(adult);
                        $('.number-childs').html(child);
                        $('.popup-add').removeClass('active');
                        $('.choose-room').html(res);
                        
                        if(!vars['fromdetail']) {
                            $('.choose-room').css('display','block');
                            $('.choose-service').css('display','none');
                            setBBCookie('step',1,864000);
                            $('.step-1').find('.number-step').addClass('active');
                            $('.step-1').find('.text-step').addClass('active');
                            $('.step-2').find('.number-step').removeClass('active');
                            $('.step-2').find('.text-step').removeClass('active');
                        }
                        
                        $('.loading-wait').css('display','none');
                        isloading = false;
                        showSlides(slideIndex,0);
                        changePriceRoom(adult,0,0,0);
                    },

                });

                var next_room = count_room + 1;
                setBBCookie('selectedRoom',next_room,864000);
            }
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
        
        $(window).on('beforeunload', function() {
            setTimeout(function() {
                if(!(current_url.indexOf("thanh-toan/order-received") > -1)) {
                    location.reload();
                }
            }, 5000);
        });
        $(window).on("navigate", function (event, data) {
            setTimeout(function() {
                if(!(current_url.indexOf("thanh-toan/order-received") > -1)) {
                    location.reload();
                }
            }, 5000);
        });
        window.onpageshow = function(event) {
            if (event.persisted && !(current_url.indexOf("thanh-toan/order-received") > -1)) {
            window.location.reload();
            }
        };
        changePriceCart();
        updateTotalPrice();

        $('.servive-name').each(function() {
            if($(this).text() == "Giường Phụ") {
                $(this).closest('.cart').css('display','none');
            }
        })

        $('.detail-selected-service').each(function() {
            var title = $(this).find('.title').text();
            if(title == "Giường Phụ") {
                $(this).find('.remove_from_cart_button').css('display','none');
            }
        })

    });
})(jQuery);
jQuery(document).ready(function(){
	jQuery('.time-show-mobile .time-den').text(moment(jQuery(".info-booking .date-checkin").val()).format('DD-MM-YYYY'));
	jQuery('.time-show-mobile .time-di').text(moment(jQuery(".info-booking .date-checkout").val()).format('DD-MM-YYYY'));
});