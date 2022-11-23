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
				console.log(jQuery(this).find(".uu-dai-img-box").attr("data-ava-img"));
				var img_url = jQuery(this).find(".uu-dai-img-box").attr("data-ava-img");
				var img_alt = jQuery(this).find(".uu-dai-img-box").attr("data-ava-alt");
				jQuery(this).find(".uu-dai-img-box .image-cover").html("<img src='"+img_url+"' alt='"+img_alt+"'>");
			}
		});
	}
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
	        $('.error-email').css('display','block');
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
	var slide_h = jQuery(".type-product .main-carousel .flickity-slider>div.carousel-cell:not(.col)").width() *9/16;
	jQuery(".type-product .main-carousel .flickity-slider>div.carousel-cell:not(.col)").css("min-height", slide_h+"px");
	jQuery(".type-product .main-carousel .flickity-viewport").css("min-height", slide_h+"px");	
});