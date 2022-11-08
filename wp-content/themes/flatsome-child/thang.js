jQuery("document").ready(function(){

	jQuery(".archive.woocommerce-shop #main").css("top", "-"+jQuery(".archive.woocommerce-shop #header").height()+"px");
	jQuery(".archive.category  #main").css("top", "-"+jQuery(".archive.category  #header").height()+"px");
	
	jQuery("article .thang-blogs-meta").appendTo(jQuery("article .entry-header-text"));
	jQuery(".single .ten-blog").append(jQuery("article .entry-header-text h1").text());
	jQuery(".single .ten-blog").css("display", "inline-block");
	jQuery("article .thang-blogs-meta").css("visibility", "visible");
	jQuery(".yith-wcbk-booking-form-message").remove();
	
	jQuery(".yith-wcbk-booking-date-icon").append("<img src='/wp-content/uploads/2022/10/Lich-icon.svg' width='20px' height='20px'>");
	
	jQuery("#room").attr("max", jQuery(".yith-wcbk-booking-service-quantity__container input").attr("max"));
	
	jQuery("#room").keyup(function(){		
		var room_numer = Number(jQuery("#room").val()) - 1;	
		if(room_numer>=0){
			jQuery(".yith-wcbk-booking-service-quantity__container input").val(room_numer);
			jQuery(".yith-wcbk-booking-service-quantity__container input").trigger("change");
			jQuery(".form-dat-phong .woobt-choose input").css("pointer-events","none");
			jQuery(".t-loader").show();
			jQuery(".form-dat-phong .woobt-products").css("opacity",".5");
			setTimeout(function () {
				jQuery(".form-dat-phong .woobt-choose input").css("pointer-events","auto");
				jQuery(".form-dat-phong .woobt-products").css("opacity","1");
				jQuery(".t-loader").hide();
			}, 3000);
		}else{
			jQuery(".yith-wcbk-booking-service-quantity__container input").val("0");
			jQuery(".yith-wcbk-booking-service-quantity__container input").trigger("change");
			jQuery(".form-dat-phong .woobt-choose input").css("pointer-events","none");
			jQuery(".t-loader").show();
			jQuery(".form-dat-phong .woobt-products").css("opacity",".5");
			setTimeout(function () {
				jQuery(".form-dat-phong .woobt-choose input").css("pointer-events","auto");
				jQuery(".form-dat-phong .woobt-products").css("opacity","1");
				jQuery(".t-loader").hide();
			}, 3000);
		}			
	});
	
	jQuery(".yith-wcbk-booking-form").append("<div class='box-room'></div>");
	jQuery(".room").appendTo(jQuery(".box-room"));
	jQuery(".yith-wcbk-add-to-cart-button").before(jQuery(".form-dat-phong .price-wrapper"));
	jQuery(".form-dat-phong .yith-wcbk-booking-form-message").appendTo(jQuery(".form-dat-phong .yith-wcbk-form-section-persons-wrapper"));
	jQuery(".form-dat-phong .price-wrapper").prepend("<p class='tong-gia-txt'>Tổng giá phòng: </p>");
	
	
	jQuery(".ks-name").text(jQuery(".form-dat-phong .product-title ").text());
	jQuery(".mo-ta-ngan").text(jQuery(".form-dat-phong .product-short-description ").text());
	jQuery(".gia-that").text(jQuery(".form-dat-phong .product-page-price bdi ").text());
	jQuery(".woocommerce-breadcrumb").appendTo(jQuery(".ct-phong-bread .col-inner"));
	jQuery(".ct-phong-bread .col-inner .woocommerce-breadcrumb").append("<span class='divider'>/</span>"+ jQuery(".form-dat-phong .product-title ").text());
	jQuery(".mo-ta-khach-san .tab-conten").html(jQuery("#tab-description").html());
	jQuery(".chinh-sach-lt .tab-conten").html(jQuery("#tab-chinh-sach-luu-tru").html());
	
	jQuery(".gia-moi-dem .gia-goc span").text(jQuery(".gia-moi-dem .gia-goc span").text().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	jQuery(".sec-product-relate .product-section-title").text("Các hạng phòng khác");
	jQuery(".col-inner .product-small").each(function(){
		jQuery(this).find(".gia-goc span").text(jQuery(this).find(".gia-goc span").text().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		jQuery(this).find(".number-detail").appendTo(jQuery(this).find(".title-wrapper"));
		jQuery(this).find(".short-des").appendTo(jQuery(this).find(".title-wrapper"));
		jQuery(this).find(".price-wrapper .price").before("<div class='txt-gia'>Giá phòng mỗi đêm từ</div>");
		var url_phong = jQuery(this).find(".product-title a").attr("href");
		jQuery(this).find(".price-wrapper").append("<a class='button btn-dat-ngay' href='"+url_phong+"' >Đặt ngay</a>");
		jQuery(this).find(".gia-goc").prependTo(jQuery(this).find(".price"));
		var item_gia_goc = Number(jQuery(this).find(".gia-goc").attr("data-gia-goc"));
		var item_gia_chinh = jQuery(this).find("bdi").text();		
		item_gia_chinh = item_gia_chinh.replace(" VND","");		
		item_gia_chinh = item_gia_chinh.replaceAll(",","");		
		item_gia_chinh = Number(item_gia_chinh);
		console.log(item_gia_chinh);
		console.log(item_gia_goc);
		if(item_gia_goc){
			var item_phantram = Math.ceil(((item_gia_goc - item_gia_chinh)/item_gia_goc)*100);
			jQuery(this).find(".box-image").append("<div class='phan-tram-km'>-"+item_phantram+"%</div>");
		}
	});
	if(jQuery(".gt-loai-phong .trang-thai span").attr("class") == "hetphong"){
		jQuery(".form-dat-phong .cart").attr("style","pointer-events: none; cursor: not-allowed;");
		jQuery(".form-dat-phong").attr("style"," cursor: not-allowed;");
		jQuery(".form-dat-phong .yith-wcbk-add-to-cart-button ").text("Hết phòng");
	}
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
	jQuery(".product-small > .col-inner .box.box-vertical").attr("style","visibility: visible");	
	var galey_w = jQuery(".woocommerce-product-gallery .flickity-viewport").width();
	var galey_h = galey_w * 75 / 100;
	jQuery(".woocommerce-product-gallery .flickity-viewport").css("min-height",galey_h+"px");
	jQuery(".woocommerce-product-gallery .flickity-viewport").css("max-height",galey_h+"px");
	jQuery(".tv-anh").attr("style","visibility: visible");
	
	jQuery(".home-sec-2 #yith-wcbk-booking-search-form-date-day-start-date-45-2--formatted").attr("placeholder","Ngày nhận phòng");
	jQuery(".home-sec-2 #yith-wcbk-booking-search-form-date-day-end-date-45-2--formatted").attr("placeholder","Ngày trả phòng");
	jQuery(".home-sec-2 .yith-wcbk-booking-field[name='person_types[48]']").attr("placeholder","Số người lớn");
	jQuery(".home-sec-2 .yith-wcbk-booking-field[name='person_types[49]']").attr("placeholder","Số trẻ em");
	jQuery(".row-mang-den .col").mouseenter(function(){
		jQuery(".row-mang-den .col").removeClass("active");
		jQuery(this).addClass("active");
	});
	
	jQuery(".home-sec-3 .product-small.box-shade").each(function(){
		jQuery(this).find(".box-text").append("<div class='home-box-dv'><div class='icon-dv'><img src='/wp-content/uploads/2022/10/double-bed.png'><img src='/wp-content/uploads/2022/10/towels.png'><img src='/wp-content/uploads/2022/10/breakfast.png'><img src='/wp-content/uploads/2022/10/bath-tub.png'></div><a class='chi-tiet-phong'>Xem chi tiết &#8594;</a></div>");
		jQuery(this).find(".chi-tiet-phong").attr("href",jQuery(this).find(".woocommerce-loop-product__link").attr("href"));
	});
	jQuery(".home-sec-3 .flickity-slider .product-small").each(function(){
		jQuery(this).find(".box-image").append("<div class='home-box-dv'><div class='icon-dv'><img src='/wp-content/uploads/2022/10/double-bed.png'><img src='/wp-content/uploads/2022/10/towels.png'><img src='/wp-content/uploads/2022/10/breakfast.png'><img src='/wp-content/uploads/2022/10/bath-tub.png'></div><a class='chi-tiet-phong'>Xem chi tiết &#8594;</a></div>");
		jQuery(this).find(".chi-tiet-phong").attr("href",jQuery(this).find(".woocommerce-loop-product__link").attr("href"));
	});
	jQuery(".form-dat-phong .price-wrapper").append(jQuery(".gt-loai-phong .gia-goc").html());
	var sing_product_gia_goc = Number(jQuery(".gt-loai-phong .gia-goc").attr("data-gia-goc"));
		var sing_product_gia_that_raw = jQuery(".gia-that").text();	
		var sing_product_gia_that = sing_product_gia_that_raw.replace(" VND","");
		var sing_product_gia_that = sing_product_gia_that.replaceAll(",","");
		sing_product_gia_that = Number(sing_product_gia_that);	
		var sing_phantram = Math.ceil((sing_product_gia_goc - sing_product_gia_that) / sing_product_gia_that * 100);
		var sing_phantram_no_ceil = (sing_product_gia_goc - sing_product_gia_that) / sing_product_gia_that * 100;
// 		console.log("phan tram " +sing_phantram_no_ceil);
// 		console.log(sing_phantram);
		if(sing_product_gia_goc){
			setInterval(function() {
				var sing_form_tong_gia_raw = jQuery(".form-dat-phong .product-page-price bdi").text();
				var sing_form_tong_gia = sing_form_tong_gia_raw.replace(" VND","");
				sing_form_tong_gia = sing_form_tong_gia.replaceAll(",","");
				sing_form_tong_gia = Number(sing_form_tong_gia);

				var sing_form_gia_that_raw = jQuery(".form-dat-phong del").text();
				var sing_form_gia_that = sing_form_gia_that_raw.replace(" VND","");
				sing_form_gia_that = Number(sing_form_gia_that);	
				
				var gia_goc = Math.round(Number((sing_phantram_no_ceil / 100) * sing_form_tong_gia) + sing_form_tong_gia );
				var gia_km = Math.ceil(gia_goc - ((sing_form_tong_gia * sing_phantram_no_ceil)/100 ));
// 				console.log("giá gốc " + gia_goc);
// 				console.log("tổng giá: "+ sing_form_tong_gia);
// 				console.log("gia km: " + gia_km);				
				if(gia_goc != sing_form_gia_that){
					jQuery(".form-dat-phong del span").text(gia_goc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
				}
			}, 500);
		};
	jQuery(".row-mang-den .col").each(function(){
		jQuery(this).find(".col-inner").attr("onclick","window.location='"+jQuery(this).find("a").attr("href")+"'");
	});
	jQuery(".form-dat-phong .woobt-title-inner").append("<p class='xct-toggle'>Xem chi tiết <i class='fas fa-caret-right'></i></p>");
	jQuery(".form-dat-phong .woobt-products .woobt-product").each(function(){
		jQuery(this).find(".xct-toggle").before(jQuery(this).find(".woobt-price").html());
		jQuery(this).find(".xct-toggle").before(jQuery(this).find(".woobt-quantity"));
	})
	
	jQuery(".woobt-product").each(function(){
		jQuery(this).find("a").removeAttr("href");
	});	
	jQuery(".form-dat-phong .xct-toggle").click(function(){
		jQuery(this).parents(".woobt-product").find(".woobt-description").slideToggle();
		jQuery(this).toggleClass("rotate");
	});
	jQuery(".form-dat-phong .woobt-wrap").prepend("<p class='tong-gia-txt dvbs'>Dịch vụ bổ sung</p>");
	
	jQuery(".form-dat-phong .yith-wcbk-booking-form").after(jQuery(".form-dat-phong .woobt-wrap"));
	jQuery(".dvbs").after("<div class='t-loader'></div>");
	jQuery(".yith-wcbk-people-selector__field__plus, .yith-wcbk-people-selector__field__minus").click(function(){	
		jQuery(".form-dat-phong .woobt-choose input").css("pointer-events","none");
		jQuery(".t-loader").show();
		jQuery(".form-dat-phong .woobt-products").css("opacity",".5");
		setTimeout(function () {
			jQuery(".form-dat-phong .woobt-choose input").css("pointer-events","auto");
			jQuery(".form-dat-phong .woobt-products").css("opacity","1");
			jQuery(".t-loader").hide();
		}, 3000);
	})
	jQuery(".dvbs").after("<span class='noti-dv'>Bạn cần phải chọn Ngày nhận phòng - trả phòng, số người trước khi chọn dịch vụ</span>");
	jQuery(".form-dat-phong .woobt-choose").click(function(){
		if(jQuery(".yith-wcbk-booking-end-date").val()==''){
			jQuery(".noti-dv").show();
		}else{
			jQuery(".noti-dv").hide();
		}
	});
	if(jQuery(".yith-wcbk-booking-end-date").val()!=''){
		jQuery(".form-dat-phong .woobt-choose input").css("pointer-events","auto");
	}
	
	jQuery(".price-wrapper .tong-gia-txt").after("<div class='gia-all'></div>");
	
	jQuery.fn.caculate_price = function(){
		jQuery(".woobt-wrap").ready(function(){
			var gia_them = jQuery(".form-dat-phong .woobt-additional .woocommerce-Price-amount").text();			
			gia_them = gia_them.replace(" VND","");
			gia_them = Number(gia_them.replaceAll(",",""));
			console.log(gia_them);			
			var sing_form_tong_gia_raw = jQuery(".form-dat-phong .product-page-price bdi").text();
			var sing_form_tong_gia = sing_form_tong_gia_raw.replace(" VND","");
			sing_form_tong_gia = sing_form_tong_gia.replaceAll(",","");
			sing_form_tong_gia = Number(sing_form_tong_gia);   
			var new_price = gia_them + sing_form_tong_gia;
			new_price= new_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			console.log("ok" + new_price);
			if(gia_them > 0){
				jQuery(".gia-all").show();
				jQuery(".gia-all").text(new_price + " VND");
				jQuery(".form-dat-phong .product-page-price").hide();
			}else{
				jQuery(".form-dat-phong .product-page-price").show();
				jQuery(".gia-all").hide();
			}
		});	
	}
	jQuery(".form-dat-phong .woobt-choose input").click(function(){
		jQuery.fn.caculate_price();
	});
	jQuery(".woobt-quantity-input-minus, .woobt-quantity-input-plus").click(function(){
		jQuery.fn.caculate_price();
	});
	jQuery("input.woobt-qty").keyup(function(){
		jQuery.fn.caculate_price();
	});
	
	jQuery(".yith-wcbk-date-picker-wrapper, .form-dat-phong .ui-datepicker-close, .yith-wcbk-people-selector__field__plus, .yith-wcbk-people-selector__field__minus, #room").click(function(){
		console.log(jQuery(".woobt-product-together .woobt-choose input:checked").length);
		if(jQuery(".woobt-product-together .woobt-choose input:checked").length>0){
			jQuery(".woobt-product-together .woobt-choose input:checked").trigger("click");
			jQuery(".form-dat-phong .woobt-choose input").css("pointer-events","none");
			jQuery(".t-loader").show();
			jQuery(".form-dat-phong .woobt-products").css("opacity",".5");
			setTimeout(function () {
				jQuery(".form-dat-phong .woobt-choose input").css("pointer-events","auto");
				jQuery(".form-dat-phong .woobt-products").css("opacity","1");
				jQuery(".t-loader").hide();
			}, 3000);
		}		
	})
	jQuery("#room").val(1);
	
	jQuery(".single_add_to_cart_button").before("<span class='yith-wcbk-add-to-cart-button single_add_to_cart_button button alt dat-phong-btn'>Đặt phòng</span>");
	jQuery(".yith-wcbk-people-selector").after("<span class='noti noti-max-people'></span>");
	jQuery(".dat-phong-btn").click(function(){
		var max_people_1_room = Number(jQuery(".so-nguoi").attr("data-toida"));
		var so_phong = Number(jQuery("#room").val());
		var number_people = Number(jQuery(".yith-wcbk-people-selector__totals").text().replace("người","").trim());
		if(max_people_1_room*so_phong >= number_people){
			jQuery(".noti-max-people").html("");
			jQuery("button.yith-wcbk-add-to-cart-button").trigger("click");
			jQuery("button.yith-wcbk-add-to-cart-button").show();
			jQuery(".dat-phong-btn").hide();
		}else{
			jQuery(".noti-max-people").html("Tối đa là <strong>"+max_people_1_room*so_phong+"</strong> người / <strong>"+so_phong+"</strong> phòng");
		}
	});
	
// 	jQuery(".form-dat-phong .yith-wcbk-add-to-cart-button").click(function(){
// 		if(confirm("Bạn có muốn đặt phòng mới và xoá toàn bộ thông tin phòng đã chọn trước đó không?") === true){
// 			return true;
// 		}else{
// 			return false;
//    		}
// 	});
	
	jQuery(".yith-wcbk-add-to-cart-button").click(function(){
		var ngay_den = jQuery(".yith-wcbk-booking-start-date").val()
		var date_den = ngay_den;
		var d_den = new Date(date_den.split("/").reverse().join("-"));
		var dd_den = d_den.getDate();
		var mm_den = d_den.getMonth()+1;
		var yy_den = d_den.getFullYear();
		var newdate_den = dd_den+"/"+mm_den+"/"+yy_den;
		
		var ngay_di = jQuery(".yith-wcbk-booking-end-date").val();
		var date_di = ngay_di;
		var d_di = new Date(date_di.split("/").reverse().join("-"));
		var dd_di = d_di.getDate();
		var mm_di = d_di.getMonth()+1;
		var yy_di = d_di.getFullYear();
		var newdate_di = dd_di+"/"+mm_di+"/"+yy_di;
		
		var so_nguoi = jQuery(".yith-wcbk-people-selector__totals").text();
		
		jQuery("#so_nguoi").val(so_nguoi);
		jQuery("#ngay_den_di").val(newdate_den +" => "+newdate_di);
		console.log(so_nguoi);
		console.log(newdate_den +" => "+newdate_di);

	});
})