jQuery("document").ready(function(){
	jQuery(".home-sec-3 .product-small.box-shade").each(function(){
		jQuery(this).find(".box-text").append("<div class='home-box-dv'><div class='icon-dv'><img src='/wp-content/uploads/2022/10/double-bed.png'><img src='/wp-content/uploads/2022/10/towels.png'><img src='/wp-content/uploads/2022/10/breakfast.png'><img src='/wp-content/uploads/2022/10/bath-tub.png'></div><a class='chi-tiet-phong'>Xem chi tiết &#8594;</a></div>");
		jQuery(this).find(".chi-tiet-phong").attr("href",jQuery(this).find(".woocommerce-loop-product__link").attr("href"));
	});
	jQuery(".home-sec-3 .flickity-slider .product-small:not(.box-shade)").each(function(){
		jQuery(this).find(".box-image").append("<div class='home-box-dv'><div class='icon-dv'><img src='/wp-content/uploads/2022/10/double-bed.png'><img src='/wp-content/uploads/2022/10/towels.png'><img src='/wp-content/uploads/2022/10/breakfast.png'><img src='/wp-content/uploads/2022/10/bath-tub.png'></div><a class='chi-tiet-phong'>Xem chi tiết &#8594;</a></div>");
		jQuery(this).find(".chi-tiet-phong").attr("href",jQuery(this).find(".woocommerce-loop-product__link").attr("href"));
	});
	
	jQuery(".row-mang-den .col").each(function(){
		jQuery(this).find(".col-inner").attr("onclick","window.location='"+jQuery(this).find("a").attr("href")+"'");
	});
	jQuery(".row-mang-den .col").mouseenter(function(){
		jQuery(".row-mang-den .col").removeClass("active");
		jQuery(this).addClass("active");
	});
	jQuery(".button.secondary.is-link").prepend('<svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg>');
	if(jQuery(window).width() < 480){
		jQuery(".post-item").each(function(){
			if(jQuery(this).find(".box-image").hasClass("uu-dai-img-box") == true){
				// console.log(jQuery(this).find(".uu-dai-img-box").attr("data-ava-img"));
				var img_url = jQuery(this).find(".uu-dai-img-box").attr("data-ava-img");
				var img_alt = jQuery(this).find(".uu-dai-img-box").attr("data-ava-alt");
				jQuery(this).find(".uu-dai-img-box .image-cover").html("<img src='"+img_url+"' alt='"+img_alt+"'>");
			}
		});
		jQuery(".booking-content .info-selected .total, .booking-page .info-selected > h2 .dong-tab").click(function(){
			jQuery(".booking-content .info-selected").toggleClass("active");
		});
		jQuery(".col-thong-tin-khach-hang .check-condition").appendTo(jQuery(".col-hinh-thuc-thanh-toan"));
		var slide_h2 = jQuery(".type-product .main-carousel .flickity-slider>div.carousel-cell:not(.col)").width() *3/4;
		jQuery(".type-product .main-carousel .flickity-slider>div.carousel-cell:not(.col)").css("max-height", slide_h2+"px");
		jQuery(".type-product .main-carousel .flickity-viewport").css("max-height", slide_h2+"px");
	};
	jQuery(".archive.category #header").addClass("has-transparent transparent");
	jQuery(".page-template-booking #header").addClass("has-transparent transparent");
	jQuery(".single-post article .entry-category").appendTo(jQuery(".single-post article .thang-blogs-meta"));
	jQuery(".single-post #comments").remove();
	jQuery(".single-post .blog-share").prepend("<span>Chia sẻ: </span>");
	jQuery(".ds-phong-sec-2 .short-des").after('<a class="button secondary is-link lowercase"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg><span>Chi tiết</span></a>');
	jQuery(".ds-phong-sec-2 .equalize-box.large-columns-1 >.col").each(function(){
		jQuery(this).find(".button.secondary.is-link").attr("href", jQuery(this).find(".woocommerce-LoopProduct-link").attr("href"));
	});
	jQuery('input[type="date"]').click(function(){
		jQuery(this).removeClass('datePickerPlaceHolder');
	});
	jQuery('input[type="date"]').change(function(){
		if(jQuery(this).val().length < 1) {
			jQuery(this).addClass('datePickerPlaceHolder');
		} else {
			jQuery(this).removeClass('datePickerPlaceHolder');
		}
    });
	jQuery(".detail-room-price .gia-phong").text( jQuery(".detail-room-price .gia-phong").text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
	jQuery(window).load(function(){
		jQuery(".mySlides img").css("height",jQuery(".mySlides img").width() * 9 / 16 + "px");
	})
	jQuery(".xct-dv").click(function(){
		jQuery(this).parents(".booking-service").find(".description-service").slideToggle();
		jQuery(this).toggleClass("active");
	});

	jQuery(".cart-info-label").each(function(){
		jQuery(this).parents(".detail-room").find(".price-gr").css("height",jQuery(this).parents(".detail-room").find(".title").height()+"px");
	});
	jQuery(".cart-info-label").each(function(){
		jQuery(this).parents(".detail-selected-service").find(".price-gr").css("height",jQuery(this).parents(".detail-selected-service").find(".title").height()+"px");
	});
	jQuery(".col-thong-tin-phong .cart-info-label").each(function(){
		jQuery(this).parents(".detail-selected").find(".price-gr").css("height",jQuery(this).parents(".detail-selected").find(".title").height()+"px");
	});
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
	   dd = '0' + dd;
	}
	if (mm < 10) {
	   mm = '0' + mm;
	} 
	today = yyyy + '-' + mm + '-' + dd;
	jQuery(".form-input.ngay-den input").attr("min", today);
	jQuery(".form-input.ngay-di input").attr("min", today);
	jQuery(".form-input.ngay-den input").change(function(){
		jQuery(".form-input.ngay-di input").attr("min", jQuery(this).val());
	});
	jQuery(".popup-add .btn-huy").click(function(){
		jQuery(".popup-add").removeClass("active");
		jQuery(".popup-add").removeAttr("style");
	});
	jQuery(".check-condition #condition").click(function(){
		jQuery(".col-bo-sung .btn-dat-phong-box").toggleClass("dissable");
	});
	jQuery(".col-bo-sung .btn-dat-phong-box").click(function(){
	    var $ = jQuery;
	    
	    $('.error-name').css('display','none');
	    $('.error-email').css('display','none');
	    $('.error-phone').css('display','none');
	    $('.error-format').css('display','none');
	    
	    var name = $('#billing_first_name').val();
	    var email = $('#billing_email').val();
	    var phone = $('#billing_phone').val();
	    
	    var isStop = false;
	    if(!name) {
	        isStop = true;
	        $('.error-name').css('display','block');
	    }	    
	    if(!email) {
	        isStop = true;
	        $('.error-phone').css('display','block');
	    }
	    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if ( !(testEmail.test(email)) ) {
            isStop = true;
	        $('.error-format').css('display','block');
        }
		if(!email) {
	        isStop = true;
	        $('.error-email').css('display','block');
			$('.error-format').css('display','none');
	    }
        if(isStop) {
            return ;
        }
	    
		jQuery(".col-hinh-thuc-thanh-toan #place_order").trigger("click");
	});
	jQuery(".home-sec-2 form").submit(function( event ) {
	  if(jQuery( ".form-input.ngay-den input" ).val() != "" && jQuery( ".form-input.ngay-di input" ).val() != "") {		
		return;
	  }else{
		  if(jQuery( ".form-input.ngay-den input" ).val() == "" && jQuery( ".form-input.ngay-di input" ).val() == ""){
			  alert("Bạn chưa nhập ngày Nhận phòng - Trả phòng!");
			  event.preventDefault();
		  }else{
			if(jQuery( ".form-input.ngay-den input" ).val() == ""){
				  alert("Bạn chưa nhập ngày Nhận phòng!");
				  event.preventDefault();
			  }
			  if(jQuery( ".form-input.ngay-di input" ).val() == ""){
				  alert("Bạn chưa nhập ngày Trả phòng!");
				  event.preventDefault();
			  }
		  }	  
	  }
	});
	jQuery(".btn-booking-detail-1").click(function( ) {
	  if(jQuery( ".form-input.ngay-den input" ).val() != "" && jQuery( ".form-input.ngay-di input" ).val() != "") {
		if(jQuery(".select-adults").val() == 0){
			jQuery(".select-adults").val(1);
		}
		jQuery(".btn-booking-detail").trigger("click");
	  }else{
		  if(jQuery( ".form-input.ngay-den input" ).val() == "" && jQuery( ".form-input.ngay-di input" ).val() == ""){
			  alert("Bạn chưa nhập ngày Nhận phòng - Trả phòng!");
		  }else{
			if(jQuery( ".form-input.ngay-den input" ).val() == ""){
				  alert("Bạn chưa nhập ngày Nhận phòng!");
			  }
			  if(jQuery( ".form-input.ngay-di input" ).val() == ""){
				  alert("Bạn chưa nhập ngày Trả phòng!");
			  }
		  }	  
	  }
	});
	var slide_h = jQuery(".type-product .main-carousel .flickity-slider>div.carousel-cell:not(.col)").width() *9/16;
	jQuery(".type-product .main-carousel .flickity-slider>div.carousel-cell:not(.col)").css("min-height", slide_h+"px");
	jQuery(".type-product .main-carousel .flickity-viewport").css("min-height", slide_h+"px");
	jQuery(".dia-diem-col .col-inner > .row").click(function(){
		var key = jQuery(this).find("h4").text().trim();
		jQuery(".dia-chi-ks .tab").each(function(){
			var map = jQuery(this).text().trim();
			if(map == key){
				jQuery(this).find("a").trigger("click");
			}
		});		
	});
	jQuery(".row-title .dia-chi-ks").click(function(){
		var key = jQuery(this).text().trim();
		jQuery(".dia-chi-ks .tab").each(function(){
			var map = jQuery(this).text().trim();
			if(map == key){
				jQuery(this).find("a").trigger("click");
			}
		});		
	});
	
	// var max_adults_detail_room = Number(jQuery(".thong-tin .so-nguoi").attr("data-nguoi-lon"));
	// var max_child_detail_room = Number(jQuery(".thong-tin .so-nguoi").attr("data-tre-em"));
	// var all_people_detail_room = max_child_detail_room + max_adults_detail_room;
	// for(var i = 0; i <= max_adults_detail_room; i++){
	// 	jQuery(".select-adults").append("<option value='"+i+"'>"+i+"</option>");
	// }
	// jQuery(".select-adults option:first-child").text("Người lớn");
	// for(var i = 0; i <= max_child_detail_room; i++){
	// 	jQuery(".select-child").append("<option value='"+i+"'>"+i+"</option>");
	// }
	// jQuery(".select-child option:first-child").text("Trẻ em");
	// jQuery(".select-adults").change(function(){
	// 	var number_adults_chose = Number(jQuery(this).val());
	// 	if(number_adults_chose > 0){
	// 		var minus_people_detail_room = all_people_detail_room - number_adults_chose;
	// 		jQuery(".select-child option:not(:first-child)").remove();
	// 		for(var i = 1; i <= minus_people_detail_room; i++){
	// 			jQuery(".select-child").append("<option value='"+i+"'>"+i+"</option>");
	// 		}
	// 	}
	// });
	
	var booking_total_adults = [];
	var booking_total_childs = [];
	var booking_room_adults = 0;
	var booking_room_childs = 0;
	var booking_room_adult_max = 0;
	var booking_room_child_max = 0;
	var booking_room_total_child_adult = 0;
	jQuery(".booking-page .info-booking .container .add-room p.btn-show").click(function(){
		jQuery(".choose-room > .cart").each(function(){
			booking_room_adults = Number(jQuery(this).find(".room-user").attr("data-number-adult"));
			booking_room_childs = Number(jQuery(this).find(".room-user").attr("data-number-child"));
			booking_total_adults.push(booking_room_adults);
			booking_total_childs.push(booking_room_childs);
		});
		// console.log("nglon " + booking_total_adults);
		// console.log("treem " + booking_total_childs);
		booking_room_adult_max = Math.max.apply(null, booking_total_adults) + 2;
		booking_room_child_max = Math.max.apply(null, booking_total_childs);
		if(booking_total_adults == '' && booking_total_childs == ''){
			booking_room_adult_max = 6;
			booking_room_child_max = 2;
		}
		booking_room_total_child_adult = booking_room_adult_max + booking_room_child_max;		
		// console.log(booking_room_adult_max);
		// console.log(booking_room_child_max);
		// jQuery(".booking-page .info-booking .container .add-room #numberAdult option").remove();
		// jQuery(".booking-page .info-booking .container .add-room #numberChild option").remove();
		// for(var i = 1; i<= booking_room_adult_max; i++){
		// 	jQuery(".booking-page .info-booking .container .add-room #numberAdult").append("<option value='"+i+"'>"+i+"</option>");
		// }
		// for(var i = 0; i<= booking_room_child_max; i++){
		// 	jQuery(".booking-page .info-booking .container .add-room #numberChild").append("<option value='"+i+"'>"+i+"</option>");
		// }
		// jQuery(".booking-page .info-booking .container .add-room #numberAdult").change(function(){
		// 	var booking_room_number_adults_chose = Number(jQuery(this).val());
		// 	var minus_people_detail_booking = booking_room_total_child_adult - booking_room_number_adults_chose;
		// 	jQuery(".booking-page .info-booking .container .add-room #numberChild option").remove();
		// 	for(var i = 0; i<= minus_people_detail_booking; i++){
		// 		jQuery(".booking-page .info-booking .container .add-room #numberChild").append("<option value='"+i+"'>"+i+"</option>");
		// 	}
		// });
	});	
	var cat_name = jQuery(".single-post .thang-blogs-meta .entry-category a").text();
	if(cat_name && cat_name != "Tin tức"){
		jQuery(".single-post .banner-inner h3 strong").text(cat_name);
		jQuery(".single-post .banner-inner .text-inner p > span:nth-child(2)").text(jQuery(".single-post .banner-inner .text-inner p > span:nth-child(2)").text().replace("Tin tức",cat_name));
	}
	jQuery(".related-post.home-sec-7.row-bvlq").attr("data-cate",cat_name);
	// console.log(cat_name)
	jQuery("body").click(function (e) {		
		if (jQuery(e.target).closest(".add-room .popup-add").length == 0) {
			jQuery('.add-room .popup-add').removeClass('active');
		};
	});
	jQuery(".ds-phong-sec-2 .price-wrapper .price .woocommerce-Price-currencySymbol").text("VND / Đêm");
});